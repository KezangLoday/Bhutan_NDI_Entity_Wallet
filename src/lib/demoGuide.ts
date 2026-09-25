import type { PersonaId } from "./demoData";

/**
 * The guided demo: the whole story as a script the screen reads out to
 * whoever is driving.
 *
 * WHY THIS EXISTS
 *
 * The demo grew a story runner, flow jumps, a persona switcher, a state
 * switcher and a deployment switch, all in one panel — a toolbox for someone
 * who already knows the story, and a maze for anyone who doesn't. The written
 * guide didn't close the gap: it lives in another window, and reading it
 * while clicking is exactly what a presenter can't do. So the script moved
 * onto the screen. Each step says where you are, what is going on, what to
 * press, and — when it matters — a line worth saying out loud.
 *
 * HOW A STEP FOLLOWS YOU
 *
 * `match` is the screen a step happens on. Pressing Next takes you to the
 * next step's screen, as the right person. Doing the step yourself also
 * works: when a click in the product lands on the *next* step's screen, the
 * guide moves on by itself. Only the next step is watched, so wandering off to
 * another page never skips the guide ahead.
 *
 * Button names in `doThis` are bolded with **…** and must match the product
 * exactly — the guide is only as good as its agreement with the screen.
 */
export interface GuideChapter {
  title: string;
  /** One line: what this part of the story shows. */
  shows: string;
}

export interface GuideStep {
  chapter: number;
  title: string;
  /** What is going on, for someone seeing it for the first time. */
  happening: string;
  /** Exactly what to press. **Bold** for on-screen names. */
  doThis: string;
  /** Optional line to say to the room. */
  say?: string;
  /** The screen this step is on — Next navigates here. */
  route?: string;
  /** Pattern for recognising that screen, when `route` alone is not enough. */
  match?: string;
  /** Who to drive as when the guide brings you to this step. */
  persona?: PersonaId;
}

export const GUIDE_CHAPTERS: GuideChapter[] = [
  { title: "Before you start", shows: "What the demo is, and how to drive it" },
  { title: "Create an account", shows: "A person signs up — nothing about any company yet" },
  { title: "Register the organisation", shows: "A government register, not NDI, confirms the company" },
  { title: "Give someone authority", shows: "Authority is narrow, written down, and has to be accepted" },
  { title: "A controller's working day", shows: "Least disclosure, an approval gate, and a record of who did what" },
  { title: "Authority in a person's wallet", shows: "The company issues an authority someone carries on their phone" },
  { title: "Checked where it's used", shows: "A counterparty checks it — then it fails, and says why" },
  { title: "There is recourse", shows: "Withdrawing authority comes with a reason and an appeal" },
  { title: "Where to go next", shows: "The other routes, and what's simulated" },
];

/** Chapters from here on run on Pelden three months in, not its first day. */
export const LIVED_IN_FROM_CHAPTER = 3;

