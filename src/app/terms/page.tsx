import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { mailUrl, site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms for using the Canary Interior Design website.",
  path: "/terms",
});

/*
 * Website terms of use only — project work is governed by each project's
 * own agreement. Have this reviewed by a lawyer before launch.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      path="/terms"
      sheet="L-02 — Terms"
      updated="27 October 2026"
      sections={[
        {
          h: "About these terms",
          body: <p>These terms apply to your use of this website, operated by {site.name}. By using the site you agree to them.</p>,
        },
        {
          h: "Information on this website",
          body: (
            <p>
              The content on this website is for general information about our studio and services. It is not an offer or a quotation.
              Services, scope, fees and timelines for any project are set out in a separate written agreement.
            </p>
          ),
        },
        {
          h: "Images and drawings",
          body: (
            <p>
              Images and drawings on this site are owned by or licensed to {site.name}. Where an image is illustrative rather than a
              photograph of our completed work, it is labelled as such. Please do not reproduce content from this site without permission.
            </p>
          ),
        },
        {
          h: "Enquiries",
          body: <p>Submitting an enquiry does not create an agreement between you and {site.name}. We will respond to discuss your project and any next steps.</p>,
        },
        {
          h: "Links to other websites",
          body: <p>This site links to services such as WhatsApp, Google Maps and Instagram. We are not responsible for the content or practices of those services.</p>,
        },
        {
          h: "Liability",
          body: <p>We work to keep the information on this site accurate, but cannot guarantee it is always complete or current. To the extent permitted by law, we are not liable for loss arising from reliance on it.</p>,
        },
        {
          h: "Governing law",
          body: <p>These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Ajman.</p>,
        },
        {
          h: "Contact",
          body: (
            <p>
              Questions about these terms can be sent to <a href={mailUrl}>{site.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
