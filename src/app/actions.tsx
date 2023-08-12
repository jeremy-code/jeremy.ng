"use server";

import { ContactFormData } from "@/components/Contact";

const { SENDGRID_API_KEY, SENDGRID_TEMPLATE_ID } = process.env;

export async function addItem(data: ContactFormData) {
  if (!SENDGRID_API_KEY || !SENDGRID_TEMPLATE_ID) {
    throw new Error("Missing SendGrid API key or template ID.");
  }

  const { name, email, message } = data;

  const fetchRequestOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: {
        email: "hi@jeremy.ng",
      },
      personalizations: [
        {
          to: [
            {
              email: "hi@jeremy.ng",
            },
          ],
          dynamic_template_data: {
            name,
            email,
            message,
            date: new Date().toLocaleString(),
          },
        },
      ],
      template_id: SENDGRID_TEMPLATE_ID,
    }),
  };

  fetch("https://api.sendgrid.com/v3/mail/send", fetchRequestOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
  });
}
