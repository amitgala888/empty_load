import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }})
  }

  try {
    const {
      ownerEmail, ownerName, loadFrom, loadTo, loadDate,
      inquirerName, inquirerContact, timestamp
    } = await req.json()

    const subject = `TruckRoute: ${inquirerName} tried to contact you`

    const html = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#030712;color:#f9fafb;padding:32px;border-radius:12px;">
        <div style="font-size:28px;font-weight:900;letter-spacing:3px;margin-bottom:8px;">
          <span style="color:#fff;">TRUCK</span><span style="color:#f59e0b;">ROUTE</span>
        </div>
        <p style="color:#9ca3af;margin:0 0 24px;">Empty Load Network</p>
        <div style="background:#111827;border-radius:10px;padding:20px;margin-bottom:20px;border:1px solid #1f2937;">
          <p style="margin:0 0 8px;font-size:18px;font-weight:700;">📬 Someone tried to contact you</p>
          <p style="margin:0;color:#9ca3af;font-size:14px;">
            ${inquirerName} exceeded their daily contact reveal limit but tried to view your contact number.
            Call them back at the number below.
          </p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:13px;width:40%;">Enquirer Name</td>
            <td style="padding:10px 0;font-weight:700;">${inquirerName}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:13px;border-top:1px solid #1f2937;">Mobile Number</td>
            <td style="padding:10px 0;font-weight:700;color:#6ee7b7;border-top:1px solid #1f2937;">${inquirerContact}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:13px;border-top:1px solid #1f2937;">Interested In</td>
            <td style="padding:10px 0;font-weight:700;border-top:1px solid #1f2937;">${loadFrom} to ${loadTo}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:13px;border-top:1px solid #1f2937;">Travel Date</td>
            <td style="padding:10px 0;border-top:1px solid #1f2937;">${loadDate}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:13px;border-top:1px solid #1f2937;">Time</td>
            <td style="padding:10px 0;border-top:1px solid #1f2937;">${timestamp}</td>
          </tr>
        </table>
        <p style="margin-top:24px;font-size:12px;color:#4b5563;">
          This alert was sent because you enabled email notifications on your load post.
          Log in to TruckRoute to view all enquiries.
        </p>
      </div>`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'TruckRoute <noreply@truckroute.in>',
        to: [ownerEmail],
        subject,
        html,
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})