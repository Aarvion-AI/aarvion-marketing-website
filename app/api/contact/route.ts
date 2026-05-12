import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  context?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, company, context } = body;
  if (!name || !email || !company || !context) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "sales@aarvion.ai";
  const from = process.env.CONTACT_FROM ?? "Aarvion <onboarding@resend.dev>";

  if (apiKey) {
    const text = [
      `New design-partnership application`,
      ``,
      `Name:    ${body.name}`,
      `Email:   ${body.email}`,
      `Company: ${body.company}`,
      `Role:    ${body.role ?? "—"}`,
      ``,
      `Context:`,
      body.context,
    ].join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: body.email,
        subject: `Aarvion design partnership — ${body.company}`,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend failure", detail);
      return NextResponse.json(
        { error: "Email delivery failed" },
        { status: 502 }
      );
    }
  } else {
    console.warn(
      "[contact] RESEND_API_KEY not set — application logged only:",
      body
    );
  }

  return NextResponse.json({ ok: true });
}
