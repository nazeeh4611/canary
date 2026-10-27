/** Enquiry form options. Kept free of zod so the client form stays light. */

export const projectTypes = [
  "Villa",
  "Apartment",
  "Penthouse",
  "Townhouse",
  "Office",
  "Shop / retail",
  "Salon",
  "Restaurant / café",
  "Clinic",
  "Other",
] as const;

export const propertyStatuses = [
  "New / shell and core",
  "Existing — occupied",
  "Existing — vacant",
  "Not yet purchased or leased",
] as const;

export const servicesRequired = [
  "Interior design",
  "Renovation",
  "Fit-out",
  "Joinery",
  "Space planning",
  "Architecture",
  "Pool & landscaping",
  "Not sure yet",
] as const;

export const budgetRanges = [
  "Under AED 50,000",
  "AED 50,000 – 150,000",
  "AED 150,000 – 400,000",
  "AED 400,000 – 1,000,000",
  "Over AED 1,000,000",
  "Prefer to discuss",
] as const;

export const timelines = ["As soon as possible", "Within 3 months", "3–6 months", "6+ months", "Just exploring"] as const;
