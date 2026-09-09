"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Icon } from "@/components/ui/icons";
import { useDemo } from "@/lib/demoStore";
import { ACTS, actByNumber } from "@/lib/demoStory";
import type { PersonaId } from "@/lib/demoData";

import { useScreenRegistry } from "./screenState";

/**
 * The demo harness: the marker, the persona switcher, the story runner, the
 * state switcher and reset, in one bar.
 *
 * Deliberately not part of the product chrome. It sits in its own fixed bar
 * rather than in the top bar or the sidebar, because the audience for this
 * demo includes people signing the thing off, and a persona switcher that
 * looks like a product feature invites the question "so users can become
 * other users?". Everything here is visibly scaffolding.
 *
 * Collapsed by default. The marker stays visible either way — that part is
 * not a control, it is a disclosure, and it does not get to be dismissed.
 */
export function DemoHarness() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    harness,
    people,
    setPersona,
    setAct,
    setStateOverride,
    clearStateOverrides,
    resetDemo,
    hydrated,
  } = useDemo();
  const { registered } = useScreenRegistry();
  const [open, setOpen] = useState(false);

  /* The auth screens are pre-sign-in and have no persona. Showing a switcher
     there would suggest the choice matters before anyone is signed in. */
  const onAuthScreen =
    pathname === "/" || pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  /** Personas are the three the story is driven as, in story order. */
  const personas = people.filter((p): p is typeof p & { id: PersonaId } =>
    ["rinzin", "dorji", "pema"].includes(p.id),
  );

  const act = actByNumber(harness.act);

  const goToAct = (n: number) => {
    const target = actByNumber(n);
    if (!target) return;
    setAct(n);
    setPersona(target.persona);
    router.push(target.route);
  };

  /* The marker renders on the server along with everything else, and is not
     gated on hydration. It is a disclosure rather than a control: a claim
     about what this page is that should survive slow JavaScript, a failed
     bundle and a screenshot taken before the client caught up.

     The panel is, in effect, gated anyway — `open` starts false, so nothing
     that reads persisted persona or act state can paint before the store has
     been read. The one thing worth waiting for is the act summary, which
     would otherwise show act 1 as Rinzin for a frame before swapping to
     whichever act the story was left on. */
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex flex-col items-start gap-2 p-3 min-[641px]:p-4">
      {open && hydrated ? (
        <div className="pointer-events-auto w-full max-w-[560px] rounded-2xl border border-grid bg-[var(--chrome-fill-strong)] p-3.5 shadow-[var(--shadow-card)] backdrop-blur-[20px] backdrop-saturate-[140%]">
          {/* ---- Story runner ---- */}
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
              Story
            </p>
            {act ? (
              <p className="font-display text-[12px] font-medium text-muted">
                Act {act.number} of {ACTS.length}
              </p>
            ) : (
              <p className="font-display text-[12px] font-medium text-faint">Not started</p>
            )}
          </div>

          <p className="mt-1.5 font-display text-[14px] font-semibold leading-[1.35] text-body">
            {act ? act.title : "Six acts, one entity"}
          </p>
          <p className="mt-1 text-[12.5px] leading-[1.5] text-muted">
            {act
              ? act.learns
              : "Start the story to be put on the right screen as the right person."}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => goToAct(Math.max(1, harness.act - 1))}
              disabled={harness.act <= 1}
              className="ndi-hairline-btn inline-flex h-9 items-center gap-1.5 rounded-[10px] px-3 font-display text-[13px] font-medium disabled:opacity-40"
            >
              <Icon name="arrowLeft" size={14} strokeWidth={2} />
              Back
            </button>
            <button
              type="button"
              onClick={() => goToAct(harness.act === 0 ? 1 : Math.min(ACTS.length, harness.act + 1))}
              disabled={harness.act >= ACTS.length}
              className="ndi-hairline-btn inline-flex h-9 items-center gap-1.5 rounded-[10px] px-3 font-display text-[13px] font-medium disabled:opacity-40"
            >
              {harness.act === 0 ? "Start" : "Next"}
              <Icon name="arrowRight" size={14} strokeWidth={2} />
            </button>

            {/* Direct jumps, because a demo never runs in a straight line the
                second time — somebody always asks to see act 5 again. */}
            <div className="ml-auto flex items-center gap-1">
              {ACTS.map((a) => (
                <button
                  key={a.number}
                  type="button"
                  onClick={() => goToAct(a.number)}
                  aria-label={`Act ${a.number}: ${a.title}`}
                  aria-current={a.number === harness.act ? "step" : undefined}
                  className="ndi-navrow h-7 w-7 rounded-[8px] font-display text-[12px] font-semibold"
                  data-active={a.number === harness.act ? "1" : "0"}
                >
                  {a.number}
                </button>
              ))}
            </div>
          </div>

          {/* ---- Persona ---- */}
          {!onAuthScreen ? (
            <>
              <div className="my-3 h-px bg-[var(--border-subtle)]" />
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
                Driving as
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {personas.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPersona(p.id)}
                    aria-pressed={harness.persona === p.id}
                    className="ndi-navrow flex flex-col items-start rounded-[10px] px-2.5 py-1.5 text-left"
                    data-active={harness.persona === p.id ? "1" : "0"}
                  >
                    <span className="font-display text-[13px] font-medium">{p.name}</span>
                    <span className="text-[11.5px] leading-tight text-faint">{p.title}</span>
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {/* ---- State switcher ---- */}
          <div className="my-3 h-px bg-[var(--border-subtle)]" />
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
              This screen&rsquo;s states
            </p>
            {Object.keys(harness.stateOverrides).length > 0 ? (
              <button
                type="button"
                onClick={clearStateOverrides}
                className="ndi-plainlink font-display text-[12px] font-medium text-muted"
              >
                Clear all
              </button>
            ) : null}
          </div>

          {registered ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {registered.states.map((s, i) => {
                const active = (harness.stateOverrides[registered.screen] ?? registered.states[0]) === s;
                return (
                  <button
                    key={s}
                    type="button"
                    /* The first entry is the natural state, so choosing it
                       removes the override rather than pinning it. */
                    onClick={() => setStateOverride(registered.screen, i === 0 ? null : s)}
                    aria-pressed={active}
                    className="ndi-navrow rounded-[9px] px-2.5 py-1.5 font-display text-[12.5px] font-medium"
                    data-active={active ? "1" : "0"}
                  >
                    {s.replace(/_/g, " ")}
                    {i === 0 ? <span className="text-faint"> · default</span> : null}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-1.5 text-[12.5px] leading-[1.5] text-faint">
              This screen has not declared any states yet.
            </p>
          )}

          {/* ---- Reset ---- */}
          <div className="my-3 h-px bg-[var(--border-subtle)]" />
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] leading-[1.5] text-faint">
              Every register, approval and decision here is a fixture.
            </p>
            <button
              type="button"
              onClick={() => {
                resetDemo();
                router.push("/dashboard");
              }}
              className="ndi-hairline-btn inline-flex h-9 flex-none items-center gap-1.5 rounded-[10px] px-3 font-display text-[13px] font-medium"
            >
              <Icon name="refresh" size={14} strokeWidth={2} />
              Reset demo
            </button>
          </div>
        </div>
      ) : null}

      {/* ---- The marker, and the way in ---- */}
      <div className="pointer-events-auto flex items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-grid bg-[var(--chrome-fill-strong)] px-3 py-1.5 backdrop-blur-[20px]">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 flex-none rounded-full"
            style={{ background: "var(--ndi-warning)" }}
          />
          <span className="font-display text-[11.5px] font-medium tracking-[0.02em] text-muted">
            Prototype · data simulated
          </span>
        </span>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="ndi-hairline-btn inline-flex h-8 items-center gap-1.5 rounded-full px-3 font-display text-[12px] font-medium"
        >
          {open ? "Hide" : "Demo controls"}
          <Icon
            name="chevronDown"
            size={13}
            strokeWidth={2}
            className="transition-transform duration-200 ease-ndi"
            style={{ transform: `rotate(${open ? 0 : 180}deg)` }}
          />
        </button>
      </div>
    </div>
  );
}
