import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
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
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (
    name.length > 160 ||
    email.length > 320 ||
    company.length > 160 ||
    (body.role?.length ?? 0) > 160 ||
    context.length > 5000
  ) {
    return NextResponse.json({ error: "Submission is too long" }, { status: 400 });
  }

  const provider = process.env.EMAIL_PROVIDER;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "sales@aarvion.ai";
  const from =
    process.env.CONTACT_FROM ??
    (provider === "ses"
      ? "Aarvion <noreply@aarvion.ai>"
      : "Aarvion <onboarding@resend.dev>");

  if (provider !== "ses" && !apiKey) {
    console.error(
      "[contact] Email provider is not configured — refusing to accept submission",
      { name, email, company },
    );
    return NextResponse.json(
      { error: "Email delivery is not configured. Please email sales@aarvion.ai directly." },
      { status: 503 },
    );
  }

  const text = [
    "New Aarvion demo request",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Company: ${company}`,
    `Role:    ${body.role ?? "—"}`,
    "",
    "Context:",
    context,
  ].join("\n");
  const subjectCompany = company.replace(/[\r\n]+/g, " ").trim();

  try {
    if (provider === "ses") {
      const client = new SESClient({
        region: process.env.SES_REGION ?? "us-east-1",
      });

      try {
        await client.send(
          new SendEmailCommand({
            Source: from,
            Destination: { ToAddresses: [to] },
            ReplyToAddresses: [email],
            Message: {
              Subject: {
                Charset: "UTF-8",
                Data: `Aarvion demo request — ${subjectCompany}`,
              },
              Body: {
                Text: { Charset: "UTF-8", Data: text },
              },
            },
          }),
        );
      } finally {
        client.destroy();
      }
    } else {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `Aarvion demo request — ${subjectCompany}`,
          text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend returned ${response.status}: ${await response.text()}`);
      }
    }
  } catch (error) {
    console.error("[contact] Email delivery failure", error);
    return NextResponse.json(
      { error: "Email delivery failed. Please email sales@aarvion.ai directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
