import type { Metadata } from "next";
import { descriptions, pageMetadata } from "@/app/seo";
import { HomeBoard } from "@/components/home-board";
import { HomeIntro } from "@/components/home-intro";

export const metadata: Metadata = pageMetadata({ description: descriptions.home, path: "/" });

export default function Home() {
  return (
    <>
      <HomeIntro />
      <HomeBoard />
    </>
  );
}
