import type { PersonaId } from "./demoData";

/**
 * The six acts, as the story runner drives them.
 *
 * One entity, one grant, one delegation, one failure. This is the only place
 * the running order lives: the runner reads it, and so does anything that
 * wants to say "you are in act 3 of 6". Adding a screen to the demo does not
 * mean adding an act — an act is a thing the audience learns, and there are
 * six of those.
 *
 * `route` is the act's entry point, not its whole path. Act 2 walks four
 * screens; the runner only has to put you at the first one, because from
 * there the screens lead into each other the way they will in the real
 * product. A runner that clicked through every screen for you would be a
 * video, and a demo whose screens do not lead anywhere is worth finding out
 * about before the room does.
 */
export interface Act {
  number: number;
  /** What happens. Shown in the runner. */
  title: string;
  /** What the audience is meant to take away. The reason the act exists. */
  learns: string;
  /** Who the console is driven as. Switching mid-story is the point. */
  persona: PersonaId;
  route: string;
}

export const ACTS: Act[] = [
  {
    number: 1,
    title: "The entity becomes real",
    learns:
      "An organisation can hold credentials — and the platform never asserts its identity by itself. A government register confirms it.",
    persona: "rinzin",
    route: "/onboarding/claim",
  },
  {
    number: 2,
    title: "Authority is granted, narrowly",
    learns:
      "Authority is a scoped, legally-grounded relation that the controller has to accept. Not a role dropdown.",
    persona: "rinzin",
    route: "/controllership/relations/new",
  },
  {
    number: 3,
    title: "The Controller works, under approval",
    learns:
      "Least disclosure by default, an approval gate that actually holds, and an audit trail that records both the entity and the person.",
    persona: "dorji",
    route: "/dashboard",
  },
  {
    number: 4,
    title: "Authority is delegated to a person's wallet",
    learns:
      "The entity issues authority into someone's own wallet, carrying constraints any verifier can read.",
    persona: "rinzin",
    route: "/delegated-authority/new",
  },
  {
    number: 5,
    title: "Authority is checked at the point of use",
    learns:
      "The same authority passes, then fails once a role above it is withdrawn — with the failing link named. This is why the system exists.",
    persona: "pema",
    route: "/verifier/bnsw",
  },
  {
    number: 6,
    title: "There is recourse",
    learns:
      "Revocation is not arbitrary power. It carries a reason, a reference and a way to appeal.",
    persona: "pema",
    route: "/appeals",
  },
];

export const actByNumber = (n: number): Act | undefined => ACTS.find((a) => a.number === n);
