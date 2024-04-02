"use server";

import ky from "ky";
import { parse } from "valibot";

import { ValidationRequestParams, ValidationResponse } from "./schema";

const { CF_TURNSTILE_SECRET_KEY } = process.env;

export const verifyToken = async (token: FormDataEntryValue) => {
  const params = parse(ValidationRequestParams, {
    secret: CF_TURNSTILE_SECRET_KEY,
    response: token,
    idempotency_key: crypto.randomUUID(),
  });

  return parse(
    ValidationResponse,
    await ky
      .post("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        json: params,
      })
      .json()
  );
};
