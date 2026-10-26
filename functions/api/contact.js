// POST /api/contact — validates the enquiry form and emails it through Resend.
// Required settings (Pages → Settings → Variables and secrets, or `wrangler pages secret put`):
//   RESEND_API_KEY  Resend API key
//   CONTACT_TO      address(es) that receive enquiries, comma-separated
//   CONTACT_FROM    verified sender, e.g. "Growth Garden <hello@yourdomain.com>"

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const oneLine = (s) => s.replace(/[\r\n]+/g, ' ').trim()

export async function onRequestPost({ request, env }) {
  // Same-site requests only, so other websites can't use this endpoint as a mail relay
  const origin = request.headers.get('Origin')
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ ok: false, error: 'Forbidden' }, 403)
  }

  let data
  try {
    data = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid request' }, 400)
  }

  // Hidden field that real visitors never fill in; bots do. Pretend it worked.
  if (typeof data.website === 'string' && data.website !== '') return json({ ok: true })

  const name = String(data.name ?? '').trim()
  const email = String(data.email ?? '').trim()
  const phone = String(data.phone ?? '').trim()
  const message = String(data.comment ?? '').trim()

  if (!name || name.length > 100) return json({ ok: false, error: 'Please enter your name.' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400)
  }
  if (phone.length > 30) return json({ ok: false, error: 'That phone number is too long.' }, 400)
  if (message.length > 5000) return json({ ok: false, error: 'Your message is too long.' }, 400)

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error('contact: RESEND_API_KEY, CONTACT_TO or CONTACT_FROM is not set')
    return json({ ok: false, error: 'The form is not set up yet. Please email us directly.' }, 500)
  }

  const html = `
    <h2>New website enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone) || '—'}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message) || '—'}</p>`
  const text = `New website enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\n${message || '-'}`

  let res
  try {
    res = await fetch(env.RESEND_API_URL || 'https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: env.CONTACT_TO.split(',').map((a) => a.trim()).filter(Boolean),
        reply_to: email,
        subject: oneLine(`New enquiry from ${name}`),
        html,
        text,
      }),
    })
  } catch (err) {
    console.error('contact: could not reach Resend', err)
    return json({ ok: false, error: 'Could not send your message. Please try again.' }, 502)
  }

  if (!res.ok) {
    console.error('contact: Resend rejected the email', res.status, await res.text())
    return json({ ok: false, error: 'Could not send your message. Please try again.' }, 502)
  }
  return json({ ok: true })
}

// Anything other than POST
export const onRequest = () => json({ ok: false, error: 'Method not allowed' }, 405)
