import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, message } = body

    // Validate required fields
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: '全ての項目を入力してください。' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください。' },
        { status: 400 }
      )
    }

    // Log the contact form submission (for debugging)
    console.log('Contact form submission:', {
      name,
      phone,
      email,
      message,
      timestamp: new Date().toISOString()
    })

    // Here you can add:
    // 1. Send email using nodemailer or similar
    // 2. Save to database
    // 3. Send to external CRM/API
    // 4. Send notification to Slack/Discord

    // Example: Send to external webhook (uncomment and configure if needed)
    // const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    // if (webhookUrl) {
    //   await fetch(webhookUrl, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, phone, email, message })
    //   })
    // }

    return NextResponse.json(
      { success: true, message: 'お問い合わせを受け付けました。' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました。' },
      { status: 500 }
    )
  }
}
