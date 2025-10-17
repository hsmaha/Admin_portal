import { BattlePage } from "@/components/battle/battle-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HS Consultant (PVT) LTD | Quiz Challenge",
  description: "Study Abroad Consultants, Study with scholarships | HS Consultant (PVT) LTD",
};

export default function Battle() {
  return <BattlePage />;
}
