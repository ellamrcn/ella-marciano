"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { personalCategories, sectionLinks } from "@/app/content";
import { Logo } from "@/components/logo";
import { Cutout } from "@/components/ornaments";

export function SiteHeader() {
  const pathname = usePathname();
  const [personalOpen, setPersonalOpen] = useState(pathname.startsWith("/personal"));
  const current = (href: string) => (pathname === href || pathname === `${href}/` ? "page" : undefined);

  return (
    <header className="site-header">
      <p className="site-name">
        <Link href="/" className="site-name__link" aria-label="Ella Marciano, home">
          <Logo />
        </Link>
        <Cutout name="hundred" className="site-name__bill" eager />
      </p>

      <nav className="site-nav" aria-label="Sections">
        <ul className="site-nav__main">
          <li>
            <button
              type="button"
              className="site-nav__link"
              aria-expanded={personalOpen}
              aria-controls="personal-categories"
              onClick={() => setPersonalOpen((open) => !open)}
            >
              Personal
            </button>
          </li>
          <li>
            <Link href={sectionLinks.clients.href} className="site-nav__link" aria-current={current(sectionLinks.clients.href)}>
              {sectionLinks.clients.label}
            </Link>
          </li>
        </ul>
        <ul id="personal-categories" className="categories" data-open={personalOpen} inert={!personalOpen}>
          {personalCategories.map((category, index) => (
            <li key={category.href} className="categories__item" style={{ animationDelay: `${index * 0.1}s` }}>
              <Link href={category.href} className="categories__link" aria-current={current(category.href)}>
                {category.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="site-nav__aside">
          <li>
            <Link href={sectionLinks.me.href} className="site-nav__link" aria-current={current(sectionLinks.me.href)}>
              {sectionLinks.me.label}
            </Link>
          </li>
          <li>
            <Link href={sectionLinks.contact.href} className="site-nav__link" aria-current={current(sectionLinks.contact.href)}>
              {sectionLinks.contact.label}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
