import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

/**
 * Resets scroll to the top on every navigation.
 *
 * Mounted in both the public Layout and the admin shell — a single-page app
 * keeps the window's scroll position across route changes, so without this a
 * visitor who follows a link from halfway down a page arrives halfway down the
 * next one.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // Browsers restore the previous scroll offset on back/forward by default,
    // which lands after this reset and undoes it. Taking manual control makes
    // the behaviour consistent in both directions.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    // A link to #section should still reach that section rather than the top.
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    // useLayoutEffect, not useEffect: this runs before the browser paints, so
    // the new page never flashes at the previous page's scroll offset first.
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
