# Running the demo

How to drive the Entity Wallet demo in front of people. Written for whoever is
presenting, not for whoever is building.

---

## Before you start

```bash
npm install      # first time only
npm run dev      # http://localhost:3000
```

Two things to do in the room before you say anything:

1. **Open the demo controls** — bottom-left of the window, the small
   `Prototype · data simulated` chip with a **Demo controls** button beside it.
   That panel is your remote: story acts, who you are signed in as, and reset.
2. **Press Reset demo** if anyone has touched it before you. The demo persists
   to browser storage, so it remembers whatever the last person did.

**Leave the prototype chip visible.** It is the one thing standing between this
demo and somebody believing the government register integration is built. If
anyone asks what is real, the answer is in `README.md` under *What's real vs
simulated* — worth reading once before you present.

---

## The one-sentence framing

Open with this, before any screen:

> Bhutan NDI already lets an organisation **issue** and **verify** credentials.
> This adds the third thing: an organisation can **hold** them — and can let
> named people act for it, within limits it sets and can withdraw.

If you only get one idea across, that is the one.

---

## What is built right now

The story is six acts. **Acts 2, 4 and 5 are built** — the conceptual core and
the pay-off. Acts 1, 3 and 6 arrive in later slices, so you are showing the
argument rather than the full arc.

| Act | State | Where |
|---|---|---|
| 1 · The entity becomes real | not built | — |
| **2 · Authority is granted, narrowly** | **built** | walkthrough below |
| 3 · The Controller works, under approval | not built | — |
| **4 · Authority is delegated to a wallet** | **built** | walkthrough below |
| **5 · Authority is checked at the point of use** | **built** | walkthrough below |
| 6 · There is recourse | not built | — |

Still **404**: Held credentials, Offers, Verification requests, Approvals,
Audit, Appeals, and the Controllership → Relations register. Those rows are in
the nav deliberately, so the shape of the product is legible, but do not click
them in front of an audience.

**Act buttons 1, 3 and 6 land on 404s. Use 2, 4 and 5.**

---

## The Act 2 walkthrough

Roughly six minutes. The story: Norling Logistics gives its operations
manager a narrow, specific authority, and he has to accept it before it means
anything.

### 1 · Set up

Demo controls → act button **2**. That puts you on
`/controllership/relations/new` as **Rinzin Dema**, the managing director.

> "Rinzin runs Norling Logistics, a freight and customs clearance company.
> She needs her operations manager to be able to deal with the bank and
> customs on the company's behalf. Not to *be* the company — to act for it."

### 2 · Establish the controllership — `/controllership/relations/new`

Pick **Dorji Wangchuk**. Choose **Entity consent**. Attach any file (the
filename is all that is kept) and type a reference like `NL/BR/2026/014`.

Two things worth pointing at here:

- **Tenzin Norbu is in the list but cannot be chosen.** His identity has not
  been confirmed against the register.
  > "You cannot grant authority to someone whose identity nobody has
  > established. That is not a form validation — it is the foundation the
  > whole model sits on."
- **The instrument.** Only a fingerprint and a reference are stored.
  > "The signed board resolution stays in the company's own records. The
  > platform keeps proof it existed, not the document."

Press **Continue to scope**.

### 3 · The scope builder — the screen that matters most

This is the one to slow down on. Everything is off. Say so:

> "Nothing is granted until it is checked. He starts with no authority at all."

Now build the grant, narrating as the right-hand panel rewrites itself:

1. Check **Accept offers** → choose **Only these** → pick **Business
   Registration** and **Customs Broker Licence**. Leave approval on
   **Automatic**.
2. Check **Present proofs** → **Only these** credential types → **Business
   Registration**. Then relying parties → **Only these** → **Bank of Bhutan**
   and **Bhutan National Single Window**. Leave approval on **One approver**.
3. Set an end date — **31 December 2026**.

**The point of the screen is the right-hand panel.** Read one of its sentences
out loud:

> "Dorji Wangchuk may present proofs using Business Registration credentials to
> Bank of Bhutan and Bhutan National Single Window only, until 31 Dec 2026.
> Every presentation needs one approver."

> "That sentence is the product. Everything else here is a way of writing it.
> If a director cannot check that sentence in five seconds, we have failed —
> and no amount of good table design fixes it."

**If you want the "worth a second look" warnings to appear**, widen something:
set Present proofs to **Any relying party**, or tick **No end date**. The panel
starts advising against it. Then undo it.

