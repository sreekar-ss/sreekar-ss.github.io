import { useEffect } from "react";

/**
 * Sets the tab title and page background for a redesign route, and puts the
 * original values back when the route unmounts. The global stylesheet paints a
 * gradient on <body> for the current site, which would otherwise show through
 * on overscroll.
 */
export function usePageChrome(title: string, background: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const body = document.body;
    const prevBg = body.style.background;
    document.title = title;
    body.style.background = background;
    return () => {
      document.title = prevTitle;
      body.style.background = prevBg;
    };
  }, [title, background]);
}
