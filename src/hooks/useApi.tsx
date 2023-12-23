import { useCallback, useState } from "react";

export default function useApi<T>(callback: (...args: any[]) => Promise<T>) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (...args: any[]): Promise<T> => {
      setIsPending(true);
      setError(null);

      const res = await callback(...args);

      setIsPending(false);
      return res;
    },
    [callback]
  );
  return { isPending, error, run };
}
