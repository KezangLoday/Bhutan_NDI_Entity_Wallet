"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Icon, type IconName } from "@/components/ui/icons";
import { useDemo } from "@/lib/demoStore";
import { isPlatformAdmin, type OrgCapability, type PersonaId } from "@/lib/demoData";

interface NavChild {
  label: string;
  href: string;
  icon: IconName;
}

/**
 * `personas` is who may see the item at all.
 *
 * Absent, not disabled. The brief is firm about this and it is the right
 * call: a Controller who can see a Controllership group they may not open has
 * been told that administering their own authority is a thing they might do,
 * which is the one idea the product most needs them not to have. A disabled
 * row teaches the wrong model more effectively than no row at all.
 *
 * Omitting `personas` means everyone sees it.
 */
interface NavItem {
  label: string;
  icon: IconName;
  href?: string;
  /** A group renders a disclosure over its children instead of a plain row. */
  children?: NavChild[];
  /** Off-app destinations, which get the external-link treatment. */
  external?: boolean;
  personas?: PersonaId[];
  /**
   * What the organisation being worked in must be able to do for the item
   * to exist. Read from the organisation's capabilities, the way the
   * Approvals row reads the person's scope: Pelden holds, so it has a
   * Wallet and no issuing; Bank of Bhutan issues and verifies, and has a
   * Wallet only once it has set one up. `"no-holder"` is the way in to
   * asking for one.
   */
  needs?: OrgCapability | "no-holder";
  /** Only for NDI's own administrators (root and the admins root made). */
  platform?: "admin" | "root";
}

const OWNER: PersonaId[] = ["dorji"];
/* Anyone who operates the entity wallet, whether or not they hold authority
   yet — Ugyen has none until act 2 grants it, and the wallet group showing
   him "you hold no authority here" is the correct answer rather than a gap.
   A member who has just accepted an invitation is in the same position:
   they can see the organisation, and the wallet tells them they cannot act
   for it (FLOW-ONB-02 AC-08). */
const OPERATES: PersonaId[] = ["dorji", "rinzin", "ugyen", "invitee", "yeshey"];
/* An organisation's owner — Dorji for Pelden, Yeshey for Bank of Bhutan. */
const ORG_OWNERS: PersonaId[] = ["dorji", "yeshey"];
/* Everyone who belongs to, or works with, Pelden Trading — which is everyone
   except NDI's own administrators, who belong to no business on the
   platform and have nothing in its workspace to see. */
const PELDEN: PersonaId[] = ["dorji", "rinzin", "pema", "ugyen", "invitee"];
/* Everyone who works in some organisation's console — Pelden's people and
   Bank of Bhutan's owner. */
const ANY_ORG: PersonaId[] = [...PELDEN, "yeshey"];

