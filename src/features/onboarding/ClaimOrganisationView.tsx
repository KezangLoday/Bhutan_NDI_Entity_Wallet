"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useScreenState } from "@/components/demo/screenState";
import { GradientButton } from "@/components/ui/GradientButton";
import { Panel } from "@/components/ui/Panel";
import { StatusPill } from "@/components/ui/StatusPill";
import { Icon } from "@/components/ui/icons";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { LOCAL_MS } from "@/lib/demoTiming";

import { OnboardingShell } from "./OnboardingShell";

/**
 * A1 — find the organisation you say you represent.
 *
 * WHICH REGISTER CONFIRMS YOU DEPENDS ON WHAT KIND OF THING YOU ARE
 *
 * The brief flags this as a governance input still being decided: a company
 * is confirmed by one register, a licensed business by another, and some
 * entity types by none yet. So the confirming source is attached to the
 * entity type here rather than hard-coded to the companies registrar, and the
 * screen names it before anyone commits — someone about to prove their
 * identity should know who is going to be asked about them.
 *
 * The unsupported case is real and needs designing, not hiding: if we have no
 * register for a kind of entity, that entity cannot onboard, and saying so
 * plainly beats a search that returns nothing for reasons nobody can see.
 */
const ENTITY_TYPES = [
  {
    value: "company",
    label: "Private or public limited company",
    register: "Registrar of Companies",
    supported: true,
  },
  {
    value: "licensed",
    label: "Licensed business",
    register: "Ministry of Industry, Commerce & Employment",
    supported: true,
  },
  {
    value: "cso",
    label: "Civil society organisation",
    register: "Civil Society Organisations Authority",
    supported: false,
  },
];

/** What a search would return. Matched loosely so any sensible query finds it. */
const MATCHES = [
  {
    name: "Norling Logistics Pvt. Ltd.",
    registration: "CRA-2019-04477",
    address: "Babesa, Thimphu",
    incorporated: "2019",
  },
];

