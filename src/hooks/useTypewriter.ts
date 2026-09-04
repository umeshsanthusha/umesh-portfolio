import { useEffect, useState } from "react";

/**
 * Cycles through a list of strings with a typewriter effect.
 * Always animates: it is a small in-place text effect and is core hero
 * content (PRD HERO-06), so it is exempt from the reduced-motion kill
 * switch (the blinking caret still honors it via CSS).
 */
export function useTypewriter(words: string[], typeSpeed = 65): string {
  const [state, setState] = useState({ word: 0, sub: 0, deleting: false });

  useEffect(() => {
    if (words.length === 0) return;

    const current = words[state.word % words.length];

    let timer: number;
    if (!state.deleting && state.sub === current.length) {
      timer = window.setTimeout(
        () => setState({ word: state.word, sub: state.sub, deleting: true }),
        1700
      );
    } else if (state.deleting && state.sub === 0) {
      timer = window.setTimeout(
        () => setState({ word: (state.word + 1) % words.length, sub: 0, deleting: false }),
        0
      );
    } else {
      timer = window.setTimeout(
        () =>
          setState({
            word: state.word,
            sub: state.sub + (state.deleting ? -1 : 1),
            deleting: state.deleting,
          }),
        state.deleting ? 32 : typeSpeed
      );
    }

    return () => window.clearTimeout(timer);
  }, [state, words, typeSpeed]);

  return words.length > 0 ? words[state.word % words.length].slice(0, state.sub) : "";
}
