import { useCallback, useEffect, useState } from "react";

/**
 * Runs an async loader and tracks its four states honestly.
 *
 * `status` is one of: "loading" | "success" | "error".
 * Nothing is reported as loaded until the promise actually resolves, so an empty
 * grid can never be mistaken for a successful fetch of nothing.
 *
 * @param {Function} loader   async function returning the data
 * @param {Array}    deps     re-runs when these change
 */
export default function useAsync(loader, deps = []) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });
  const [attempt, setAttempt] = useState(0);

  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    Promise.resolve()
      .then(loader)
      .then((data) => {
        if (cancelled) return;
        setState({ status: "success", data, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({ status: "error", data: null, error });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  return { ...state, reload };
}
