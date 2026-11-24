"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useState } from "react";
import { personalCategories, sectionLinks } from "@/app/content";

type Spot = { x: string; y: string; mx: string; my: string; r: string };

const place = ({ x, y, mx, my, r }: Spot) =>
  ({ "--x": x, "--y": y, "--mx": mx, "--my": my, "--r": r }) as CSSProperties;

const spots = {
  personal: { x: "36%", y: "30%", mx: "10%", my: "31%", r: "-4deg" },
  clients: { x: "6%", y: "67%", mx: "6%", my: "66%", r: "-3deg" },
  me: { x: "70%", y: "18%", mx: "44%", my: "15%", r: "5deg" },
  contact: { x: "66%", y: "84%", mx: "50%", my: "84%", r: "-6deg" },
} satisfies Record<string, Spot>;

const categorySpots: Spot[] = [
  { x: "22%", y: "48%", mx: "16%", my: "42%", r: "3deg" },
  { x: "38%", y: "57%", mx: "6%", my: "50%", r: "-2deg" },
  { x: "68%", y: "45%", mx: "58%", my: "41%", r: "6deg" },
];

export function HomeBoard() {
  const [personalOpen, setPersonalOpen] = useState(false);

  return (
    <main className="board">
      <img src="/images/objects/one-dollar.jpg" width={1000} height={427} alt="" className="board__bill" />
      <h1 className="board__name">Ella Marciano</h1>
      <nav aria-label="Sections">
        <ul className="board__words">
          <li className="board__spot" style={place(spots.personal)}>
            <button
              type="button"
              className="board__word"
              aria-expanded={personalOpen}
              aria-controls="board-personal"
              onClick={() => setPersonalOpen((open) => !open)}
            >
              Personal
            </button>
          </li>
          <li className="board__group">
            <ul id="board-personal" className="board__words" data-open={personalOpen} inert={!personalOpen}>
              {personalCategories.map((category, index) => (
                <li
                  key={category.href}
                  className="board__spot board__spot--category"
                  style={{ ...place(categorySpots[index]), animationDelay: `${index * 0.12}s` }}
                >
                  <Link href={category.href} className="board__word board__word--small">
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {(["clients", "me", "contact"] as const).map((key) => (
            <li key={key} className="board__spot" style={place(spots[key])}>
              <Link href={sectionLinks[key].href} className="board__word">
                {sectionLinks[key].label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