export function ClaimOrganisationView() {
  const router = useRouter();
  const screenState = useScreenState("A1", [
    "default",
    "no_match",
    "type_unsupported",
    "register_unavailable",
  ]);

  const [type, setType] = useState(ENTITY_TYPES[0]);
  const [query, setQuery] = useState("Norling");
  const [searched, setSearched] = useState(true);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<string | null>(MATCHES[0].name);

  const unsupported = screenState === "type_unsupported" || !type.supported;
  const unavailable = screenState === "register_unavailable";
  const noMatch = screenState === "no_match";

  const results = noMatch || unsupported || unavailable ? [] : MATCHES;

  const search = () => {
    setSearching(true);
    setSelected(null);
    setTimeout(() => {
      setSearching(false);
      setSearched(true);
    }, LOCAL_MS);
  };

  return (
    <OnboardingShell current={0}>
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-strong">
          Which organisation are you registering?
        </h1>
        <p className="max-w-[64ch] text-[13.5px] leading-[1.65] text-muted">
          Registering gives your organisation a wallet of its own — it can hold
          credentials, prove things about itself, and let named people act for
          it. First we need to establish that the organisation exists and that
          you represent it.
        </p>
      </div>

      <Panel>
        <div className="relative z-[4] flex flex-col gap-5">
          <div className={FIELD_BLOCK_CLASS}>
            <span className={LABEL_CLASS}>Kind of organisation</span>
            <div className="flex flex-col gap-1.5">
              {ENTITY_TYPES.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-start gap-3 rounded-[11px] border px-3.5 py-3"
                  style={{
                    borderColor:
                      type.value === option.value ? "var(--ndi-mint-40)" : "var(--border-grid)",
                    background:
                      type.value === option.value ? "var(--ndi-mint-08)" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="entity-type"
                    checked={type.value === option.value}
                    onChange={() => {
                      setType(option);
                      setSearched(false);
                      setSelected(null);
                    }}
                    className="mt-0.5 h-4 w-4 flex-none accent-[var(--ndi-mint)]"
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="font-display text-[13.5px] font-medium text-body">
                      {option.label}
                    </span>
                    <span className="text-[12.5px] leading-[1.5] text-faint">
                      Confirmed by the {option.register}
                    </span>
                  </span>
                  {!option.supported ? (
                    <StatusPill status="pending" label="Not yet available" />
                  ) : null}
                </label>
              ))}
            </div>
          </div>

          {unsupported ? (
            <p
              role="status"
              className="flex items-start gap-2 rounded-[12px] border px-3.5 py-3 text-[13px] leading-[1.55]"
              style={{
                borderColor: "rgb(245 183 64 / 0.4)",
                background: "rgb(245 183 64 / 0.08)",
                color: "var(--text-body)",
              }}
            >
              <Icon
                name="info"
                size={14}
                strokeWidth={2}
                className="mt-px flex-none"
                style={{ color: "var(--ndi-warning)" }}
              />
              <span>
                There is no register we can check for this kind of organisation
                yet, so we cannot confirm that you represent it. Until there is,
                organisations of this kind cannot be registered here.
              </span>
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-end gap-2.5">
                <label className={`${FIELD_BLOCK_CLASS} min-w-[240px] flex-1`}>
                  <span className={LABEL_CLASS}>Name or registration number</span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSearched(false);
                    }}
                    className={`${FIELD_CLASS} h-11`}
                  />
                </label>
                <GradientButton onClick={search} disabled={query.trim() === "" || searching}>
                  <Icon name="search" size={15} strokeWidth={2} />
                  {searching ? "Searching" : "Search"}
                </GradientButton>
              </div>

              <p className="text-[12px] leading-[1.5] text-faint">
                Searching the {type.register}. We look your organisation up
                there rather than taking your word for it.
              </p>

              {unavailable ? (
                <p
                  role="status"
                  className="flex items-start gap-2 rounded-[12px] border px-3.5 py-3 text-[13px] leading-[1.55]"
                  style={{
                    borderColor: "rgb(225 73 62 / 0.35)",
                    background: "rgb(225 73 62 / 0.07)",
                    color: "var(--text-body)",
                  }}
                >
                  <Icon
                    name="close"
                    size={14}
                    strokeWidth={2.2}
                    className="mt-px flex-none"
                    style={{ color: "var(--ndi-danger)" }}
                  />
                  <span>
                    The {type.register} cannot be reached, so nothing can be
                    confirmed right now. Nothing has been created and nothing
                    has been sent. Try again shortly.
                  </span>
                </p>
              ) : null}

              {searched && !unavailable ? (
                results.length === 0 ? (
                  <div className="rounded-[12px] border border-grid px-3.5 py-4">
                    <p className="font-display text-[13.5px] font-medium text-body">
                      Nothing found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="mt-1 max-w-[56ch] text-[13px] leading-[1.55] text-muted">
                      The register has no organisation of this kind under that
                      name or number. Check the spelling, or try the
                      registration number instead. An organisation that is not
                      on the register cannot be registered here.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <span className={LABEL_CLASS}>Found on the register</span>
                    {results.map((match) => (
                      <label
                        key={match.name}
                        className="flex cursor-pointer items-start gap-3 rounded-[11px] border px-3.5 py-3"
                        style={{
                          borderColor:
                            selected === match.name
                              ? "var(--ndi-mint-40)"
                              : "var(--border-grid)",
                          background:
                            selected === match.name ? "var(--ndi-mint-08)" : "transparent",
                        }}
                      >
                        <input
                          type="radio"
                          name="match"
                          checked={selected === match.name}
                          onChange={() => setSelected(match.name)}
                          className="mt-0.5 h-4 w-4 flex-none accent-[var(--ndi-mint)]"
                        />
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="font-display text-[13.5px] font-medium text-body">
                            {match.name}
                          </span>
                          <span className="text-[12.5px] leading-[1.5] text-faint">
                            {match.registration} · {match.address} · incorporated{" "}
                            {match.incorporated}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )
              ) : null}
            </>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-subtle pt-4">
            <GradientButton
              onClick={() => router.push("/onboarding/prove")}
              disabled={!selected || unsupported || unavailable}
            >
              Continue to identity check
              <Icon name="arrowRight" size={15} strokeWidth={2} />
            </GradientButton>
            <span className="max-w-[46ch] text-[12.5px] leading-[1.5] text-faint">
              Next you will prove who you are from your own wallet, and the
              register will be asked whether you represent this organisation.
            </span>
          </div>
        </div>
      </Panel>
    </OnboardingShell>
  );
}
