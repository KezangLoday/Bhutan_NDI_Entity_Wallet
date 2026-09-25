"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useScreenState } from "@/components/demo/screenState";
import { AppShell } from "@/components/layout/AppShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SimulatedLink } from "@/components/ui/SimulatedStep";
import { StatusPill } from "@/components/ui/StatusPill";
import { Icon } from "@/components/ui/icons";
import { isPlatformAdmin } from "@/lib/demoData";
import { useDemo } from "@/lib/demoStore";

/**
 * Platform admins — the first thing root does on the platform.
 *
 * WHY ROOT PICKS FROM NDI'S STAFF RATHER THAN TYPING AN ADDRESS
 *
 * An administrator decides other organisations' access, so who may become
 * one is not open-ended: it is NDI's own people. The list is NDI's staff
 * directory — here, everyone with an @ndi.bt address — and root invites
 * from it. A free-text address would make "which stranger got admin?" a
 * question the audit trail has to answer.
 *
 * ONLY ROOT MAKES ADMINISTRATORS
 *
 * An administrator sees this page read-only, with the reason stated where
 * the button would be (UXD-03). The store refuses a non-root invitation
 * regardless: the page is not the boundary.
 */
export function PlatformAdminsView() {
  const router = useRouter();
  const { people, orgInvitations, currentPerson, invitePlatformAdmin, personById } = useDemo();
  const forced = useScreenState("SCR-ADM-01", ["default", "loading", "read_only"]);
  const [done, setDone] = useState<string | null>(null);

  const isRoot = currentPerson.platformRole === "root" && forced !== "read_only";
  const staff = people.filter((p) => p.email.endsWith("@ndi.bt"));
  const pendingFor = (email: string) =>
    orgInvitations.find((i) => i.kind === "A" && i.email === email && i.state === "PENDING");

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-5">
        <PageHeader crumbs={[{ label: "NDI administration" }, { label: "Platform admins" }]} title="Platform admins" />
        <p className="max-w-[68ch] text-[13.5px] leading-[1.65] text-muted">
          The people who run the platform day to day: they review organisations&rsquo; requests for
          access and decide them. Nobody can bring an organisation onto the Entity Wallet until at
          least one of them has accepted.
        </p>

        {done ? (
          <p role="status" className="flex items-center gap-2 rounded-[12px] border border-grid px-4 py-3 text-[13px] text-accent" style={{ background: "var(--ndi-mint-08)" }}>
            <Icon name="check" size={14} strokeWidth={2.4} />
            {done}
          </p>
        ) : null}

        {!isRoot ? (
          <p className="flex items-start gap-2.5 rounded-[12px] border border-grid px-4 py-3 text-[13px] leading-[1.6] text-body">
            <Icon name="lockRounded" size={15} strokeWidth={2} className="mt-[3px] flex-none" style={{ color: "var(--ndi-warning)" }} />
            Only the root administrator can make someone a platform admin.
          </p>
        ) : null}

        {forced === "loading" ? (
          <div aria-hidden="true" className="h-56 animate-pulse rounded-[16px] border border-grid" />
        ) : (
          <Panel padded={false}>
            <ul className="relative z-[4] m-0 flex list-none flex-col p-0">
              {staff.map((p, i) => {
                const pending = pendingFor(p.email);
                const status = p.platformRole === "root" ? "root" : isPlatformAdmin(p) ? "admin" : pending ? "invited" : "none";
                return (
                  <li key={p.id} className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 ${i > 0 ? "border-t border-subtle" : ""}`}>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-[14px] font-medium text-body">{p.name}</span>
                      <span className="text-[12.5px] text-faint">{p.email}</span>
                    </span>
                    <span className="flex flex-wrap items-center gap-2.5">
                      {status === "root" ? (
                        <StatusPill status="active" label="Root administrator" />
                      ) : status === "admin" ? (
                        <StatusPill status="active" label="Platform admin" />
                      ) : status === "invited" && pending ? (
                        <>
                          <StatusPill status="pending" label={`Invited by ${personById(pending.invitedBy).name}`} />
                          <SimulatedLink onClick={() => router.push(`/invitation/${pending.id}`)}>Open as the invitee</SimulatedLink>
                        </>
                      ) : isRoot ? (
                        <GradientButton
                          onClick={() => {
                            const r = invitePlatformAdmin(p.id);
                            if (r.ok) setDone(`Invitation sent to ${p.name}. It lasts 30 days.`);
                          }}
                        >
                          <Icon name="send" size={14} strokeWidth={2} />
                          Invite as platform admin
                        </GradientButton>
                      ) : (
                        <StatusPill status="inactive" label="Not an admin" />
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        )}
      </div>
    </AppShell>
  );
}
