import { Attack, Fighter } from '@/app/types/battle';

export const TRUMP_ATTACKS: Attack[] = [
  {
    id: 'trump_fire_1',
    name: 'Rage Tweet',
    roastText: "Elon was wearing thin. I asked him to leave. I took away his EV Mandate that forced everyone to buy electric cars — and he just went CRAZY!",
    type: 'fire',
    baseDamage: 35,
  },
  {
    id: 'trump_dark_1',
    name: 'Contract Killer',
    roastText: "The easiest way to save money? Terminate Elon's subsidies and government contracts. Simple.",
    type: 'dark',
    baseDamage: 40,
  },
  {
    id: 'trump_normal_1',
    name: 'Relationship Status',
    roastText: "Elon and I had a great relationship. I don't know if we will anymore.",
    type: 'normal',
    baseDamage: 30,
  },
  {
    id: 'trump_flying_1',
    name: 'Space Cadet',
    roastText: "This guy thinks he's going to Mars, but he can't even manage Twitter without it turning into a dumpster fire!",
    type: 'flying',
    baseDamage: 32,
  },
  {
    id: 'trump_psychic_1',
    name: 'Business Genius',
    roastText: "I taught him everything about making deals. Now look at him - buying companies just to destroy them!",
    type: 'psychic',
    baseDamage: 38,
  },
];

export const ELON_ATTACKS: Attack[] = [
  {
    id: 'elon_psychic_1',
    name: 'Logic Bomb',
    roastText: "Such an obvious lie. So sad.",
    type: 'psychic',
    baseDamage: 33,
  },
  {
    id: 'elon_dark_1',
    name: 'Epstein Files',
    roastText: "Time to drop the big one: Donald Trump is in the Epstein files. That's why they've never been made public. Have a nice day, DJT.",
    type: 'dark',
    baseDamage: 45,
  },
  {
    id: 'elon_water_1',
    name: 'Smooth Dismissal',
    roastText: "Whatever.",
    type: 'water',
    baseDamage: 25,
  },
  {
    id: 'elon_electric_1',
    name: 'Election Zinger',
    roastText: "Without me, Trump would have lost the election. Dems would control the House. The Senate would be 51–49 the other way. Such ingratitude.",
    type: 'electric',
    baseDamage: 42,
  },
  {
    id: 'elon_ground_1',
    name: 'Economic Reality Check',
    roastText: "The Trump tariffs will cause a recession in the second half of this year.",
    type: 'ground',
    baseDamage: 37,
  },
  {
    id: 'elon_normal_1',
    name: 'Common Sense',
    roastText: "This is exactly the kind of unhinged behavior that got you impeached. Twice.",
    type: 'normal',
    baseDamage: 34,
  },
];

export const ATTACKS_BY_FIGHTER: Record<Fighter, Attack[]> = {
  trump: TRUMP_ATTACKS,
  elon: ELON_ATTACKS,
};
