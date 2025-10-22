import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { client } from '@/lib/sanity'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // 1. Save to Sanity
    const contact = await client.create({
      _type: 'contactForm',
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
      submittedAt: new Date().toISOString(),
    })

    // 2. Send Email to Admin
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL || email, // استخدم بريدك هنا
      subject: `🆕 رسالة جديدة من ${name}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
            .container { background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
            .field { margin-bottom: 15px; padding: 15px; background: #f9f9f9; border-radius: 5px; border-right: 4px solid #000; }
            .label { font-weight: bold; color: #333; margin-bottom: 5px; }
            .value { color: #666; }
            .message-box { background: #f0f0f0; padding: 20px; border-radius: 8px; border-right: 4px solid #000; margin-top: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">✉️ رسالة تواصل جديدة</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">تم استلام رسالة جديدة من موقعك</p>
            </div>
            
            <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">معلومات المرسل</h2>
            <div class="field">
              <div class="label">👤 الاسم</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">📧 البريد الإلكتروني</div>
              <div class="value">${email}</div>
            </div>
            ${phone ? `
            <div class="field">
              <div class="label">📱 رقم الهاتف</div>
              <div class="value">${phone}</div>
            </div>
            ` : ''}
            
            <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 30px;">الموضوع</h2>
            <div class="field">
              <div class="value">${subject}</div>
            </div>
            
            <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 30px;">الرسالة</h2>
            <div class="message-box">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div class="footer">
              <p>تم إرسال هذا البريد تلقائياً من موقعك</p>
              <p>يمكنك إدارة هذه الرسالة من Sanity Studio</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // 3. Send Confirmation Email to Customer
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: `تأكيد استلام رسالتك - ${name}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
            .container { background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
            .content { padding: 30px 0; }
            .success-icon { font-size: 60px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="success-icon">✅</div>
              <h1 style="margin: 0;">شكراً لك ${name}!</h1>
              <p style="margin: 15px 0 0 0; opacity: 0.9;">تم استلام رسالتك بنجاح</p>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; line-height: 1.8; color: #333;">
                شكراً لتواصلك معنا! تم استلام رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت ممكن.
              </p>
              <p style="font-size: 16px; line-height: 1.8; color: #333;">
                نحن نقدّر اهتمامك ونسعى للرد خلال <strong>24 ساعة</strong>.
              </p>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 30px;">
                <h3 style="margin: 0 0 10px 0; color: #333;">رسالتك:</h3>
                <p style="margin: 0; color: #666; font-size: 14px;">
                  <strong>الموضوع:</strong> ${subject}
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json(
      { success: true, message: 'تم إرسال رسالتك بنجاح', contact },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء إرسال الرسالة' },
      { status: 500 }
    )
  }
}