const PRIMARY: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/dashboard", personas: ANY_ORG },

  /* ---- NDI administration ------------------------------------------------
     Only for the platform's own administrators. Their whole console is this
     group: they act for the platform administration organisation, not for
     any business, so none of a business's workspace appears for them. */
  {
    label: "NDI administration",
    icon: "shieldCheck",
    platform: "admin",
    children: [
      { label: "Organisations", href: "/admin/organisations", icon: "building" },
      { label: "Invitations", href: "/admin/invitations", icon: "mail" },
      { label: "Approvals", href: "/admin/approvals", icon: "userCheck" },
      { label: "Manual review", href: "/admin/reviews", icon: "fileText" },
    ],
  },
  /* Root's alone: making administrators. */
  { label: "Platform admins", icon: "users", href: "/admin/team", platform: "root" },

  /* For an organisation already on NDI without a wallet: the way to ask. */
  { label: "Entity Wallet", icon: "wallet", href: "/entity-wallet", personas: ORG_OWNERS, needs: "no-holder" },

  /* ---- Entity wallet ---------------------------------------------------
     The entity-wallet groups sit directly under Dashboard, above the
     issuer/verifier items below, because they are what someone signing in as
     a Controller came here to do. The brief's IA splits the console into
     "operate" (a Controller's day-to-day) and "govern" (an Owner's
     administration); that split is expressed by which of these a persona can
     see at all, not by two nav sections — a Controller who can see a
     Controllership group they may not use has been told the wrong thing.

     Held credentials live under /wallet, not /credentials: the /credentials
     tree is the issuer flow, and what the entity *holds* is a different idea
     that would be actively confusing sharing a path with it. */
  {
    label: "Wallet",
    icon: "wallet",
    personas: OPERATES,
    needs: "holder",
    children: [
      /* First, deliberately: a Controller's first question on signing in is
         what they are allowed to do, not what the entity happens to hold. */
      { label: "My authority", href: "/wallet/authority", icon: "lockRounded" },
      { label: "Held credentials", href: "/wallet/credentials", icon: "credentials" },
      { label: "Offers", href: "/wallet/offers", icon: "download" },
      { label: "Verification requests", href: "/wallet/verification-requests", icon: "verify" },
    ],
  },
  /* Approvals is the one item whose visibility comes from the scope rather
     than the persona list: it belongs to whoever holds approval:decide, and
     hard-coding that here would duplicate a fact the relation already
     states. Filtered below. */
  { label: "Approvals", icon: "userCheck", href: "/approvals" },
  /* Who belongs — next to Controllership, which is who may act. Side by side
     on purpose: they are the two things most easily mistaken for each other
     (FLOW-ONB-02 Q4), and the nav is the first place that can keep them
     apart. */
  { label: "Members", icon: "users", href: "/members", personas: OWNER },
  {
    label: "Controllership",
    icon: "lockRounded",
    personas: OWNER,
    children: [
      { label: "Relations", href: "/controllership/relations", icon: "link" },
      { label: "Entity", href: "/controllership/entity", icon: "building" },
      { label: "Audit", href: "/controllership/audit", icon: "fileText" },
    ],
  },
  { label: "Delegated authority", icon: "send", href: "/delegated-authority", personas: OWNER },
  /* Pema's only reason to open the console at all. */
  { label: "Appeals", icon: "shieldAlert", href: "/appeals", personas: PELDEN },

  /* ---- Issuing and verifying — the platform's existing product ----
     Shown only for an organisation that may do them, which Pelden may not:
     it signed up for an Entity Wallet and nothing else. Bank of Bhutan
     issues and verifies, so its owner sees these beside its wallet. */
  {
    label: "Issuance",
    icon: "issue",
    personas: ORG_OWNERS,
    needs: "issuer",
    children: [
      { label: "Issue a credential", href: "/credentials/issue", icon: "issue" },
      { label: "Issued credentials", href: "/credentials", icon: "credentials" },
      { label: "Schemas", href: "/schemas", icon: "layers" },
    ],
  },
  { label: "Verification", icon: "verify", href: "/verification", personas: ORG_OWNERS, needs: "verifier" },
];