> "It advises. It does not block. Deciding what is permissible is the server's
> job, and a UI that pretended otherwise would be teaching the wrong thing
> about where authority actually lives."

Press **Send for acceptance**.

### 4 · The hand-off — acceptance

You will land on a panel saying it has gone to Dorji. Click **Open what Dorji
will see**.

**You will see a notice saying you are still signed in as Rinzin, and that only
Dorji can accept.** Do not skip past this — it is the moment the story turns:

> "Rinzin cannot accept on his behalf. If she could, the acceptance record
> would be worth nothing, and that record is the whole point."

Click **Continue as Dorji**. Everything on the page switches to the second
person.

Now walk the acceptance screen top to bottom:

- **The authority is first, and in full.** Before any duty, before any button.
  > "He is not agreeing to terms. He is reading exactly what he is being given,
  > in the same sentences Rinzin just wrote."
- **Where it comes from** — the legal basis and the instrument.
- **What he takes on** — five duties, in plain words. No statute numbers
  anywhere.
  > "These are duties in law. The Act is why they are there, but a person
  > deciding whether to take on a responsibility needs to know what it is, not
  > which section it came from."
- **Decline is the same size as accept.**
  > "If declining were a grey link, the acceptance would not mean anything."

Press **Accept these duties**.

### 5 · Close the loop — `/wallet/authority`

Click **See what I may do**.

> "This is Dorji's own view. Same sentences. And notice what is not here —
> there is no edit button, not even a disabled one. He can see his authority
> and he can ask for it to be changed. He can never change it himself."

Scroll to **What I have done**.

> "Every action recorded against him is recorded against the company too.
> Never one without the other."

That is Act 2. Stop there.

---

## The Acts 4 and 5 walkthrough

About seven minutes, and the part worth rehearsing. **This is the strongest
thing in the demo** — if you are short on time, cut Act 2 and show this.

### 1 · Issue the authority — act button **4**

You land on `/delegated-authority/new` as Rinzin. The form is prefilled with a
sensible capability, so you can talk rather than type.

Point at the right-hand panel — **What a counterparty reads**:

> "Everything on the left ends up in that panel, and that panel is public.
> Whoever Pema shows this credential to can read all of it and check it
> themselves. They do not call us to ask."

Two things to say while you are here:

- **Change the cap** to something like `250000` and watch the panel update.
  > "This is not a setting. It is a term written into a credential that
  > strangers will enforce."
- **Point at the expiry** — 90 days by default, and there is no
  "never expires" option at all.
  > "Expiry is what limits the damage when a withdrawal comes late or never
  > happens. So it is short unless someone deliberately lengthens it."

Press **Issue to Pema**. You get *awaiting acceptance*:

> "Nothing has been granted yet. It is an offer sitting in her wallet.
> Accepting it is her consent — until she does, she holds no authority and
> nothing can be done in her name."

Press **Simulate Pema accepting**, then **See it checked at a counterparty**.

### 2 · The PASS — `/verifier/bnsw`

**Stop and point out the chrome.** No sidebar, no NDI logo, different colours,
and a line reading *Not part of NDI Studio*.

> "We have left the product. This is the Single Window's own website. It is a
> different organisation's system, and it is about to check Pema's authority
> without asking Norling Logistics anything."

Leave the value at `420000`. Press **Submit declaration**.

You get a wallet hand-off — a QR and *waiting for Pema to authorise*. Say:

> "She is authorising **this declaration**, on her own phone. Not signing in.
> Not authorising everything. That specific transaction."

(There is a **Skip the wait** link if you are pressed for time.)

Then the decision: a green **PASS**, five checks each naming what it looked
at, the four-link authority chain, and a signature.

> "Five constraints, all checked by them, not us. And notice what the bank
> learned about Pema: her name. Not her citizenship number, not her address,
> not what else she is allowed to do."

### 3 · The FAIL — the moment the demo exists for

Switch to **Rinzin** in the demo controls, then go to **Delegated authority**
and press **Withdraw** on **Customs broker** — the *role*, not the capability.

**Do not rush the blast-radius panel.** It is computed from what actually
depends on that role:

> "It is telling her that Declaration authority — the thing she issued five
> minutes ago — stops working too. Because it hangs off this. She is not
> withdrawing one credential, she is withdrawing a branch."

Type a reason. Point out that it is required:

