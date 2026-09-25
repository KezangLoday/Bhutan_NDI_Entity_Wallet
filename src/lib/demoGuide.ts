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
  { title: "Set up the platform", shows: "NDI's root administrator makes the first platform admin" },
  { title: "Bank of Bhutan asks for a wallet", shows: "An organisation already on NDI is invited to an Entity Wallet" },
  { title: "A new company signs up", shows: "A person signs up — nothing about any company yet" },
  { title: "Register the organisation", shows: "A government register, not NDI, confirms the company" },
  { title: "Give someone authority", shows: "Authority is narrow, written down, and has to be accepted" },
  { title: "A controller's working day", shows: "Least disclosure, an approval gate, and a record of who did what" },
  { title: "Authority in a person's wallet", shows: "The company issues an authority someone carries on their phone" },
  { title: "Checked where it's used", shows: "A counterparty checks it — then it fails, and says why" },
  { title: "There is recourse", shows: "Withdrawing authority comes with a reason and an appeal" },
  { title: "Where to go next", shows: "The other routes, and what's simulated" },
];

/** Chapters from here on run on Pelden three months in, not its first day. */
export const LIVED_IN_FROM_CHAPTER = 5;

export const GUIDE_STEPS: GuideStep[] = [
  /* ---- 0 · Before you start ---- */
  {
    chapter: 0,
    title: "Pelden Trading gets an Entity Wallet",
    happening:
      "It starts before any business: NDI's root administrator sets up the platform. Then two ways onto the Entity Wallet — Bank of Bhutan, already on NDI, is invited to one; Pelden Trading, a new company, signs up — and Pelden's story runs to a customs system checking an authority its agent carries. Nothing is real: the dashed \"Prototype\" panels stand in for a phone, an inbox or a government register.",
    doThis:
      "Press **Next**. The guide takes you to each screen and tells you what to press; you do the clicking. **Minimise** tucks this card away when it's in the way.",
  },

  /* ---- 1 · Set up the platform ---- */
  {
    chapter: 1,
    title: "The root administrator signs up",
    happening:
      "Before any business, NDI's root administrator, Chimi Wangmo, creates an account. The deployment already knows this address as root, so there is nothing to onboard — no organisation, no register check.",
    doThis: "Type **chimi.wangmo@ndi.bt** and press **Continue**.",
    route: "/sign-up",
    match: "^/sign-up$",
  },
  {
    chapter: 1,
    title: "Check your email",
    happening: "The same account creation as anyone: an email with a link. No email is sent in this demo.",
    doThis: "Press **Open the link from the email**, then **Continue**.",
    route: "/sign-up/check-email",
    match: "^/sign-up/(check-email|verify)$",
  },
  {
    chapter: 1,
    title: "Name and password",
    happening: "The password rules are shown before anyone types.",
    doThis: "Enter **Chimi Wangmo** and a password such as **Thimphu-Chorten-2026**, then press **Create account**.",
    route: "/sign-up/password",
  },
  {
    chapter: 1,
    title: "Recognised as root",
    happening: "The platform recognises the address: this account holds every administrative permission.",
    doThis: "Press **Open NDI administration**.",
    route: "/welcome",
  },
  {
    chapter: 1,
    title: "Invite a platform admin",
    happening:
      "Root's first job is to invite the people who will run the platform day to day. Only NDI's own staff can be chosen. Until one of them accepts, no organisation can be added.",
    doThis:
      "Press **Invite as platform admin** next to **Tshering Yangzom**, then **Open as the invitee** (dashed — it stands in for her email).",
    route: "/admin/team",
    persona: "root",
  },
  {
    chapter: 1,
    title: "Tshering's invitation",
    happening:
      "It names who is granting it and says what it does not include: acting for any business. She has no account yet.",
    doThis: "Press **Create an account** — her address is filled in.",
    match: "^/invitation/[^/]+$",
  },
  {
    chapter: 1,
    title: "Tshering creates her account",
    happening: "The same sign-up as anyone, and it brings her straight back to the invitation.",
    doThis:
      "Press **Continue**, **Open the link from the email**, **Continue**, then enter **Tshering Yangzom** and a password and press **Create account**.",
    match: "^/sign-up",
  },
  {
    chapter: 1,
    title: "Tshering accepts",
    happening: "Back at the invitation, now with an account.",
    doThis: "Press **Accept**.",
    match: "^/invitation/[^/]+$",
  },
  {
    chapter: 1,
    title: "A platform admin's console",
    happening:
      "Tshering decides organisations' requests for access — issuing, verifying, an Entity Wallet — with her name on each decision. One is already waiting: Tashi InfoComm asking to verify as well as issue.",
    doThis: "Press **Next** — Bank of Bhutan is about to ask for something.",
    route: "/admin/organisations",
    persona: "tshering",
  },

  /* ---- 2 · Bank of Bhutan asks for a wallet ---- */
  {
    chapter: 2,
    title: "A bank that's already on NDI",
    happening:
      "Yeshey Choden runs Bank of Bhutan's digital banking. The bank has issued and verified on NDI for years — Issuance and Verification are in its sidebar — but it has no wallet of its own to hold credentials issued to it.",
    doThis: "Press **Get an Entity Wallet**.",
    route: "/dashboard",
    persona: "yeshey",
  },
  {
    chapter: 2,
    title: "Ask NDI for one",
    happening: "What it issues and verifies stays exactly as it is — the page says so first.",
    doThis: "Type what it's for and press **Send the request to NDI**. Then press **Next**.",
    route: "/entity-wallet",
    persona: "yeshey",
  },
  {
    chapter: 2,
    title: "Tshering reviews it",
    happening: "The request is in Tshering's queue, beside Tashi InfoComm's.",
    doThis: "On **Bank of Bhutan**'s request press **Approve and invite**, then **Send the invitation**. Then press **Next**.",
    say: "Approving doesn't create the wallet. It invites Yeshey — and the register still has to confirm she represents the bank.",
    route: "/admin/organisations",
    persona: "tshering",
  },
  {
    chapter: 2,
    title: "Yeshey is invited",
    happening: "The request now shows NDI's answer, and an invitation waiting in her inbox.",
    doThis: "Press **Open the invitation** in the dashed panel.",
    route: "/entity-wallet",
    persona: "yeshey",
  },
  {
    chapter: 2,
    title: "What the invitation gives",
    happening:
      "She already has an NDI account, so there's no sign-up. The invitation says plainly that it doesn't confirm she represents the bank — the register does that next.",
    doThis: "Press **Accept**.",
    match: "^/invitation/[^/]+$",
  },
  {
    chapter: 2,
    title: "Yeshey proves who she is",
    happening: "From her own Bhutan NDI Wallet — the same scan card as everywhere.",
    doThis: "Press **Simulate the scan**, then **Continue**.",
    route: "/onboarding/prove",
  },
  {
    chapter: 2,
    title: "The register confirms the bank",
    happening:
      "The invitation names Bank of Bhutan Ltd., so there's no list to choose from: the register is asked the one question — does it list Yeshey as representing it?",
    doThis: "Wait for the answer. It moves on by itself.",
    route: "/onboarding/choose",
  },
  {
    chapter: 2,
    title: "The bank receives its registration",
    happening: "Bank of Bhutan's registration arrives in its own new wallet, as a card with the registrar's seal.",
    doThis: "Press **Accept the registration**, then **Go to the console**.",
    route: "/onboarding/foundational",
  },
  {
    chapter: 2,
    title: "A bank that issues, verifies and holds",
    happening:
      "Bank of Bhutan now has all three. The Wallet group is new in its sidebar; Issuance and Verification are unchanged.",
    doThis: "Open **Wallet → Held credentials** to see its registration card, then press **Next**.",
    route: "/dashboard",
    match: "^/(dashboard|wallet/credentials)$",
    persona: "yeshey",
  },

  /* ---- 3 · A new company signs up ---- */
  {
    chapter: 3,
    title: "A new company: Dorji signs up",
    happening:
      "The other way onto the Entity Wallet. Pelden Trading has never been on NDI; its director, Dorji Wangchuk, creates an account for himself. Just the person — the company comes later.",
    doThis: "Type an email such as **dorji.w@peldentrading.bt** — replacing anything already there — and press **Continue**.",
    say: "The account has to belong to the person who'll prove who they are later. That's checked in the next chapter, not here.",
    route: "/sign-up",
    match: "^/sign-up$",
  },
  {
    chapter: 3,
    title: "Check your email",
    happening: "In the product an email arrives with a link. No email is sent in this demo.",
    doThis: "Press **Open the link from the email** in the dashed prototype panel.",
    route: "/sign-up/check-email",
  },
  {
    chapter: 3,
    title: "Email confirmed",
    happening: "The link proves Dorji controls that address.",
    doThis: "Press **Continue**.",
    route: "/sign-up/verify",
  },
  {
    chapter: 3,
    title: "Name and password",
    happening: "The password rules are shown before anyone types, not after a failure.",
    doThis:
      "Enter **Dorji Wangchuk** as the name and a password such as **Thimphu-Chorten-2026**, then press **Create account**.",
    route: "/sign-up/password",
  },
  {
    chapter: 3,
    title: "An account with no organisation",
    happening: "Dorji has an account, but it belongs to no organisation yet.",
    doThis: "Press **Add your organisation**.",
    route: "/welcome",
  },

  /* ---- 4 · Register the organisation ---- */
  {
    chapter: 4,
    title: "What kind of organisation",
    happening:
      "Each kind names the government register that will confirm it. No registration number is asked for — nobody can claim a company just by knowing its number.",
    doThis: "Leave **Private or public limited company** selected and press **Continue to prove who you are**.",
    route: "/onboarding",
    match: "^/onboarding$",
  },
  {
    chapter: 4,
    title: "Prove who you are",
    happening:
      "Dorji proves who he is with his own Bhutan NDI Wallet, on the same scan card people know from other services. Only his identity is shared — nothing about the company.",
    doThis: "Press **Simulate the scan** (the code doesn't really scan), then **Continue**.",
    route: "/onboarding/prove",
  },
  {
    chapter: 4,
    title: "The register answers",
    happening:
      "NDI can't vouch for a company by itself, so it asks the Corporate Regulatory Authority which companies list Dorji as a representative. This wait is deliberately longer than the others.",
    doThis:
      "Wait for the list. Druk Valley Hardware is greyed out — another director already added it. Press **Add Pelden Trading Pvt. Ltd.**",
    say: "This is the moment the platform admits it can't decide who a company is. A register does.",
    route: "/onboarding/choose",
  },
  {
    chapter: 4,
    title: "The company receives its registration",
    happening:
      "Pelden's registration arrives as a credential in the company's own wallet. Everything later — every authority, every check — traces back to it.",
    doThis: "Press **Accept the registration**, then **Back to your organisations**.",
    route: "/onboarding/foundational",
  },
  {
    chapter: 4,
    title: "Pelden is on the account",
    happening: "Dorji's account now lists Pelden Trading, with him as its owner.",
    doThis: "Press **Open** next to Pelden Trading.",
    route: "/welcome",
  },
  {
    chapter: 4,
    title: "Pelden's first day",
    happening:
      "A brand-new organisation: it holds its registration and Dorji's authority to act for it, and nothing else. No tasks, no history.",
    doThis: "Have a look around, then press **Next** — the story skips ahead three months.",
    say: "Nothing has happened here yet, and the console doesn't pretend otherwise.",
    route: "/dashboard",
    persona: "dorji",
  },

  /* ---- 5 · Give someone authority ---- */
  {
    chapter: 5,
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
    chapter: 5,
    title: "Say exactly what he may do",
    happening:
      "Nothing is granted until it's ticked. The panel on the right rewrites the grant as plain sentences as you build it — that sentence is the product.",
    doThis:
      "Tick **Accept offers**, choose **Only these** and pick **Bonded Warehouse Authorisation**. Press **Send for acceptance**, then **Open what Ugyen will see**.",
    match: "^/controllership/relations/[^/]+/scope$",
  },
  {
    chapter: 5,
    title: "Only Ugyen can accept",
    happening:
      "Dorji can't accept on Ugyen's behalf — if he could, the acceptance would mean nothing. The screen shows the authority in full, then the duties that come with it.",
    doThis: "Press **Continue as Ugyen**, read down the page, press **Accept these duties**, then **See what I may do**.",
    match: "^/controllership/relations/[^/]+/accept$",
  },
  {
    chapter: 5,
    title: "Ugyen's own view",
    happening:
      "The same sentences, from Ugyen's side. There is no edit button — he can ask for a change, never make one himself.",
    doThis: "Press **Next**.",
    route: "/wallet/authority",
  },

  /* ---- 6 · A controller's working day ---- */
  {
    chapter: 6,
    title: "Rinzin's working day",
    happening:
      "Rinzin is a controller. Her dashboard is what's waiting for her, with exactly what she's allowed to do on the right.",
    doThis: "Open the **Business Licence** offer.",
    route: "/dashboard",
    persona: "rinzin",
  },
  {
    chapter: 6,
    title: "Accept a credential for the company",
    happening:
      "Someone has offered Pelden a credential, and Rinzin accepts it on the company's behalf. Every value is shown before any button.",
    doThis: "Press **Accept**, then press **Next**.",
    match: "^/wallet/offers/[^/]+$",
  },
  {
    chapter: 6,
    title: "The bank asks for a proof",
    happening:
      "Bank of Bhutan asked for five facts about Pelden. Only the two it actually needs are ticked — least disclosure is where the screen starts.",
    doThis:
      "Press **Send for approval**. Her authority needs someone to approve, so nothing goes out yet — it lands in the approval queue, and the guide switches you to Dorji.",
    route: "/wallet/verification-requests/vr-bob",
    persona: "rinzin",
  },
  {
    chapter: 6,
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
    chapter: 6,
    title: "The record",
    happening:
      "Each row names the company, the person who acted and the person who approved — plus a fingerprint of what went out, never the values themselves.",
    doThis: "Press **Next**.",
    route: "/controllership/audit",
    persona: "dorji",
  },

  /* ---- 7 · Authority in a person's wallet ---- */
  {
    chapter: 7,
    title: "Issue an authority to Pema",
    happening:
      "Pema is a clearing agent outside the company. Dorji issues her an authority to file customs declarations, into her own wallet. The panel on the right is public: any counterparty can read and check it.",
    doThis: "Leave the form as it is. Press **Issue to Pema**, then **Simulate Pema accepting**, then **See it checked at a counterparty**.",
    route: "/delegated-authority/new",
    persona: "dorji",
  },

  /* ---- 8 · Checked where it's used ---- */
  {
    chapter: 8,
    title: "The Single Window checks it — pass",
    happening:
      "We've left NDI Studio. This stands in for the Bhutan National Single Window's own website (not live yet). It checks Pema's authority without asking Pelden anything.",
    doThis: "Press **Submit declaration**, then **Skip the wait**. It passes.",
    route: "/verifier/bnsw",
    persona: "pema",
  },
  {
    chapter: 8,
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
    chapter: 8,
    title: "The same declaration — fail",
    happening:
      "Nothing about Pema's own credential changed. The Single Window walked the chain, found the role above it revoked, and refused — naming the link that broke.",
    doThis: "Press **Submit declaration** again.",
    say: "Her authority is fine. What broke is the authority above it — and a stranger found that out in under a second.",
    route: "/verifier/bnsw",
    persona: "pema",
  },

  /* ---- 9 · There is recourse ---- */
  {
    chapter: 9,
    title: "Pema can appeal",
    happening: "Pema was told why her role was withdrawn, with a reference. She can challenge it.",
    doThis: "Type a short answer and press **Submit the appeal**.",
    route: "/appeals",
    persona: "pema",
  },
  {
    chapter: 9,
    title: "Dorji decides",
    happening: "The same appeal, from Dorji's side. He can uphold it or reject it.",
    doThis:
      "Press **Uphold and reinstate**. The role is back — submit the declaration at the Single Window again and it passes.",
    route: "/appeals",
    persona: "dorji",
  },

  /* ---- 10 · Where to go next ---- */
  {
    chapter: 10,
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
