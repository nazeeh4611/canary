import { Hero } from "@/components/sections/home/Hero";
import { StudioIntro } from "@/components/sections/home/StudioIntro";
import { SelectedWork } from "@/components/sections/home/SelectedWork";
import { ServicesIndex } from "@/components/sections/home/ServicesIndex";
import { Approach } from "@/components/sections/home/Approach";
import { MaterialPalette } from "@/components/sections/home/MaterialPalette";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { WhyCanary } from "@/components/sections/home/WhyCanary";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { testimonials } from "@/data/testimonials";
import { webPageSchema } from "@/lib/schema";
import { site } from "@/config/site";
import type { Metadata } from "next";

const description =
  "Interior design, renovation, fit-out and joinery for villas, apartments and commercial spaces. Canary Interior Design — studio in Ajman, projects across the UAE.";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Interior Design & Fit-Out, Ajman` },
  description,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — Interior Design & Fit-Out in Ajman`,
    description,
    siteName: site.name,
    locale: site.locale,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudioIntro />
      <SelectedWork />
      <ServicesIndex />
      <Approach />
      {/* Verified testimonials replace the material board once supplied */}
      {testimonials.length > 0 ? <Testimonials /> : <MaterialPalette />}
      <ProcessSection />
      <WhyCanary />
      <ServiceArea />
      <EnquiryBand />
      <JsonLd data={webPageSchema({ name: "Interior Design & Fit-Out Studio in Ajman", description, path: "/" })} />
    </>
  );
}
