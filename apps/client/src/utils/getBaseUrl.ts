export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Unnecessary on the client side because window.origin can be used
    return "";
  } else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    // https://vercel.com/docs/environment-variables/framework-environment-variables#NEXT_PUBLIC_VERCEL_URL
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  // Assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
};
