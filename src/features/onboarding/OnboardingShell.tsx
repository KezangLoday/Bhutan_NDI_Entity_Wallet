"use client";

import type { ReactNode } from "react";

import { Lockup } from "@/components/layout/Lockup";
import { Stepper } from "@/components/ui/Stepper";

/**
 * The chrome for onboarding, which deliberately is not the app shell.
 *
 * There is no sidebar and no organisation switcher, because at this point
 * there is no organisation — the whole purpose of these three screens is to
 * bring one into existence. Showing the workspace chrome around them would
 * promise a tenant that does not exist yet, and would make the register
 * confirmation look like a setting rather than the gate it is.
 */
export const ONBOARDING_STEPS = [
  { label: "Find your organisation" },
  { label: "Prove who you are" },
  { label: "Verified" },
];

export function OnboardingShell({
  current,
  children,
}: {
  current: number;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-subtle">
        <div className="mx-auto flex w-full max-w-[900px] items-center justify-between gap-4 px-4 py-4 min-[641px]:px-6">
          <Lockup />
          <span className="text-[12px] text-faint">Registering an organisation</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[900px] flex-1 flex-col gap-6 px-4 py-6 min-[641px]:px-6 min-[901px]:py-10">
        <Stepper steps={ONBOARDING_STEPS} current={current} />
        {children}
      </main>
    </div>
  );
}
