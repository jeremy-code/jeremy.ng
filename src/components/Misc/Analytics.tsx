import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

const GA_TRACKING_ID = process.env.GA_TRACKING_ID ?? "G-XXXXXXXXXX";

const Analytics = () => {
  return (
    <>
      {/* Offset Google Analytics to Web Worker */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <VercelAnalytics />
    </>
  );
};

export default Analytics;
