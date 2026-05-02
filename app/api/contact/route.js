import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // swap once you verify a domain
      to: "lkjmo12@gmail.com",                        // ← put your email here
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }
}