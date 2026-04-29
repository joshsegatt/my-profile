import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

// The 'use client' directive is conceptually correct for what it does, 
// but since we are natively on Vite/React SPA, it just sits here harmlessly.
// 'use client';

export const PostHogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isInit = useRef(false);

    useEffect(() => {
        // [TAREFA 1/2] Zero LCP Impact: Defer initialization until the main thread is idle
        const initPH = () => {
            if (!isInit.current && typeof window !== 'undefined') {
                posthog.init(
                    import.meta.env.VITE_POSTHOG_KEY,
                    {
                        api_host: import.meta.env.VITE_POSTHOG_HOST,
                        capture_pageview: false, // We handle routing dynamically below
                        capture_pageleave: true,
                        autocapture: true, // Captures clicks, heatmaps, and sessions
                        disable_session_recording: false,
                    }
                );
                isInit.current = true;
                // Capture first pageview
                posthog.capture('$pageview', { $current_url: window.location.href });
            }
        };

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => initPH());
        } else {
            setTimeout(() => initPH(), 1000);
        }
    }, []);

    useEffect(() => {
        // [TAREFA 2] Rastreamento automático de Rotas (Adaptado de App Router para React Router)
        if (isInit.current) {
            posthog.capture('$pageview', {
                $current_url: window.location.href,
            });
        }
    }, [location]);

    return <>{children}</>;
};