> "Pema gets told this, with a reference she can appeal against. Withdrawing
> someone's authority without telling them why leaves them nothing to
> challenge."

Press **Revoke — final**, confirm, and you land back at the Single Window.

**Submit the same declaration again.** Same value, same person, same
counterparty.

> "Nothing about Pema's credential changed. It is still in her wallet, still
> valid, still unexpired."

**FAIL.** The chain now shows *Customs broker* struck through as revoked — and
the capability below it marked *valid in itself, but unreachable*.

> "That is the whole system in one screen. Her capability is fine. What broke
> is the authority above it. And this counterparty found that out by walking
> the chain, in under a second, without anyone telling them to."

### 4 · If someone asks about the service going down

Press **Submit with the service unreachable**.

> "Not verified — and treated as a failure. There is no spinner that eventually
> shrugs and lets it through. If we cannot establish the authority, there is no
> authority."

### Other things you can show on the verifier

| Try | What it demonstrates |
|---|---|
| Value `900000` | The cap refusing it, naming the cap |
| The **fail** state in the switcher | The FAIL without having to revoke anything |
| `/delegated-authority/da-cap-lapsed/revoke` | An authority that expired on its own |

---

## Showing the states nobody can click to

For a design or engineering audience, the state switcher is the interesting
part. Open **Demo controls** and look at **This screen's states** — it lists
whatever the screen you are on has declared, and switching is instant.

Worth showing:

| Screen | Try | Why it matters |
|---|---|---|
| `/wallet/authority` | **suspended**, **expired** | A dead end with a reason, not a broken screen |
| `/wallet/authority` | **no_authority** | What Pema, who holds no controllership, sees |
| `/controllership/relations/.../scope` | **over_broad** | The advisory warnings, without having to build a bad scope |
| `/controllership/relations/.../accept` | **declined** | The outcome nobody demos |
| `/controllership/relations/new` | **person_not_verified** | Why an unconfirmed person is blocked |
| `/verifier/bnsw` | **pass**, **fail**, **service_unreachable** | All three outcomes, no setup needed |
| `/delegated-authority/.../revoke` | **suspended**, **revoked** | Reversible vs final |
| `/delegated-authority` | **empty** | First-run, before anything is delegated |
| `/kitchen-sink` | — | Every component, both themes. Not part of the story |

> "Denied, expired and suspended states get the same care as the happy path.
> They are more frequent in a system that fails closed, and they are where
> trust is won or lost."

---

## Switching who you are

Demo controls → **Driving as**. Three people:

- **Rinzin Dema** — owner. Sees everything, including Controllership and
  Delegated authority.
- **Dorji Wangchuk** — controller. Sees Wallet. **No Controllership group at
  all.**
- **Pema Choden** — clearing agent. Sees almost nothing; she works through her
  own phone wallet and a counterparty's website.

Switch from Rinzin to Dorji with the sidebar visible and point at it:

> "The Controllership section is not greyed out for him. It is not there.
> A disabled menu item would tell him that administering his own authority is
> something he might do — which is exactly the idea this product cannot
> afford him to have."

Dorji also has no **Approvals** item, because his authority does not include
deciding approvals. That is read from his actual grant, not from a role list.

---

## If something goes wrong

| Problem | Fix |
|---|---|
| Screen looks stale or half-built | **Reset demo** in the demo controls |
| A sidebar item 404s | Expected — not built yet. Navigate back |
| A countdown says "Expired" | The fixtures are dated September 2026; see the note below |
| Acceptance button is disabled | You are the wrong persona. Use **Continue as …** |
| The verifier says no authority exists | Reset the demo, or issue one via act 4 |
| A second FAIL when you wanted a PASS | The role is still revoked. **Reset demo** |
| Everything is dark and you wanted light | Theme toggle, top right |

**The fixture dates will rot.** Everything is dated around September 2026, so
countdowns and validity windows read correctly now and will read as expired if
this is demoed much later. If dates look wrong, that is why — it is on the list
to fix by anchoring the fixtures to a relative "today".

---

## What to say when asked "is this real?"

Be straightforward. The honest version lands better than a hedge:

> "The screens are real and the model behind them is real. Nothing underneath
> is — no register integration, no verification service, no server enforcing
> any of this. It is a frontend prototype whose job is to make us agree on what
> the product should be before anyone builds it."

Then, if they push: the `README.md` table lists exactly what is simulated. It is
worth handing over rather than paraphrasing.
