declare global {
    interface Window {
        gtag: (command: any, targetId: any, config?: any) => void;
    }
}

const gtag = (command: any, targetId: any, config?: any): void => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag(command, targetId, config);
    }
};

export const GA_MEASUREMENT_ID = 'G-4EQBNSBCH7';

export const initGA = (): void => {
    gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
    });
};

export const trackPageView = (path: string): void => {
    gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
    });
};