"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useScreenState } from "@/components/demo/screenState";
import { GradientButton } from "@/components/ui/GradientButton";
import { Panel } from "@/components/ui/Panel";
import { WalletHandoff, type HandoffStatus } from "@/components/ui/WalletHandoff";
import { Icon } from "@/components/ui/icons";
import { REGISTER_CHECK_MS, SKIP_AFTER_MS, WALLET_HANDOFF_MS } from "@/lib/demoTiming";

import { OnboardingShell } from "./OnboardingShell";

/**
 * A2 — prove who you are, then let the register decide whether you speak for
 * the organisation. Two steps, and the second is the one that matters.
 *
 * THIS SCREEN GETS THE HONEST WAIT
 *
 * Every other wait in this demo is compressed to about two seconds. This one
 * is not, deliberately: it is the moment the platform admits it cannot assert
 * the organisation's identity by itself and has to ask somebody else. If it
 * resolved instantly, the single most important architectural fact about the
 * product — that the register is the authority and we are not — would slide
 * past unnoticed. One screen in the demo should show what depending on an
 * external body actually feels like, and this is that screen.
 *
 * The two stages are shown as two stages, not one spinner. Answering a proof
 * request is a person doing something; the register check is an institution
 * doing something. Collapsing them into a single "verifying…" would hide
 * which one is slow and, worse, which one can refuse you.
 *
 * THE REFUSAL IS THE POINT OF THE SCREEN
 *
 * "We could not confirm that you represent this organisation" has to be
 * graceful, specific, and impossible to mistake for a technical fault — a
 * person who has just been told they are not a registered representative
 * needs to know it is a matter of record, not a bug, and what to do about it.
 * That case gets as much room as the success.
 */
type Stage = "idle" | "wallet" | "register" | "confirmed" | "not_representative" | "expired";