const SECONDARY: NavItem[] = [
  { label: "GitHub Repository", icon: "github", href: "#", external: true },
  { label: "Documentation", icon: "fileText", href: "#", external: true },
  { label: "Support", icon: "helpCircle", href: "/legal/support" },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { harness, relations, currentPerson, organizations, activeOrgId } = useDemo();
  const persona = harness.persona;
  const org = organizations.find((o) => o.id === activeOrgId);
  const can = (c: OrgCapability) => Boolean(org?.capabilities.includes(c));
  const platformAdmin = isPlatformAdmin(currentPerson);

  /* Whether this person's active relation grants approval:decide. Read from
     the relation, not decided here — the scope is the fixture the server
     would have returned, and duplicating the answer in a persona list is how
     the nav and the authority viewer end up disagreeing. */
  const canDecideApprovals = relations.some(
    (r) =>
      r.personId === persona &&
      r.state === "ACTIVE" &&
      r.scope.grants.some((g) => g.operation === "approval:decide"),
  );

  const visible = (items: NavItem[]) =>
    items.filter((item) => {
      if (item.platform === "root") return currentPerson.platformRole === "root";
      if (item.platform === "admin") return platformAdmin;
      /* NDI's administrators belong to no business: none of a business's
         workspace is theirs to see. */
      if (platformAdmin) return false;
      if (item.needs === "no-holder" && can("holder")) return false;
      if (item.needs && item.needs !== "no-holder" && !can(item.needs)) return false;
      if (item.label === "Approvals") return canDecideApprovals;
      return !item.personas || item.personas.includes(persona);
    });

  const groupHoldsPath = (item: NavItem) =>
    Boolean(item.children?.some((child) => pathname.startsWith(child.href)));

  /** A group containing the current page starts open; otherwise closed. */
  const [expanded, setExpanded] = useState<string | null>(
    PRIMARY.find(groupHoldsPath)?.label ?? null,
  );

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Scrim, mobile only. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[54] bg-[var(--scrim)] backdrop-blur-[5px] transition-opacity duration-[280ms] min-[901px]:hidden"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
        }}
      />

      <aside
        aria-label="Main"
        data-open={open ? "1" : "0"}
        /* On desktop the rail carries the same fill and blur as the top bar,
           not a transparent panel: the two meet along the whole left column,
           and a translucent band above a see-through one read as two
           different surfaces bolted together. As a drawer it stays more
           opaque, since content sits directly behind it. */
        className="fixed left-0 top-16 z-[55] flex h-[calc(100dvh-4rem)] w-[248px] flex-col overflow-y-auto border-r border-subtle bg-[var(--chrome-fill-strong)] px-3 py-5 backdrop-blur-[20px] backdrop-saturate-[140%] transition-transform duration-[260ms] ease-ndi min-[901px]:translate-x-0 min-[901px]:bg-[var(--chrome-fill)]"
        style={{ transform: open ? "translateX(0)" : undefined }}
      >
        <nav className="flex flex-col gap-0.5">
          {visible(PRIMARY).map((item) => {
            if (item.children) {
              const isOpen = expanded === item.label;
              const holdsCurrent = groupHoldsPath(item);
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="ndi-navrow flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left font-display text-[13.5px] font-medium"
                    /* The parent shows as current only while collapsed — with
                       the group open, the active child carries that signal. */
                    data-active={holdsCurrent && !isOpen ? "1" : "0"}
                  >
                    <Icon name={item.icon} size={18} strokeWidth={1.7} className="flex-none" />
                    <span className="flex-1">{item.label}</span>
                    <Icon
                      name="chevronDown"
                      size={14}
                      strokeWidth={2}
                      className="flex-none opacity-60 transition-transform duration-200 ease-ndi"
                      style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
                    />
                  </button>

                  {isOpen ? (
                    <div className="mt-0.5 flex flex-col gap-0.5 pb-1 pl-[22px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          aria-current={isCurrent(child.href) ? "page" : undefined}
                          className="ndi-navrow flex items-center gap-2.5 rounded-[9px] px-3 py-2 font-display text-[13px] font-medium"
                          data-active={isCurrent(child.href) ? "1" : "0"}
                        >
                          <Icon name={child.icon} size={16} strokeWidth={1.7} className="flex-none" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            const href = item.href ?? "#";
            return (
              <Link
                key={item.label}
                href={href}
                onClick={onClose}
                aria-current={isCurrent(href) ? "page" : undefined}
                className="ndi-navrow flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 font-display text-[13.5px] font-medium"
                data-active={isCurrent(href) ? "1" : "0"}
              >
                <Icon name={item.icon} size={18} strokeWidth={1.7} className="flex-none" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="my-4 h-px bg-[var(--border-subtle)]" />

        <nav aria-label="Resources" className="flex flex-col gap-0.5">
          {SECONDARY.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="ndi-navrow flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 font-display text-[13.5px] font-medium"
              data-active="0"
            >
              <Icon name={item.icon} size={18} strokeWidth={1.7} className="flex-none" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
