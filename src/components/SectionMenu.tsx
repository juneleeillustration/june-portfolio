"use client";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";

type Section = {
  _id: string;
  title: string;
};

type Props = {
  sections: Section[];
  siteName: string;
};

export default function SectionMenu({ sections, siteName }: Props) {
  const [activeId, setActiveId] = React.useState<string | null>(
    sections[0]?._id ?? null,
  );

  React.useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-section-target]",
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = (visible.target as HTMLElement).dataset.sectionTarget;
          if (id) setActiveId(id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const activeTitle =
    sections.find((s) => s._id === activeId)?.title ?? siteName;

  return (
    <NavigationMenu className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* Trigger label mirrors the currently-visible section */}
          <NavigationMenuTrigger>{activeTitle}</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="w-48 p-1">
              {sections.map((section) => (
                <li key={section._id}>
                  <NavigationMenuLink asChild>
                    <a
                      href={`#section-${section._id}`}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors",
                        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                        "focus:bg-zinc-100 dark:focus:bg-zinc-800",
                        activeId === section._id
                          ? "font-semibold text-zinc-900 dark:text-zinc-50"
                          : "text-zinc-600 dark:text-zinc-400",
                      )}
                    >
                      {section.title}
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
