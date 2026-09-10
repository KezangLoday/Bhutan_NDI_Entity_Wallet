"use client";

import { QrPlaceholder } from "./QrPlaceholder";
import { Icon } from "./icons";

/**
 * Pattern 8.1 — the bridge to somebody's personal wallet. One component, used
 * at every web-to-wallet moment, so a person learns it once.
 *
 * There are four of these moments and they look alike on purpose: stepping up
 * to prove who you are at onboarding, signing an approval, receiving an
 * issued credential, and authorising one specific transaction at a
 * counterparty. Building each separately is how you end up with four
 * different QR treatments and a user who has to work out, every time, what is
 * being asked of them.
 *
 * WHAT IT ALWAYS SAYS
 *
 * `sharing` is not optional and there is no default. Every hand-off states
 * what will leave the wallet and why, in the same place, before the QR. A
 * wallet prompt that arrives without the web page having said what it is for
 * trains people to approve whatever their phone shows them — which is the
 * exact habit this whole product depends on them not having.
 *
 * THE BOUNDARY THIS COMPONENT MUST NEVER BLUR
 *
 * The personal wallet only ever authenticates and evidences the *person*. It
 * never receives the entity's keys or the entity's credentials. So the copy
 * here is always about proving who someone is or committing to something they
 * have read — never about the organisation's credentials moving onto a phone,
 * because they do not.
 *
 * Both a mobile and a cloud wallet link, because people hold their credential
 * in either and the brief flags picking one as an open question.
 */
export type HandoffStatus =
  | "awaiting_scan"
  | "waiting"
  | "verifying"
  | "confirmed"
  | "expired"
  | "failed";

const STATUS_COPY: Record<HandoffStatus, { label: string; detail: string }> = {
  awaiting_scan: {
    label: "Waiting to be scanned",
    detail: "Scan the code, or open your wallet on this device.",
  },
  waiting: {
    label: "Waiting for your wallet",
    detail: "The request has reached your wallet. Answer it there.",
  },
  verifying: {
    label: "Checking what came back",
    detail: "This can take a moment — it is a real check, not a formality.",
  },
  confirmed: { label: "Confirmed", detail: "Nothing more to do here." },
  expired: {
    label: "The request expired",
    detail: "Nothing was shared. Start again when you are ready.",
  },
  failed: { label: "That did not work", detail: "Nothing was shared." },
};

export function WalletHandoff({
  value,
  title,
  purpose,
  sharing,
  status,
  /** Overrides the stock line for this status, when a screen knows better. */
  statusDetail,
  onRetry,
  onCancel,
  onSkip,
}: {
  /** What the code encodes. Only has to be distinctive, not resolvable. */
  value: string;
  title: string;
  /** Why this is being asked, in one sentence. */
  purpose: string;
  /** Exactly what leaves the wallet. Required — see the note above. */
  sharing: string[];
  status: HandoffStatus;
  statusDetail?: string;
  onRetry?: () => void;
  onCancel?: () => void;
  /** Present in the demo so a presenter is never stuck behind a wait. */
  onSkip?: () => void;
}) {
  const copy = STATUS_COPY[status];
  const settled = status === "confirmed" || status === "expired" || status === "failed";
  const bad = status === "expired" || status === "failed";

  return (
    <div className="relative z-[4] flex flex-col gap-5 min-[641px]:flex-row min-[641px]:items-start">
      {/* ---- The code ---- */}
      <div className="flex flex-col items-center gap-2.5 min-[641px]:w-[200px] min-[641px]:flex-none">
        <div style={{ opacity: settled ? 0.4 : 1 }}>
          <QrPlaceholder value={settled ? null : value} />
        </div>
        {/* Said plainly rather than hidden in a caption. A code that looks
            scannable and is not wastes somebody's time in a meeting. */}
        <p className="text-center text-[11.5px] leading-[1.4] text-faint">
          Not a working code — this is a prototype
        </p>
      </div>

      {/* ---- What is happening, and what it costs you ---- */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-[15px] font-semibold leading-[1.3] text-strong">
            {title}
          </h3>
          <p className="max-w-[52ch] text-[13px] leading-[1.6] text-muted">{purpose}</p>
        </div>

        <div className="rounded-[12px] border border-grid px-3.5 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            What you will share
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {sharing.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] leading-[1.5] text-body">
                <Icon
                  name="arrowRight"
                  size={13}
                  strokeWidth={2}
                  className="mt-[4px] flex-none text-faint"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-[12px] leading-[1.5] text-faint">
            Your wallet proves who you are. It never receives the
            organisation&rsquo;s keys or credentials.
          </p>
        </div>

        {/* ---- Live status ---- */}
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-2.5 rounded-[12px] border px-3.5 py-3"
          style={{
            borderColor: bad ? "rgb(225 73 62 / 0.35)" : "var(--border-grid)",
            background: bad
              ? "rgb(225 73 62 / 0.07)"
              : status === "confirmed"
                ? "var(--ndi-mint-08)"
                : "rgb(var(--tint) / 0.04)",
          }}
        >
          {status === "verifying" || status === "waiting" ? (
            <Icon
              name="refresh"
              size={15}
              strokeWidth={2}
              className="mt-px flex-none animate-spin text-accent"
            />
          ) : (
            <Icon
              name={status === "confirmed" ? "check" : bad ? "close" : "info"}
              size={15}
              strokeWidth={2.2}
              className="mt-px flex-none"
              style={{
                color: bad
                  ? "var(--ndi-danger)"
                  : status === "confirmed"
                    ? "var(--accent)"
                    : "var(--text-faint)",
              }}
            />
          )}
          <div className="flex min-w-0 flex-col gap-0.5">
            <p
              className="font-display text-[13px] font-medium leading-[1.4]"
              style={{
                color: bad
                  ? "var(--ndi-danger)"
                  : status === "confirmed"
                    ? "var(--accent)"
                    : "var(--text-body)",
              }}
            >
              {copy.label}
            </p>
            <p className="text-[12.5px] leading-[1.5] text-muted">
              {statusDetail ?? copy.detail}
            </p>
          </div>
        </div>

        {/* ---- Ways out ---- */}
        <div className="flex flex-wrap items-center gap-2.5">
          {!settled ? (
            <>
              {/* Both, always. Somebody holding their credential in a cloud
                  wallet has no phone to point at a screen. */}
              <button
                type="button"
                className="ndi-hairline-btn inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-grid px-3.5 font-display text-[12.5px] font-medium"
              >
                <Icon name="link" size={13} strokeWidth={2} />
                Open mobile wallet
              </button>
              <button
                type="button"
                className="ndi-hairline-btn inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-grid px-3.5 font-display text-[12.5px] font-medium"
              >
                <Icon name="link" size={13} strokeWidth={2} />
                Open cloud wallet
              </button>
            </>
          ) : null}

          {onRetry && bad ? (
            <button
              type="button"
              onClick={onRetry}
              className="ndi-hairline-btn inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-grid px-3.5 font-display text-[12.5px] font-medium"
            >
              <Icon name="refresh" size={13} strokeWidth={2} />
              Try again
            </button>
          ) : null}

          {onCancel && !settled ? (
            <button
              type="button"
              onClick={onCancel}
              className="ndi-plainlink text-[12.5px] font-medium text-muted"
            >
              Cancel
            </button>
          ) : null}

          {onSkip && !settled ? (
            <button
              type="button"
              onClick={onSkip}
              className="ndi-plainlink ml-auto text-[12.5px] font-medium text-faint"
            >
              Skip the wait
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
