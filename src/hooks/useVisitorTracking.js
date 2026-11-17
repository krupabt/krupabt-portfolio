// Privacy-conscious client-side visitor analytics hook
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Simple UUID generator without external dependencies
function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'id_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
}

// Parse referral source cleanly
function getReferralSource() {
  if (typeof window === 'undefined') return 'Direct';

  // Check URL query parameters first (e.g. ?ref=linkedin or ?utm_source=linkedin)
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source') || params.get('ref') || params.get('source');
  if (utmSource) {
    const s = utmSource.toLowerCase();
    if (s.includes('linkedin')) return 'LinkedIn';
    if (s.includes('github')) return 'GitHub';
    if (s.includes('google')) return 'Google';
    if (s.includes('twitter') || s.includes('x')) return 'X (Twitter)';
    if (s.includes('instagram')) return 'Instagram';
    return utmSource;
  }

  // Parse document.referrer
  const ref = document.referrer ? document.referrer.toLowerCase() : '';
  if (!ref || ref.includes(window.location.hostname)) {
    return 'Direct';
  }

  if (ref.includes('linkedin.com')) return 'LinkedIn';
  if (ref.includes('github.com')) return 'GitHub';
  if (ref.includes('google.')) return 'Google';
  if (ref.includes('twitter.com') || ref.includes('t.co') || ref.includes('x.com')) return 'X (Twitter)';
  if (ref.includes('instagram.com')) return 'Instagram';
  if (ref.includes('youtube.com')) return 'YouTube';
  if (ref.includes('bing.com')) return 'Bing';
  if (ref.includes('duckduckgo.com')) return 'DuckDuckGo';

  try {
    return new URL(ref).hostname.replace('www.', '');
  } catch (e) {
    return 'Direct';
  }
}

// Client-side device detection
function getDeviceDetails() {
  if (typeof window === 'undefined') {
    return { device: 'Desktop', browser: 'Other', os: 'Other' };
  }

  const ua = navigator.userAgent || '';
  const width = window.innerWidth;

  // Device
  let device = 'Desktop';
  if (/tablet|ipad/i.test(ua) || (width >= 640 && width <= 1024 && 'ontouchstart' in window)) {
    device = 'Tablet';
  } else if (/mobile|iphone|android|ipod/i.test(ua) || width < 640) {
    device = 'Mobile';
  }

  // Browser
  let browser = 'Other';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua)) browser = 'Safari';
  else if (/opr\//i.test(ua)) browser = 'Opera';

  // OS
  let os = 'Other';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/linux/i.test(ua)) os = 'Linux';

  return { device, browser, os };
}

export function useVisitorTracking() {
  const location = useLocation();
  const lastTrackedRef = useRef({ url: '', timestamp: 0 });
  const sessionStartTimeRef = useRef(Date.now());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Privacy Settings Check (Do Not Track)
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
      return;
    }

    // 2. Exclude Admin & Owner Area Routes (Never track owner visits inside owner/admin pages)
    const currentPath = location.pathname + (location.hash || '');
    if (currentPath.startsWith('/admin') || currentPath.startsWith('/owner')) {
      return;
    }

    // 4. Deduplicate React 18 re-renders and immediate hash updates
    const now = Date.now();
    if (
      lastTrackedRef.current.url === currentPath &&
      now - lastTrackedRef.current.timestamp < 1800
    ) {
      return;
    }
    lastTrackedRef.current = { url: currentPath, timestamp: now };

    // 5. Privacy-preserving Visitor & Session Identifiers
    let visitorId = localStorage.getItem('pa_vid');
    let isNewVisitor = false;
    if (!visitorId) {
      visitorId = 'v_' + generateId();
      try {
        localStorage.setItem('pa_vid', visitorId);
        isNewVisitor = true;
      } catch (e) {
        // Storage restricted
      }
    }

    let sessionId = sessionStorage.getItem('pa_sid');
    if (!sessionId) {
      sessionId = 's_' + generateId();
      try {
        sessionStorage.setItem('pa_sid', sessionId);
      } catch (e) {
        // Storage restricted
      }
    }

    // 6. Gather safe, non-identifying telemetry
    const { device, browser, os } = getDeviceDetails();
    const source = getReferralSource();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const screenResolution = `${window.screen?.width || 0}x${window.screen?.height || 0}`;

    const payload = {
      visitorId,
      sessionId,
      isNewVisitor,
      page: currentPath,
      referrer: document.referrer || '',
      source,
      device,
      browser,
      os,
      screenResolution,
      timezone,
      duration: Math.round((Date.now() - sessionStartTimeRef.current) / 1000)
    };

    // 7. Send event silently in background without blocking UI
    try {
      if (typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon('/api/track', blob);
      } else {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      }
    } catch (err) {
      // Ignore background tracking network errors
    }
  }, [location.pathname, location.hash]);

  // Session Duration Heartbeat on tab hide or unload
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sendDurationUpdate = () => {
      const currentPath = location.pathname + (location.hash || '');
      if (currentPath.startsWith('/admin') || currentPath.startsWith('/owner')) {
        return;
      }

      const duration = Math.round((Date.now() - sessionStartTimeRef.current) / 1000);
      if (duration < 3) return; // Ignore accidental bounces

      const sessionId = sessionStorage.getItem('pa_sid');
      const visitorId = localStorage.getItem('pa_vid');
      if (!sessionId) return;

      const payload = {
        type: 'heartbeat',
        sessionId,
        visitorId,
        page: location.pathname + (location.hash || ''),
        duration
      };

      try {
        if (typeof navigator.sendBeacon === 'function') {
          const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
          navigator.sendBeacon('/api/track', blob);
        }
      } catch (e) {
        //
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendDurationUpdate();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', sendDurationUpdate);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', sendDurationUpdate);
    };
  }, [location.pathname, location.hash]);
}
