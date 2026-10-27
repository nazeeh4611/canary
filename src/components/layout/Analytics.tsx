import Script from "next/script";

/** IDs are interpolated into inline scripts, so accept only the expected format. */
const safeId = (v?: string) => (v && /^[A-Z0-9-]{4,20}$/i.test(v) ? v : undefined);

/** Loads GA4 or GTM only when an ID is configured. Nothing is loaded otherwise. */
export function Analytics() {
  const gaId = safeId(process.env.NEXT_PUBLIC_GA_ID);
  const gtmId = safeId(process.env.NEXT_PUBLIC_GTM_ID);

  if (gtmId) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
    );
  }

  if (gaId) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
        </Script>
      </>
    );
  }

  return null;
}
