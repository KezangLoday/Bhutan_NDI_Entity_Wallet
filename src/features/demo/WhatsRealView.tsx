"use client";

import Link from "next/link";

import { Panel } from "@/components/ui/Panel";
import { StatusPill } from "@/components/ui/StatusPill";
import { Icon, type IconName } from "@/components/ui/icons";

/**
 * The page behind the prototype marker.
 *
 * WHY THIS IS A SCREEN AND NOT A PARAGRAPH IN THE README
 *
 * This demo shows a government register confirming a representative in a few
 * seconds, revocation reaching a counterparty instantly, and a signed
 * verification decision. Somebody in the room will conclude those are built —
 * and the person most likely to conclude it is the person deciding whether to
 * fund building them. A note in a repository nobody opens does not reach that
 * person; a page one click from the marker on every screen does.
 *
 * It is written to be handed over rather than narrated, because the question
 * usually arrives after the demo, by email, from somebody who was not there.
 *
 * HOW IT IS ORGANISED
 *
 * By what would have to be built, not by screen, because that is the question
 * being asked underneath "is this real?" — what is left to do. And the honest
 * answer includes the parts that *are* real: the model, the vocabulary and the
 * flow are genuine work product, and undersellling them is its own kind of
 * inaccuracy.
 */
interface Row {
  shown: string;
  reality: string;
  /** What would have to exist for this to be real. */
  needs: string;
}

const SIMULATED: { area: string; icon: IconName; rows: Row[] }[] = [
  {
    area: "Identity and the register",
    icon: "fingerprint",
    rows: [
      {
        shown: "A wallet proof request answered on a phone",
        reality:
          "An authored pause and a deliberately non-scannable code. No wallet is contacted and nothing is signed.",
        needs: "The existing NDI wallet proof-request flow, wired to this console.",
      },
      {
        shown: "The Registrar of Companies confirming a representative",
        reality:
          "A fixture and a four-second delay. No register is queried, and the refusal is a button rather than an answer.",
        needs:
          "An integration per register, and a governance decision about which register confirms which kind of entity.",
      },
    ],
  },
  {
    area: "Authority and enforcement",
    icon: "lockRounded",
    rows: [
      {
        shown: "Scope refusing an out-of-scope action",
        reality:
          "Every allow, deny and park in this demo is a value written into a fixture. Nothing is enforced — the screens render decisions they were handed.",
        needs:
          "Server-side enforcement: a guard that resolves active relations from the database and denies by default, plus a service-layer re-check before the agent call.",
      },
      {
        shown: "An approval holding an operation back, then releasing it",
        reality:
          "State in your browser. The re-validation at execution is modelled, but nothing is executed.",
        needs: "An approval-policy engine and a parked-operation store with real TTLs.",
      },
      {
        shown: "An approval signed from a wallet",
        reality:
          "A pause. The payload fingerprint shown is real in shape and random in content — nothing commits to anything.",
        needs: "Approval-as-presentation: the operation hash embedded in a proof request.",
      },
    ],
  },
  {
    area: "Delegated authority",
    icon: "send",
    rows: [
      {
        shown: "A credential arriving in someone's personal wallet",
        reality:
          "A row in browser storage, and a button labelled “simulate accepting”. Nobody's phone receives anything.",
        needs: "Role and Capability issuance carrying the public constraint schema.",
      },
      {
        shown: "A signed PASS / FAIL decision at a counterparty",
        reality:
          "Derived live, in the browser, by a stand-in that walks the real chain and fails closed. The logic is genuine; the service is not, and the signature is a random string of the right shape.",
        needs:
          "The authority verification service itself, independently scaled, plus a live status query on the revocation agent.",
      },
      {
        shown: "Revocation reaching a verifier within a minute",
        reality: "Instant, because both sides are the same browser tab. Nothing propagates anywhere.",
        needs: "Status lists, and cache invalidation on the revocation agent.",
      },
    ],
  },
  {
    area: "The record",
    icon: "fileText",
    rows: [
      {
        shown: "An append-only, hash-chained audit trail",
        reality:
          "An array in your browser's local storage. The fingerprints are random, the chain is not verified, and clearing site data erases the lot.",
        needs:
          "A dedicated append-only store, append-only at database-privilege level, with a per-organisation hash chain and externally anchored checkpoints.",
      },
      {
        shown: "An evidence bundle export",
        reality: "A confirmation message. No file is produced.",
        needs: "Export, and a format a third party can check without access to this console.",
      },
    ],
  },
];

