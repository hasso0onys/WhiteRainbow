import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { client } from '@/lib/sanity'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, date, time, projectType, budget, details } = body

    // 1. Save to Sanity
    const booking = await client.create({
      _type: 'bookingForm',
      name,
      email,
      phone,
      date,
      time,
      projectType,
      budget,
      details,
      status: 'new',
      submittedAt: new Date().toISOString(),
    })

    // 2. Send Email to Admin
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL || email, // استخدم بريدك هنا
      subject: `🆕 طلب حجز جديد من ${name}`,
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
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">📅 طلب حجز جديد</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">تم استلام طلب حجز جديد</p>
            </div>
            
            <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">معلومات العميل</h2>
            <div class="field">
              <div class="label">👤 الاسم</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">📧 البريد الإلكتروني</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">📱 رقم الهاتف</div>
              <div class="value">${phone}</div>
            </div>
            
            <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 30px;">تفاصيل الحجز</h2>
            <div class="field">
              <div class="label">📅 التاريخ</div>
              <div class="value">${date}</div>
            </div>
            <div class="field">
              <div class="label">🕐 الوقت</div>
              <div class="value">${time}</div>
            </div>
            <div class="field">
              <div class="label">🎯 نوع المشروع</div>
              <div class="value">${projectType}</div>
            </div>
            ${budget ? `
            <div class="field">
              <div class="label">💰 الميزانية</div>
              <div class="value">${budget}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">📝 التفاصيل</div>
              <div class="value">${details}</div>
            </div>
            
            <div class="footer">
              <p>تم إرسال هذا البريد تلقائياً من موقعك</p>
              <p>يمكنك إدارة هذا الطلب من Sanity Studio</p>
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
      subject: `تأكيد استلام طلب الحجز - ${name}`,
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
              <p style="margin: 15px 0 0 0; opacity: 0.9;">تم استلام طلب الحجز بنجاح</p>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; line-height: 1.8; color: #333;">
                شكراً لتواصلك معنا! تم استلام طلب حجزك بنجاح وسنقوم بمراجعته في أقرب وقت ممكن.
              </p>
              <p style="font-size: 16px; line-height: 1.8; color: #333;">
                سنتواصل معك خلال <strong>24 ساعة</strong> لتأكيد الموعد ومناقشة تفاصيل المشروع.
              </p>
              <p style="font-size: 16px; line-height: 1.8; color: #333;">
                التاريخ المختار: <strong>${date}</strong> في تمام الساعة <strong>${time}</strong>
              </p>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 30px;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  💡 نصيحة: يمكنك التواصل معنا مباشرة عبر الهاتف إذا كان لديك أي استفسار عاجل.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json(
      { success: true, message: 'تم إرسال طلب الحجز بنجاح', booking },
      { status: 200 }
    )
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء إرسال الطلب' },
      { status: 500 }
    )
  }
}

