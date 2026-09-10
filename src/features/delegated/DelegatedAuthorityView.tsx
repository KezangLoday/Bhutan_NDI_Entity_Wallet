"use client";

import Link from "next/link";

import { useScreenState } from "@/components/demo/screenState";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { GradientButton } from "@/components/ui/GradientButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { StatusPill } from "@/components/ui/StatusPill";
import { Icon } from "@/components/ui/icons";
import { useDemo } from "@/lib/demoStore";

import { describeConstraints } from "./constraints";

/**
 * D1 — everything the entity has issued into other people's wallets.
 *
 * A register, built to the depth the plan asks for: correct columns,
 * populated, and a way through to the one thing you actually do from here.
 * Registers demo poorly and cost real time, so this one does not get filters,
 * search or sorting until something needs them.
 *
 * Two columns carry the weight. **Constraints** is what any verifier can read
 * off the credential, so it has to be legible here too — an Owner should be
 * able to audit what they have given away without opening five rows.
 * **Acceptance** is separate from status because they answer different
 * questions: an authority can be perfectly active and never have been taken
 * into anyone's wallet, and treating "issued" as "in use" is how an Owner
 * comes to believe someone can act when they cannot.
 */
export function DelegatedAuthorityView() {
  const { delegatedAuthorities, personById } = useDemo();

  const variant = useScreenState("D1", ["populated", "empty"]);
  const rows = variant === "empty" ? [] : delegatedAuthorities;

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Delegated authority" }]}
          title="Delegated authority"
          actions={
            <Link href="/delegated-authority/new">
              <GradientButton>
                <Icon name="plus" size={15} strokeWidth={2} />
                Issue authority
              </GradientButton>
            </Link>
          }
        />

        <p className="max-w-[68ch] text-[13.5px] leading-[1.65] text-muted">
          Authority the entity has issued into people&rsquo;s own wallets. Each
          one carries constraints any counterparty can read, and each one traces
          back to a controllership relation. Withdrawing one takes effect
          wherever it is next used.
        </p>

        <Panel padded={false}>
          <DataTable
            columns={["Holder", "Authority", "Constraints", "Status", "Acceptance", ""]}
            empty={{
              icon: "send",
              title: "Nothing delegated yet",
              message:
                "When the entity issues a role or a capability into someone's wallet, it appears here — with the constraints a verifier will check against.",
              action: (
                <Link href="/delegated-authority/new">
                  <GradientButton>Issue authority</GradientButton>
                </Link>
              ),
            }}
          >
            {rows.map((authority) => {
              const holder = personById(authority.recipientId);
              const parent = authority.parentId
                ? delegatedAuthorities.find((a) => a.id === authority.parentId)
                : null;

              return (
                <tr key={authority.id}>
                  <td>
                    <span className="flex flex-col">
                      <span className="text-body">{holder.name}</span>
                      <span className="text-[12px] text-faint">{holder.title}</span>
                    </span>
                  </td>
                  <td>
                    <span className="flex flex-col">
                      <span className="text-body">{authority.title}</span>
                      <span className="text-[12px] text-faint">
                        {authority.kind === "role" ? "Role" : "Capability"}
                        {/* The parent is what makes this a chain rather than a
                            list, and it is the column an Owner needs when
                            deciding what a revocation will take down with it. */}
                        {parent ? ` · under ${parent.title}` : ""}
                      </span>
                    </span>
                  </td>
                  <td className="max-w-[280px]">
                    <span className="text-[12.5px] leading-[1.5] text-muted">
                      {describeConstraints(authority)}
                    </span>
                  </td>
                  <td>
                    <StatusPill status={authority.status} />
                  </td>
                  <td>
                    <StatusPill
                      status={
                        authority.acceptance === "accepted"
                          ? "accepted"
                          : authority.acceptance === "sent"
                            ? "awaiting_acceptance"
                            : authority.acceptance
                      }
                    />
                  </td>
                  <td>
                    {authority.status === "REVOKED" || authority.status === "EXPIRED" ? (
                      <span className="text-[12.5px] text-faint">—</span>
                    ) : (
                      <Link
                        href={`/delegated-authority/${authority.id}/revoke`}
                        className="ndi-plainlink whitespace-nowrap text-[12.5px] font-medium text-muted"
                      >
                        Withdraw
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </DataTable>
        </Panel>
      </div>
    </AppShell>
  );
}
