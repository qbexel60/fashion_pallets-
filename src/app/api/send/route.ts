import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/ContactFormEmail';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, message, phone } = formData;

   const emailHtml = await render(
     ContactFormEmail({ name, email, message, phone }),
   );
    const data = await resend.emails.send({
      from: 'Fashion Pallet Website <onboarding@resend.dev>',
      to: ['iftekharm802@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
