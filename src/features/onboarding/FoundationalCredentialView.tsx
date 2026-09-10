"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useScreenState } from "@/components/demo/screenState";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { Panel } from "@/components/ui/Panel";
import { StatusPill } from "@/components/ui/StatusPill";
import { Icon } from "@/components/ui/icons";
import { ROUND_TRIP_MS } from "@/lib/demoTiming";
import { useDemo } from "@/lib/demoStore";

import { OnboardingShell } from "./OnboardingShell";

/**
 * A3 — accept the entity's foundational credential. The milestone.
 *
 * WHY THIS IS ITS OWN SCREEN RATHER THAN A STEP IN A SETUP WIZARD
 *
 * This is the root every later credential and every delegated authority
 * chains back to. When Act 5 shows a verification walking four links up to
 * the company's registration, this is the link at the top. A screen that
 * treated it as one more provisioning step would leave the audience with no
 * idea why the chain has a bottom, so it is marked as an arrival: the entity
 * is now verified, and here is what that means.
 *
 * The bootstrap scope is named rather than implied. This one acceptance
 * happens under a scope created for exactly this purpose, which is the only
 * way to accept a credential before any controllership exists — a chicken and
 * egg the design resolves explicitly, and the screen should not pretend it
 * was not there.
 */
export function FoundationalCredentialView() {
  const router = useRouter();
  const { heldCredentials } = useDemo();

  const screenState = useScreenState("A3", [
    "offer_ready",
    "issuing",
    "verified",
    "issuance_failed",
  ]);

  const [stage, setStage] = useState<"offer" | "issuing" | "done">("offer");

  const foundational = heldCredentials.find((c) => c.isFoundational);

  const shown =
    screenState === "issuing"
      ? "issuing"
      : screenState === "verified"
        ? "done"
        : screenState === "issuance_failed"
          ? "failed"
          : stage;

  const accept = () => {
    setStage("issuing");
    setTimeout(() => setStage("done"), ROUND_TRIP_MS);
  };

  if (shown === "done") {
    return (
      <OnboardingShell current={2}>
        <Panel>
          <div className="relative z-[4] flex flex-col items-center gap-4 py-6 text-center">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full border"
              style={{
                borderColor: "var(--ndi-mint-40)",
                background: "var(--ndi-mint-12)",
                boxShadow: "var(--glow-sm)",
              }}
            >
              <Icon name="shieldCheck" size={26} strokeWidth={1.9} className="text-accent" />
            </span>

            <div className="flex flex-col gap-2">
              <h1 className="font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-strong">
                Norling Logistics is <span className="ndi-wave-text">verified</span>
              </h1>
              <p className="mx-auto max-w-[54ch] text-[13.5px] leading-[1.65] text-muted">
                The organisation now holds its registration as a credential in
                its own wallet. It can prove things about itself, hold
                credentials others issue to it, and grant scoped authority to
                the people who act for it.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <GradientButton onClick={() => router.push("/dashboard")}>
                Go to the console
                <Icon name="arrowRight" size={15} strokeWidth={2} />
              </GradientButton>
              <HairlineButton onClick={() => router.push("/controllership/relations/new")}>
                Grant someone authority
              </HairlineButton>
            </div>

            <p className="mx-auto max-w-[56ch] text-[12.5px] leading-[1.55] text-faint">
              You hold the root authority for this organisation. Everything you
              delegate from here traces back to the credential you just
              accepted — if it ever lapsed, nothing beneath it would verify
              anywhere.
            </p>
          </div>
        </Panel>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell current={2}>
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-strong">
          Accept the organisation&rsquo;s registration
        </h1>
        <p className="max-w-[64ch] text-[13.5px] leading-[1.65] text-muted">
          The Registrar of Companies is offering Norling Logistics a credential
          for its own registration. This is the root of everything that
          follows.
        </p>
      </div>

      {shown === "failed" ? (
        <Panel>
          <div className="relative z-[4] flex items-start gap-3">
            <Icon
              name="close"
              size={18}
              strokeWidth={2.2}
              className="mt-0.5 flex-none"
              style={{ color: "var(--ndi-danger)" }}
            />
            <div className="flex flex-col gap-2">
              <p className="font-display text-[14.5px] font-semibold text-strong">
                The credential could not be issued
              </p>
              <p className="max-w-[62ch] text-[13px] leading-[1.6] text-muted">
                The registrar confirmed you, but issuing the credential itself
                failed. The organisation exists and you hold its root
                authority — it simply cannot prove anything about itself until
                this is issued, so nothing else will work yet.
              </p>
              <div className="mt-1">
                <HairlineButton onClick={() => setStage("offer")}>
                  <Icon name="refresh" size={14} strokeWidth={2} />
                  Try again
                </HairlineButton>
              </div>
            </div>
          </div>
        </Panel>
      ) : null}

      <Panel>
        <div className="relative z-[4] flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Offered by
              </p>
              <p className="font-display text-[14.5px] font-semibold text-strong">
                Registrar of Companies
              </p>
              <p className="text-[12.5px] text-faint">
                The register that just confirmed you
              </p>
            </div>
            <StatusPill status="verified" label="On the trust registry" />
          </div>

          <div className="rounded-[12px] border border-grid px-3.5 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Business Registration
            </p>
            <dl className="mt-2.5 m-0 grid gap-x-6 gap-y-2 min-[641px]:grid-cols-2">
              {(
                foundational?.attributes ?? [
                  { name: "registered_name", value: "Norling Logistics Pvt. Ltd." },
                  { name: "registration_number", value: "CRA-2019-04477" },
                  { name: "entity_type", value: "Private limited company" },
                  { name: "registered_address", value: "Babesa, Thimphu, Bhutan" },
                  { name: "incorporation_date", value: "2019-08-14" },
                  { name: "status", value: "Active" },
                ]
              ).map((attribute) => (
                <div key={attribute.name} className="flex flex-col gap-0.5">
                  <dt className="text-[12px] text-faint">
                    {attribute.name.replace(/_/g, " ")}
                  </dt>
                  <dd className="m-0 text-[13px] text-body">{attribute.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-2 rounded-[12px] border border-grid px-3.5 py-3">
            <p className="font-display text-[13px] font-medium text-body">
              Why this one is different
            </p>
            <p className="max-w-[62ch] text-[12.5px] leading-[1.55] text-muted">
              Accepting a credential normally needs an authority that says you
              may. Nobody has one yet — the organisation has only just come
              into existence. So this single acceptance happens under a
              bootstrap authority created for exactly this purpose, and
              nothing else can be accepted under it.
            </p>
          </div>

          {shown === "issuing" ? (
            <div className="flex items-center gap-2.5 rounded-[12px] border border-grid px-3.5 py-3">
              <Icon name="refresh" size={15} strokeWidth={2} className="animate-spin text-accent" />
              <p className="text-[13px] text-body">
                Issuing the credential to the organisation&rsquo;s wallet…
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <GradientButton onClick={accept}>
                <Icon name="check" size={15} strokeWidth={2.2} />
                Accept the registration
              </GradientButton>
              <span className="max-w-[42ch] text-[12.5px] leading-[1.5] text-faint">
                Recorded as the organisation accepting it, carried out by you.
              </span>
            </div>
          )}
        </div>
      </Panel>
    </OnboardingShell>
  );
}
