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

**All six acts are built.** Nothing in the sidebar 404s. You can walk the whole
story end to end, or show any act on its own.

| Act | What the audience learns | Roughly |
|---|---|---|
| 1 · The entity becomes real | The platform never asserts the entity's identity — a register does | 4 min |
| 2 · Authority is granted, narrowly | Authority is a scoped, accepted relation, not a role dropdown | 6 min |
| 3 · The Controller works, under approval | Least disclosure, an approval gate, dual attribution | 6 min |
| 4 · Authority is delegated to a wallet | Constraints that travel with the credential | 3 min |
| 5 · Authority is checked at the point of use | PASS, then FAIL with the failing link named | 4 min |
| 6 · There is recourse | Revocation carries a reason and an appeal | 3 min |

**The full run is about 25 minutes.** If you have ten, show acts 2 and 5. If
you have five, show act 5 alone.

---

## The Act 1 walkthrough

Act button **1**, as Rinzin. Four minutes, and it is the act that establishes
the product is not self-certifying.

### 1 · Find the organisation — `/onboarding/claim`

Note the **kind of organisation** list: each type names *which register*
confirms it, and civil society organisations are marked **not yet available**.

> "Which register can vouch for you depends on what kind of thing you are.
> That is a governance input still being decided, so it is a property of the
> entity type rather than hard-coded — and where we have no register, that
> kind of organisation simply cannot register here. Better to say so than to
> run a search that fails for reasons nobody can see."

Leave Norling selected, press **Continue to identity check**.

### 2 · The register check — the honest wait

Press **Start the identity check**.

**This is the one wait in the demo that is not compressed.** Let it run.

> "Every other wait here is about two seconds. This one is not, deliberately.
> This is the moment the platform admits it cannot assert the company's
> identity by itself and has to ask the Registrar of Companies. If that
> resolved instantly, the most important architectural fact about the whole
> product would slide straight past you."

Point at the two named stages:

> "Two different things, shown as two things. Rinzin proving who she is, from
> her own wallet. Then an institution deciding whether she speaks for the
> company. Only one of those can refuse her."

Also point at the hand-off panel — **What you will share**, and the line
saying the wallet never receives the organisation's keys.

**Then show the refusal.** Reload and press **Show what happens if the
register says no**.

> "Her identity proved fine. The register just does not list her as a
> representative. That is a matter of record, not a bug here — and we cannot
> override it. An organisation whose representative we could not establish is
> exactly the organisation nobody should be able to register."

### 3 · The milestone — `/onboarding/foundational`

Run it again to success and continue. Point at **Why this one is different**:

> "Accepting a credential normally needs an authority saying you may. Nobody
> has one yet — the company came into existence thirty seconds ago. So this
> one acceptance happens under a bootstrap authority made for exactly this,
> and nothing else can be accepted under it."

Press **Accept the registration**.

> "*Norling Logistics is verified.* And this credential is the thing act five
> walks back up to. Remember it."

---

## The Act 6 walkthrough

Three minutes, and it is the act that makes everything else defensible. Best
shown **straight after act 5**, while the revocation is fresh.

Switch to **Pema** and open **Appeals**.

> "She has just lost her role. Here is the notice, with the reason Rinzin
> actually typed, and a reference. She did not have to go looking for it."

Type an answer in the box and press **Submit the appeal**.

> "Ten working days to appeal, five for a decision. Those numbers are
> provisional until the governance framework settles them, which is why they
> are text on a screen rather than a graphic anyone has to redraw."

Switch to **Rinzin** and open **Appeals** again.

> "Same object, different actions. She can uphold or reject. Pema was never
> shown an uphold button and Rinzin was never shown a submission form."

Press **Uphold and reinstate**.

> "That puts the role back exactly as it was. An appeal process that concluded
> in someone's favour and left the authority revoked would be a complaints
> box, not a remedy."

**Then go back to `/verifier/bnsw` and submit the declaration again. It
passes.** The chain is whole because the link was restored.

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

## The Act 3 walkthrough

About six minutes, as **Dorji**. The story: an ordinary working day, and the
approval gate doing its job.

### 1 · The landing screen — act button **3**

You arrive at `/dashboard` as Dorji.

> "This is what a controller sees on signing in. Not a chart — a list of what
> is waiting. And on the right, a reminder of exactly what he is allowed to
> do, every single time, so he never has to discover his own limits from a
> refusal."

Point at the ordering:

> "Approvals first, because somebody else is blocked until they are decided.
> Then relying parties who are waiting. Then offers, which nobody is waiting
> on. Sorted by expiry, a lapsing offer would sit above a colleague."

