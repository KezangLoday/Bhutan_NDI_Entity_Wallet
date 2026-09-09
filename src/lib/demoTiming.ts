/**
 * Every wait in this demo is authored, because there is no server to wait for.
 *
 * Two ways to get this wrong. Make it instant and the demo dies: the Entity
 * Wallet's entire trust argument lives in waiting, denial and failure — the
 * register check, the parked approval, the verification decision. Resolve all
 * of that in 0ms and you have demoed a CRUD app. Make it realistic and nobody
 * sits through it in a room.
 *
 * So: long enough to read as work happening, short enough to narrate over,
 * and always skippable. The numbers live here rather than at their call sites
 * so the whole demo can be retuned in one edit after the first rehearsal —
 * which is when you find out that what felt right alone feels slow out loud.
 */

/** A normal round-trip: an agent call, a policy check, a signature. */
export const ROUND_TRIP_MS = 1700;

/** Something that only touches the platform. Short, but not instant. */
export const LOCAL_MS = 650;

/**
 * The register confirmation in onboarding, given the honest treatment on
 * purpose. One screen in the demo should show what a real external
 * dependency feels like, and this is the one — it is the moment the platform
 * admits it cannot assert the entity's identity by itself. Every other wait
 * is compressed; this one earns its length.
 */
export const REGISTER_CHECK_MS = 4200;

/** How long a wallet hand-off waits before offering to start over. */
export const WALLET_HANDOFF_MS = 2600;

/**
 * A "skip" appears after this long. Early enough that an impatient presenter
 * never feels trapped, late enough that it does not undercut the wait it is
 * offering to skip.
 */
export const SKIP_AFTER_MS = 900;