export function ProveIdentityView() {
  const router = useRouter();
  const screenState = useScreenState("A2", [
    "awaiting_scan",
    "waiting_for_wallet",
    "verifying_against_register",
    "confirmed",
    "not_a_representative",
    "expired",
  ]);

  const [stage, setStage] = useState<Stage>("idle");
  const [skippable, setSkippable] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* Timers outlive the component if a presenter navigates mid-wait, and a
     setState after unmount is both a warning and a bug waiting to happen. */
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const start = (outcome: "confirmed" | "not_representative") => {
    setSkippable(false);
    setStage("wallet");
    timers.current.push(setTimeout(() => setSkippable(true), SKIP_AFTER_MS));
    timers.current.push(
      setTimeout(() => {
        setStage("register");
        timers.current.push(setTimeout(() => setStage(outcome), REGISTER_CHECK_MS));
      }, WALLET_HANDOFF_MS),
    );
  };

  /* The switcher drives the stage directly, so every face is reachable
     without sitting through the waits. */
  const forced: Stage | null =
    screenState === "awaiting_scan"
      ? null
      : screenState === "waiting_for_wallet"
        ? "wallet"
        : screenState === "verifying_against_register"
          ? "register"
          : screenState === "confirmed"
            ? "confirmed"
            : screenState === "not_a_representative"
              ? "not_representative"
              : "expired";

  const shown = forced ?? stage;

  const handoffStatus: HandoffStatus =
    shown === "idle"
      ? "awaiting_scan"
      : shown === "wallet"
        ? "waiting"
        : shown === "register"
          ? "verifying"
          : shown === "confirmed"
            ? "confirmed"
            : shown === "expired"
              ? "expired"
              : "failed";

  return (
    <OnboardingShell current={1}>
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-strong">
          Prove that you represent Norling Logistics
        </h1>
        <p className="max-w-[64ch] text-[13.5px] leading-[1.65] text-muted">
          Two things have to be true: that you are who you say you are, and
          that the register lists you as a representative of this organisation.
          You prove the first. The Registrar of Companies answers the second —
          we do not decide it, and we cannot.
        </p>
      </div>

      <Panel>
        <WalletHandoff
          value="ndi-onboarding-proof"
          title="Answer the proof request in your wallet"
          purpose="Your foundational credential establishes who you are, so the register can be asked about you by name."
          sharing={[
            "Your citizenship number, to the platform only",
            "Your full name, as it appears on your foundational credential",
          ]}
          status={handoffStatus}
          statusDetail={
            shown === "register"
              ? "Asking the Registrar of Companies whether you are a registered representative of Norling Logistics. This is a real lookup against an external body, and it takes as long as it takes."
              : shown === "not_representative"
                ? "The register does not list you as a representative of this organisation."
                : undefined
          }
          onRetry={() => setStage("idle")}
          onCancel={() => router.push("/onboarding/claim")}
          onSkip={
            skippable && (shown === "wallet" || shown === "register")
              ? () => setStage("confirmed")
              : undefined
          }
        />
      </Panel>

      {/* ---- The two stages, named ---- */}
      <Panel>
        <div className="relative z-[4] flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Where this is up to
          </p>
          <ol className="m-0 flex list-none flex-col gap-3 p-0">
            <StageRow
              label="You prove who you are"
              detail="Answered from your own wallet."
              state={
                shown === "wallet" || shown === "idle"
                  ? shown === "wallet"
                    ? "active"
                    : "waiting"
                  : shown === "expired"
                    ? "failed"
                    : "done"
              }
            />
            <StageRow
              label="The register confirms you represent the organisation"
              detail="Asked of the Registrar of Companies. The platform never asserts this itself."
              state={
                shown === "register"
                  ? "active"
                  : shown === "confirmed"
                    ? "done"
                    : shown === "not_representative"
                      ? "failed"
                      : "waiting"
              }
            />
          </ol>
        </div>
      </Panel>

      {/* ---- Outcomes ---- */}
      {shown === "not_representative" ? (
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
                We could not confirm that you represent Norling Logistics
              </p>
              <p className="max-w-[62ch] text-[13px] leading-[1.6] text-muted">
                Your identity was proved — that part worked. But the Registrar
                of Companies does not currently list you as a representative of
                this organisation, so nothing can be registered in its name.
              </p>
              <p className="max-w-[62ch] text-[13px] leading-[1.6] text-muted">
                This is a matter of record rather than a fault here. If the
                register is out of date, it has to be corrected with the
                Registrar first — we cannot override it, and an organisation
                whose representative we could not establish is exactly the
                organisation nobody should be able to register.
              </p>
              <p className="max-w-[62ch] text-[12.5px] leading-[1.5] text-faint">
                Nothing has been created and nothing about you has been kept.
              </p>
            </div>
          </div>
        </Panel>
      ) : null}

      {shown === "confirmed" ? (
        <Panel>
          <div className="relative z-[4] flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <Icon
                name="check"
                size={18}
                strokeWidth={2.4}
                className="mt-0.5 flex-none text-accent"
              />
              <div className="flex flex-col gap-1">
                <p className="font-display text-[14.5px] font-semibold text-strong">
                  The register confirms you
                </p>
                <p className="max-w-[62ch] text-[13px] leading-[1.6] text-muted">
                  You are listed as a representative of Norling Logistics Pvt.
                  Ltd. A wallet has been created for the organisation, and you
                  hold its root authority.
                </p>
              </div>
            </div>
            <div>
              <GradientButton onClick={() => router.push("/onboarding/foundational")}>
                Continue
                <Icon name="arrowRight" size={15} strokeWidth={2} />
              </GradientButton>
            </div>
          </div>
        </Panel>
      ) : null}

      {shown === "idle" ? (
        <div className="flex flex-wrap items-center gap-2.5">
          <GradientButton onClick={() => start("confirmed")}>
            <Icon name="fingerprint" size={15} strokeWidth={2} />
            Start the identity check
          </GradientButton>
          {/* The refusal has to be walkable, not just reachable through the
              state switcher — an audience asks "what if it says no?" and the
              answer should be a click, not a description. */}
          <button
            type="button"
            onClick={() => start("not_representative")}
            className="ndi-plainlink text-[12.5px] font-medium text-muted"
          >
            Show what happens if the register says no
          </button>
        </div>
      ) : null}
    </OnboardingShell>
  );
}

function StageRow({
  label,
  detail,
  state,
}: {
  label: string;
  detail: string;
  state: "waiting" | "active" | "done" | "failed";
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border"
        style={{
          borderColor:
            state === "failed"
              ? "rgb(225 73 62 / 0.45)"
              : state === "waiting"
                ? "var(--border-grid)"
                : "var(--ndi-mint-40)",
          background:
            state === "failed"
              ? "rgb(225 73 62 / 0.12)"
              : state === "waiting"
                ? "transparent"
                : "var(--ndi-mint-12)",
        }}
      >
        {state === "active" ? (
          <Icon name="refresh" size={12} strokeWidth={2.4} className="animate-spin text-accent" />
        ) : state === "done" ? (
          <Icon name="check" size={12} strokeWidth={3} className="text-accent" />
        ) : state === "failed" ? (
          <Icon name="close" size={12} strokeWidth={3} style={{ color: "var(--ndi-danger)" }} />
        ) : null}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span
          className="font-display text-[13.5px] font-medium leading-[1.4]"
          style={{ color: state === "waiting" ? "var(--text-faint)" : "var(--text-body)" }}
        >
          {label}
        </span>
        <span className="text-[12.5px] leading-[1.5] text-faint">{detail}</span>
      </span>
    </li>
  );
}
