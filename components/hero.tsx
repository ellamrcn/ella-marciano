"use client";

import Link from "next/link";
import { useState } from "react";
import { personalCategories, photos, sectionLinks, type Photo } from "@/app/content";
import { Logo } from "@/components/logo";
import { Cutout, Sparkle } from "@/components/ornaments";
import { Picture } from "@/components/picture";

const reel = {
  rest: photos.featherShowgirl,
  personal: photos.elvisBack,
  clients: photos.officeCover,
  me: photos.pinkShowgirl,
  contact: photos.saluteShowgirl,
} satisfies Record<string, Photo>;

type ReelKey = keyof typeof reel;

const reelKeys = Object.keys(reel) as ReelKey[];

export function Hero() {
  const [stack, setStack] = useState<ReelKey[]>(["rest"]);
  const [personalOpen, setPersonalOpen] = useState(false);
  const showing = stack[stack.length - 1];

  const show = (key: ReelKey) =>
    setStack((current) => (current[current.length - 1] === key ? current : [...current.filter((k) => k !== key), key]));

  const reelHandlers = (key: ReelKey) => ({
    onPointerEnter: () => show(key),
    onFocus: () => show(key),
  });

  return (
    <main className="hero">
      <h1 className="hero__title">
        <Logo />
        <span className="hero__descriptor">Photography, art direction and words</span>
      </h1>
      <Sparkle className="hero__sparkle hero__sparkle--a" />
      <Sparkle className="hero__sparkle hero__sparkle--b" />

      <div className="reel" aria-hidden="true">
        {reelKeys.map((key) => (
          <div
            key={key}
            className={`reel__slide${key === showing ? " is-showing" : ""}`}
            style={{ zIndex: stack.indexOf(key) + 1 }}
          >
            <Picture photo={reel[key]} sizes="(max-width: 760px) 80vw, 34vw" priority={key === "rest"} decorative />
          </div>
        ))}
      </div>

      <nav className="hero__nav" aria-label="Sections">
        <div className="word word--personal">
          <button
            type="button"
            className="word__link hand-marker"
            aria-expanded={personalOpen}
            aria-controls="personal-categories"
            onClick={() => {
              setPersonalOpen((open) => !open);
              show("personal");
            }}
            {...reelHandlers("personal")}
          >
            Personal
          </button>
          <ul id="personal-categories" className="categories" data-open={personalOpen} inert={!personalOpen}>
            {personalCategories.map((category, index) => (
              <li key={category.href} className={`categories__item categories__item--${index}`}>
                <Link href={category.href} className="categories__link" {...reelHandlers("personal")}>
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href={sectionLinks.clients.href} className="word word--clients word__link hand-brush" {...reelHandlers("clients")}>
          Selected Clients <span className="word__amp">&amp;</span> Publications
        </Link>
        <Link href={sectionLinks.me.href} className="word word--me word__link hand-pen" {...reelHandlers("me")}>
          Me
        </Link>
        <Link href={sectionLinks.contact.href} className="word word--contact word__link hand-brush" {...reelHandlers("contact")}>
          Contact
        </Link>
      </nav>

      <Cutout name="dollar" className="hero__dollar" eager />
      <Cutout name="heels" className="hero__heels" eager />
      <Cutout name="topper" className="hero__topper" eager />
      <Cutout name="chip" className="hero__chip" eager />
      <Cutout name="hundred" className="hero__hundred" eager />
    </main>
  );
}
