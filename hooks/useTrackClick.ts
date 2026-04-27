'use client';

import { useCallback } from 'react';

interface TrackClickParams {
  productSlug: string;
  productName: string;
  destinationUrl: string;
  sourcePage: string;
  ctaPlacement?: string;
}

export function useTrackClick() {
  const trackClick = useCallback((params: TrackClickParams) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const url = `${baseUrl}/api/track/click-buy`;
    const body = JSON.stringify(params);

    // Use sendBeacon for fire-and-forget (best for navigating away)
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
    } else {
      // Fallback to fetch with keepalive
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {
        // Silently fail — tracking should never block UX
      });
    }
  }, []);

  return { trackClick };
}
