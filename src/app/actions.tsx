"use server";

import { ContactFormData } from "@/components/Contact";

const API_KEY = process.env.SENDGRID_API_KEY;
const TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID;

export async function addItem(data: ContactFormData) {
  const { name, email, message } = data;

  console.log("API_KEY", API_KEY);
  console.log("TEMPLATE_ID", TEMPLATE_ID);

  const fetchRequestOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
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
      template_id: TEMPLATE_ID,
    }),
  };

  fetch("https://api.sendgrid.com/v3/mail/send", fetchRequestOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
  });
}
