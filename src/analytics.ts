import { gtag } from 'gtag';

export const GA_MEASUREMENT_ID: string = 'G-4EQBNSBCH7';

// Initialize GA
export const initGA = (): void => {
    gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
    });
};

// Track page views
export const trackPageView = (path: string): void => {
    gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
    });
};

// Track events
export const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
): void => {
    gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};