import { useCallback, useEffect, useState } from 'react';

export function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [retryKey, setRetryKey] = useState(0);

  const retry = useCallback(() => {
    setRetryKey((current) => current + 1);
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setLoading(true);
      setError('');

      try {
        const result = await fetcher();
        if (!ignore) {
          setData(result);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message || 'Something went wrong.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    // useEffect demonstrates lifecycle-style API loading when route/search dependencies change.
    loadData();

    return () => {
      ignore = true;
    };
  }, [fetcher, retryKey]);

  return { data, error, loading, retry };
}
