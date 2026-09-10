import type { Metadata } from "next";

import { ClaimOrganisationView } from "@/features/onboarding/ClaimOrganisationView";

export const metadata: Metadata = { title: "Register an organisation — NDI Studio" };

export default function ClaimPage() {
  return <ClaimOrganisationView />;
}