const REAL = [
  "The authority model — controllership, scope, approval policy, the Role and Capability chain, and how they relate.",
  "The plain-language scope grammar, and the claim that a person can read an authority in five seconds.",
  "Every screen, state and refusal, including the ones nobody clicks their way to.",
  "The order of the flows, and which surface each step belongs to.",
  "The rule that the console renders decisions rather than making them — the demo is built that way so the real thing can be too.",
];

export function WhatsRealView() {
  return (
    <div className="min-h-dvh" style={{ background: "var(--surface-sunken)" }}>
      <main className="mx-auto flex w-full max-w-[900px] flex-col gap-6 px-4 py-8 min-[641px]:px-6 min-[901px]:py-12">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <StatusPill status="pending" label="Prototype" />
            <span className="text-[12.5px] text-faint">Nothing below the interface is built</span>
          </div>
          <h1 className="font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.025em] text-strong">
            What&rsquo;s real, and what is simulated
          </h1>
          <p className="max-w-[64ch] text-[14px] leading-[1.7] text-muted">
            This is a front-end prototype of the Entity Wallet. Its job is to
            make us agree on what the product should be before anyone builds
            it. The screens and the model behind them are real work; everything
            underneath them is a fixture in your browser. This page says which
            is which, so nobody has to guess.
          </p>
        </div>

        {/* ---- What is real ---- */}
        <Panel>
          <div className="relative z-[4] flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Icon name="check" size={17} strokeWidth={2.3} className="flex-none text-accent" />
              <h2 className="font-display text-[16px] font-semibold text-strong">
                Real, and decided
              </h2>
            </div>
            <p className="max-w-[62ch] text-[13px] leading-[1.6] text-muted">
              These are conclusions, not placeholders. Changing them is a design
              decision rather than an implementation detail.
            </p>
            <ul className="mt-1 flex flex-col gap-2">
              {REAL.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Icon
                    name="check"
                    size={13}
                    strokeWidth={2.6}
                    className="mt-[5px] flex-none text-accent"
                  />
                  <span className="max-w-[64ch] text-[13.5px] leading-[1.6] text-body">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* ---- What is not ---- */}
        {SIMULATED.map((group) => (
          <Panel key={group.area}>
            <div className="relative z-[4] flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-[9px] border border-grid"
                  style={{ background: "rgb(var(--tint) / 0.04)" }}
                >
                  <Icon name={group.icon} size={15} strokeWidth={1.9} />
                </span>
                <h2 className="font-display text-[16px] font-semibold text-strong">
                  {group.area}
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {group.rows.map((row, i) => (
                  <div
                    key={row.shown}
                    className={`flex flex-col gap-2 ${i > 0 ? "border-t border-subtle pt-4" : ""}`}
                  >
                    <p className="font-display text-[13.5px] font-medium leading-[1.4] text-body">
                      {row.shown}
                    </p>
                    <p className="max-w-[64ch] text-[13px] leading-[1.6] text-muted">
                      {row.reality}
                    </p>
                    <p className="max-w-[64ch] text-[12.5px] leading-[1.55] text-faint">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                        Would need
                      </span>{" "}
                      · {row.needs}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        ))}

        {/* ---- The blunt version ---- */}
        <Panel>
          <div className="relative z-[4] flex flex-col gap-3">
            <h2 className="font-display text-[16px] font-semibold text-strong">
              The short answer
            </h2>
            <p className="max-w-[64ch] text-[13.5px] leading-[1.65] text-body">
              There is no server, no database, no register integration, no
              verification service and no wallet. There is no network layer at
              all — the application makes no requests. Every organisation,
              person, credential, approval and decision you see lives in your
              browser&rsquo;s local storage and can be wiped with one button.
            </p>
            <p className="max-w-[64ch] text-[13.5px] leading-[1.65] text-muted">
              What it is good for: agreeing the model, testing whether people
              can read an authority, and finding out which screens are wrong
              while they are still cheap to change.
            </p>
            <p className="max-w-[64ch] text-[13.5px] leading-[1.65] text-muted">
              What it is not evidence of: that any of it works, or how long the
              real thing takes to build.
            </p>
          </div>
        </Panel>

        <div className="flex flex-wrap items-center gap-4 pb-2">
          <Link
            href="/dashboard"
            className="ndi-hairline-btn inline-flex h-11 items-center gap-2 rounded-[10px] border border-grid px-4 font-display text-[13.5px] font-medium"
          >
            <Icon name="arrowLeft" size={14} strokeWidth={2} />
            Back to the demo
          </Link>
          <span className="text-[12.5px] text-faint">
            This page is linked from the prototype marker on every screen.
          </span>
        </div>
      </main>
    </div>
  );
}
