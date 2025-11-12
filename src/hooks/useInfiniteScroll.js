import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for infinite scroll functionality
 * @param {Function} loadMore - Callback to load more items
 * @param {boolean} hasMore - Whether there are more items to load
 * @returns {Object} Observer ref to attach to sentinel element
 */
export function useInfiniteScroll(loadMore, hasMore) {
  const observerRef = useRef(null);
  const loadingRef = useRef(false);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      
      if (target.isIntersecting && hasMore && !loadingRef.current) {
        loadingRef.current = true;
        loadMore();
        
        // Reset loading flag after a short delay
        setTimeout(() => {
          loadingRef.current = false;
        }, 1000);
      }
    },
    [loadMore, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [handleObserver]);

  return { observerRef };
}
