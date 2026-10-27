import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { mailUrl, site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Canary Interior Design collects, uses and protects the information you share through this website.",
  path: "/privacy-policy",
});

/*
 * Plain-language policy describing what this website actually does.
 * It has not been reviewed by a lawyer — have it reviewed before launch,
 * and update it if analytics, CRM or other integrations change.
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      sheet="L-01 — Privacy"
      updated="27 October 2026"
      sections={[
        {
          h: "Who we are",
          body: (
            <p>
              This website is operated by {site.name}, {site.address.street}, {site.address.locality}, {site.address.country}. You can
              contact us at <a href={mailUrl}>{site.email}</a> or {site.phone.display}.
            </p>
          ),
        },
        {
          h: "What we collect",
          body: (
            <>
              <p>When you send an enquiry through our form, we collect the details you choose to provide:</p>
              <ul>
                <li>your name and phone number;</li>
                <li>your email address, if you provide it;</li>
                <li>information about your project, such as its type, location, size, budget range, timeline and message.</li>
              </ul>
              <p>
                If you contact us by WhatsApp, phone or email, we receive the information you share through those services.
              </p>
            </>
          ),
        },
        {
          h: "How we use it",
          body: (
            <p>
              We use enquiry information only to respond to you, discuss your project and, if we work together, to deliver it. We do
              not sell your information or use it for unrelated marketing.
            </p>
          ),
        },
        {
          h: "How it is processed",
          body: (
            <p>
              Enquiries are delivered to our team by email and/or a business system we use to manage enquiries. These providers process
              the information on our behalf to deliver it to us. WhatsApp is operated by WhatsApp LLC and is subject to its own
              privacy terms.
            </p>
          ),
        },
        {
          h: "Analytics",
          body: (
            <p>
              If analytics is enabled on this website, we use it to understand how visitors use the site — for example, which pages are
              viewed and how often contact buttons are used. We do not send your name, phone number, email address or message content
              to analytics services.
            </p>
          ),
        },
        {
          h: "How long we keep it",
          body: <p>We keep enquiry information for as long as needed to respond to you and manage any resulting project, and then delete it unless we need to keep it for legal or accounting reasons.</p>,
        },
        {
          h: "Your choices",
          body: (
            <p>
              You can ask us to access, correct or delete the information you have shared with us by contacting{" "}
              <a href={mailUrl}>{site.email}</a>.
            </p>
          ),
        },
        {
          h: "Changes",
          body: <p>We may update this policy from time to time. The date at the top of the page shows when it was last changed.</p>,
        },
      ]}
    />
  );
}
