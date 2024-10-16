"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function Footer() {
  const [footerStyle, setFooterStyle] = useState({ opacity: 1, marginBottom: "0px" });
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const footerOpacity = Math.max(0, 1 - currentScrollY / 200); // Adjust fade speed
      const footerMargin = Math.min(50, currentScrollY / 2) + "px"; // Adjust move speed

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setFooterStyle({
          opacity: footerOpacity,
          marginBottom: footerMargin,
        });
      } else {
        // Scrolling up
        setFooterStyle({
          opacity: 1,
          marginBottom: "0px",
        });
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className="w-full bg-[hsl(var(--background))] fixed bottom-0 transition-all duration-300 ease-in-out"
      style={{
        opacity: footerStyle.opacity,
        marginBottom: footerStyle.marginBottom,
      }}
    >
      <Separator />
      <div className="px-3 py-1 flex justify-between items-center">
        <div>
          <span className="text-sm font-medium">Built with</span>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button className="pl-1 text-sm font-medium" variant="link">
                shadcn/ui
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex items-center justify-between gap-3">
                <Link href="https://x.com/shadcn" target="_blank">
                  <Button variant="link" className="text-sm pl-1">
                    Twitter/X
                  </Button>
                </Link>
                <Separator orientation="vertical" />
                <Link href="https://ui.shadcn.com/" target="_blank">
                  <Button variant="link" className="text-sm pl-1">
                    Website
                  </Button>
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div>
          <Link href="https://github.com/zhenfon/discord-pinger" target="_blank">
            <Button className="" variant="ghost" size="icon">
              <Github className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