export const GUIDE_STEPS: GuideStep[] = [
  /* ---- 0 · Before you start ---- */
  {
    chapter: 0,
    title: "Pelden Trading gets an Entity Wallet",
    happening:
      "This follows one company, Pelden Trading, from its director signing up to a customs system checking an authority its agent carries. Nothing is real: the dashed \"Prototype\" panels are where the demo stands in for a phone, an inbox or a government register.",
    doThis:
      "Press **Next**. The guide takes you to each screen and tells you what to press; you do the clicking. **Minimise** tucks this card away when it's in the way.",
  },

  /* ---- 1 · Create an account ---- */
  {
    chapter: 1,
    title: "Sign up with an email",
    happening:
      "Dorji Wangchuk, a director of Pelden Trading, creates an account for himself. Just the person — the company comes later.",
    doThis: "Type an email such as **dorji.w@peldentrading.bt** and press **Continue**.",
    say: "The account has to belong to the person who'll prove who they are later. That's checked in the next chapter, not here.",
    route: "/sign-up",
    match: "^/sign-up$",
  },
  {
    chapter: 1,
    title: "Check your email",
    happening: "In the product an email arrives with a link. No email is sent in this demo.",
    doThis: "Press **Open the link from the email** in the dashed prototype panel.",
    route: "/sign-up/check-email",
  },
  {
    chapter: 1,
    title: "Email confirmed",
    happening: "The link proves Dorji controls that address.",
    doThis: "Press **Continue**.",
    route: "/sign-up/verify",
  },
  {
    chapter: 1,
    title: "Name and password",
    happening: "The password rules are shown before anyone types, not after a failure.",
    doThis:
      "Enter **Dorji Wangchuk** as the name and a password such as **Thimphu-Chorten-2026**, then press **Create account**.",
    route: "/sign-up/password",
  },
  {
    chapter: 1,
    title: "An account with no organisation",
    happening: "Dorji has an account, but it belongs to no organisation yet.",
    doThis: "Press **Add your organisation**.",
    route: "/welcome",
  },

  /* ---- 2 · Register the organisation ---- */
  {
    chapter: 2,
    title: "What kind of organisation",
    happening:
      "Each kind names the government register that will confirm it. No registration number is asked for — nobody can claim a company just by knowing its number.",
    doThis: "Leave **Private or public limited company** selected and press **Continue to prove who you are**.",
    route: "/onboarding",
    match: "^/onboarding$",
  },
  {
    chapter: 2,
    title: "Prove who you are",
    happening:
      "Dorji proves who he is with his own Bhutan NDI Wallet, on the same scan card people know from other services. Only his identity is shared — nothing about the company.",
    doThis: "Press **Simulate the scan** (the code doesn't really scan), then **Continue**.",
    route: "/onboarding/prove",
  },
  {
    chapter: 2,
    title: "The register answers",
    happening:
      "NDI can't vouch for a company by itself, so it asks the Corporate Regulatory Authority which companies list Dorji as a representative. This wait is deliberately longer than the others.",
    doThis:
      "Wait for the list. Druk Valley Hardware is greyed out — another director already added it. Press **Add Pelden Trading Pvt. Ltd.**",
    say: "This is the moment the platform admits it can't decide who a company is. A register does.",
    route: "/onboarding/choose",
  },
  {
    chapter: 2,
    title: "The company receives its registration",
    happening:
      "Pelden's registration arrives as a credential in the company's own wallet. Everything later — every authority, every check — traces back to it.",
    doThis: "Press **Accept the registration**, then **Back to your organisations**.",
    route: "/onboarding/foundational",
  },
  {
    chapter: 2,
    title: "Pelden is on the account",
    happening: "Dorji's account now lists Pelden Trading, with him as its owner.",
    doThis: "Press **Open** next to Pelden Trading.",
    route: "/welcome",
  },
  {
    chapter: 2,
    title: "Pelden's first day",
    happening:
      "A brand-new organisation: it holds its registration and Dorji's authority to act for it, and nothing else. No tasks, no history.",
    doThis: "Have a look around, then press **Next** — the story skips ahead three months.",
    say: "Nothing has happened here yet, and the console doesn't pretend otherwise.",
    route: "/dashboard",
    persona: "dorji",
  },

  /* ---- 3 · Give someone authority ---- */
  {
    chapter: 3,
    title: "Three months on: appoint Ugyen",
    happening:
      "Pelden now has staff, credentials and a history. Dorji wants Ugyen, his new warehouse manager, to accept credentials for the company — to act for it, not to be it.",
    doThis:
      "Pick **Ugyen Phuntsho**, choose **Entity consent**, attach any file, type a reference like **PT/BR/2026/014**, and press **Continue to scope**.",
    say: "Tenzin Norbu is in the list but can't be chosen: nobody has confirmed who he is yet.",
    route: "/controllership/relations/new",
    persona: "dorji",
  },
  {
    chapter: 3,
    title: "Say exactly what he may do",
    happening:
      "Nothing is granted until it's ticked. The panel on the right rewrites the grant as plain sentences as you build it — that sentence is the product.",
    doThis:
      "Tick **Accept offers**, choose **Only these** and pick **Bonded Warehouse Authorisation**. Press **Send for acceptance**, then **Open what Ugyen will see**.",
    match: "^/controllership/relations/[^/]+/scope$",
  },
  {
    chapter: 3,
    title: "Only Ugyen can accept",
    happening:
      "Dorji can't accept on Ugyen's behalf — if he could, the acceptance would mean nothing. The screen shows the authority in full, then the duties that come with it.",
    doThis: "Press **Continue as Ugyen**, read down the page, press **Accept these duties**, then **See what I may do**.",
    match: "^/controllership/relations/[^/]+/accept$",
  },
  {
    chapter: 3,
    title: "Ugyen's own view",
    happening:
      "The same sentences, from Ugyen's side. There is no edit button — he can ask for a change, never make one himself.",
    doThis: "Press **Next**.",
    route: "/wallet/authority",
  },

  /* ---- 4 · A controller's working day ---- */
  {
    chapter: 4,
    title: "Rinzin's working day",
    happening:
      "Rinzin is a controller. Her dashboard is what's waiting for her, with exactly what she's allowed to do on the right.",
    doThis: "Open the **Business Licence** offer.",
    route: "/dashboard",
    persona: "rinzin",
  },
  {
    chapter: 4,
    title: "Accept a credential for the company",
    happening:
      "Someone has offered Pelden a credential, and Rinzin accepts it on the company's behalf. Every value is shown before any button.",
    doThis: "Press **Accept**, then press **Next**.",
    match: "^/wallet/offers/[^/]+$",
  },
  {
    chapter: 4,
    title: "The bank asks for a proof",
    happening:
      "Bank of Bhutan asked for five facts about Pelden. Only the two it actually needs are ticked — least disclosure is where the screen starts.",
    doThis:
      "Press **Send for approval**. Her authority needs someone to approve, so nothing goes out yet — it lands in the approval queue, and the guide switches you to Dorji.",
    route: "/wallet/verification-requests/vr-bob",
    persona: "rinzin",
  },
  {
    chapter: 4,
    title: "Dorji approves",
    happening:
      "Rinzin can't approve her own work. Dorji sees exactly what would go out — anything withheld is struck through.",
    doThis:
      "On the **Present Business Registration to Bank of Bhutan** card press **Review and decide**, then **Approve and sign from wallet**, then **Skip the wait**.",
    route: "/approvals",
    match: "^/approvals",
    persona: "dorji",
  },
  {
    chapter: 4,
    title: "The record",
    happening:
      "Each row names the company, the person who acted and the person who approved — plus a fingerprint of what went out, never the values themselves.",
    doThis: "Press **Next**.",
    route: "/controllership/audit",
    persona: "dorji",
  },

  /* ---- 5 · Authority in a person's wallet ---- */
  {
    chapter: 5,
    title: "Issue an authority to Pema",
    happening:
      "Pema is a clearing agent outside the company. Dorji issues her an authority to file customs declarations, into her own wallet. The panel on the right is public: any counterparty can read and check it.",
    doThis: "Leave the form as it is. Press **Issue to Pema**, then **Simulate Pema accepting**, then **See it checked at a counterparty**.",
    route: "/delegated-authority/new",
    persona: "dorji",
  },

  /* ---- 6 · Checked where it's used ---- */
  {
    chapter: 6,
    title: "The Single Window checks it — pass",
    happening:
      "We've left NDI Studio. This stands in for the Bhutan National Single Window's own website (not live yet). It checks Pema's authority without asking Pelden anything.",
    doThis: "Press **Submit declaration**, then **Skip the wait**. It passes.",
    route: "/verifier/bnsw",
    persona: "pema",
  },
  {
    chapter: 6,
    title: "Dorji withdraws the role above it",
    happening:
      "Pema's authority hangs off the Customs broker role. Withdrawing the role withdraws everything beneath it — the screen shows what will stop working first.",
    doThis:
      "Press **Withdraw** on **Customs broker** (the top row), type a reason, press **Revoke — final**, then **Revoke permanently**.",
    route: "/delegated-authority",
    match: "^/delegated-authority(/[^/]+/revoke)?$",
    persona: "dorji",
  },
  {
    chapter: 6,
    title: "The same declaration — fail",
    happening:
      "Nothing about Pema's own credential changed. The Single Window walked the chain, found the role above it revoked, and refused — naming the link that broke.",
    doThis: "Press **Submit declaration** again.",
    say: "Her authority is fine. What broke is the authority above it — and a stranger found that out in under a second.",
    route: "/verifier/bnsw",
    persona: "pema",
  },

  /* ---- 7 · There is recourse ---- */
  {
    chapter: 7,
    title: "Pema can appeal",
    happening: "Pema was told why her role was withdrawn, with a reference. She can challenge it.",
    doThis: "Type a short answer and press **Submit the appeal**.",
    route: "/appeals",
    persona: "pema",
  },
  {
    chapter: 7,
    title: "Dorji decides",
    happening: "The same appeal, from Dorji's side. He can uphold it or reject it.",
    doThis:
      "Press **Uphold and reinstate**. The role is back — submit the declaration at the Single Window again and it passes.",
    route: "/appeals",
    persona: "dorji",
  },

  /* ---- 8 · Where to go next ---- */
  {
    chapter: 8,
    title: "That's the story",
    happening:
      "Pelden went from one person signing up to a company whose authority strangers can check — and whose decisions can be challenged.",
    doThis:
      "The other routes — being invited by NDI, manual review, inviting a member — are under **Demo controls → Walk a flow**. The **Prototype · data simulated** chip lists what's simulated.",
  },
];

/** Whether a step's screen is the one showing. */
export function onStepScreen(step: GuideStep, pathname: string): boolean {
  if (step.match) return new RegExp(step.match).test(pathname);
  if (step.route) return pathname === step.route;
  return true;
}
