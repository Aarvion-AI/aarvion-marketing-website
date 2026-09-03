"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import styles from "./runtime-home.module.css";

const chapters = [
  { id: "routing", label: "Route" },
  { id: "policy", label: "Policy" },
  { id: "deployment", label: "Deploy" },
  { id: "product", label: "Operate" },
] as const;

type ChapterId = (typeof chapters)[number]["id"];

export function RuntimeStoryArc({
  overview,
  children,
}: {
  overview: ReactNode;
  children: ReactNode;
}) {
  const arcRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState<ChapterId>("routing");
  const [storyEnhanced, setStoryEnhanced] = useState(false);

  useEffect(() => {
    const arc = arcRef.current;
    if (!arc || !("IntersectionObserver" in window)) return;

    const sections = chapters
      .map(({ id }) => arc.querySelector<HTMLElement>(`#${id}`))
      .filter((section): section is HTMLElement => Boolean(section));

    const readingLine = window.innerHeight * 0.32;
    const currentSection =
      sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom >= readingLine;
      }) ?? sections.find((section) => section.getBoundingClientRect().top > readingLine);
    const currentId = currentSection?.dataset.storyChapter as ChapterId | undefined;
    if (currentId) setActiveChapter(currentId);
    setStoryEnhanced(true);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const current = visible[0]?.target as HTMLElement | undefined;
        const id = current?.dataset.storyChapter as ChapterId | undefined;
        if (id) setActiveChapter(id);
      },
      { rootMargin: "-18% 0px -68%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={styles.runtimeStoryArc}
      data-active-chapter={activeChapter}
      data-story-enhanced={storyEnhanced ? "true" : undefined}
      ref={arcRef}
    >
      {overview}
      <div className={styles.storyChapterSequence}>
        <div className={styles.storyFocusShell} aria-hidden="true">
          <div className={styles.storyFocusFrame}>
            <div className={styles.storyFocusTrack}>
              {chapters.map(({ id, label }) => (
                <span className={styles.storyFocusItem} data-story-focus={id} key={id}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
