import { useCallback, useState } from "react";

export default function useApi<T>(callback: (...args: any[]) => Promise<T>) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (...args: any[]): Promise<T | undefined | Error> => {
      try {
        setIsPending(true);
        setError(null);

        const res = await callback(...args);

        return res;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          setError(error.message);
          return error;
        }
      } finally {
        setIsPending(false);
      }
    },
    [callback]
  );
  return { isPending, error, run };
}
