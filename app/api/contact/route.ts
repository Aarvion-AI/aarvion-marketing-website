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
  const to = process.env.CONTACT_TO ?? "rohit@aarvion.ai";
  const from = process.env.CONTACT_FROM ?? "Aarvion <onboarding@resend.dev>";

  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY missing — refusing to accept submission",
      { name: body.name, email: body.email, company: body.company }
    );
    return NextResponse.json(
      { error: "Email delivery is not configured. Please email rohit@aarvion.ai directly." },
      { status: 503 }
    );
  }

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
    console.error("[contact] Resend failure", { status: res.status, detail });
    return NextResponse.json(
      { error: "Email delivery failed. Please email rohit@aarvion.ai directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