Note that **Dorji has no Approvals item in the sidebar** — his authority does
not include deciding approvals.

### 2 · Accept an offer — the holder inbox

Click the **Customs Broker Licence** offer.

> "Here is the thing the studio could never do before. Norling Logistics is
> the *holder*. Somebody has offered the company a credential."

Two things to point at:

- **Every attribute in full**, before any button.
  > "He is accepting these values. A screen that said 'Customs Broker Licence,
  > 4 attributes' would be asking him to accept something he had not seen. And
  > this is read from the offer itself, not from anything anyone typed."
- **The issuer's trust-registry status.**

Press **Accept**. Then follow **See what we hold** — note the **Root of trust**
panel, held apart from the table:

> "The Business Registration is not one credential among several. It is the
> root everything else chains back to, including everything the company has
> delegated. Burying it in a row between a tax certificate and an insurance
> policy would misstate what it is."

### 3 · The refusal — worth showing deliberately

Go to **Offers** and open **Fleet Insurance Certificate**.

> "This is a normal event, not an error. His authority covers Business
> Registration and Customs Broker Licence. Insurance was not granted."

Point at the only action available:

> "One next step, and it routes to the owner. There is deliberately no way for
> him to widen his own authority from here — this is exactly the moment
> somebody would reach for that, and it must not exist."

### 4 · Least disclosure — `Bank of Bhutan is asking for a proof`

Back to the dashboard, open the **Bank of Bhutan** request.

**This is the screen to slow down on.** The bank asked for five attributes.
Two are ticked.

> "The bank asked for five. Only two are actually needed, and those are the
> only two ticked. Least disclosure is not a warning here — it is the state
> the screen opens in. He has to consciously add anything else."

Tick **registered_address**. A note appears saying he is going beyond what is
needed.

> "Worth having a reason you could give out loud."

Untick it. Point at the counter — **Disclosing 2 of 5 requested** — then press
**Send for approval**.

> "His authority lets him present to the bank, but not without an approver.
> So nothing goes out."

### 5 · The approval — switch to Rinzin

Switch persona to **Rinzin Dema** and open **Approvals**.

> "Now the gate. Note that Dorji never saw this queue — he cannot approve his
> own work."

Open the presentation. Three things to show:

- **The attributes, struck through where withheld.**
  > "She is approving the disclosure, not the request. If she only saw 'present
  > to Bank of Bhutan' she would not know what was going out."
- **The fingerprint** — "what you would sign".
  > "That covers this exact operation. Signing it from her phone commits her to
  > this and nothing else. If any detail changed, the fingerprint changes."
- **The authority it was done under**, with the scope version.

Press **Approve and sign from wallet**. After the hand-off, the presentation
goes out.

### 6 · The record — `Controllership → Audit`

> "Norling Logistics, acted by Dorji Wangchuk, approved by Rinzin Dema. Three
> questions an investigation actually asks — on whose behalf, by whose hand, on
> whose authority — and no single-name log can answer any of them."

Point at the disclosed line:

> "A fingerprint of what went out. Not the values. An audit trail that stored
> what it was protecting would be a second copy of the company's data with a
> longer retention period than the original."

### Other things on this loop worth a look

| Where | What it shows |
|---|---|
| `/approvals/park-stale` | Approved, then invalidated before it ran |
| `/approvals` → the dual-control card | 1 of 2 signatures, needing a different person |
| `/wallet/verification-requests/vr-druk` | In scope by credential type, refused by counterparty |
| `/dashboard` → **access_suspended** state | A controller whose authority was pulled mid-session |

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
| `/dashboard` | **all_clear**, **access_suspended** | An empty queue, and a pulled authority |
| `/wallet/offers/...` | **out_of_scope**, **requires_approval** | Both refusal shapes on any offer |
| `/approvals/...` | **stale**, **expired**, **rejected** | The outcomes nobody demos |
| `/controllership/audit` | **filtered_empty** | A filter finding nothing, trail still intact |
| `/onboarding/claim` | **no_match**, **register_unavailable** | The register finding nothing, and being down |
| `/onboarding/prove` | **not_a_representative**, **expired** | The refusal, and a lapsed proof request |
| `/onboarding/foundational` | **issuance_failed** | Confirmed, but the credential did not issue |
| `/controllership/entity` | **foundational_expired** | What lapses when the root lapses |
| `/appeals` | **under_review**, **upheld**, **rejected** | Every stage of an appeal |
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
| A sidebar item 404s | Shouldn't happen now — tell me if one does |
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
