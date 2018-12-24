import { startup } from './scripts';

const rootElement = window.document.getElementById('root');

startup(rootElement);

if (module.hot) {
    module.hot.accept(['./scripts'], () => {
        const nextStartup = require('./scripts').startup;
        nextStartup(rootElement);
    });
}

if (process.env.NODE_ENV === 'production') {
    if ('serviceWorker' in navigator) {
        const workerUrl = '/static/service-worker.js';
        const workerOptions = { scope: '/' };
        const loadServiceWorker = async () => {
            try {
                const registration = await navigator.serviceWorker.register(workerUrl, workerOptions);
                console.info('SW registered: ', registration);
            } catch (registrationError) {
                console.info('SW registration failed: ', registrationError);
            }
        };

        window.addEventListener('load', loadServiceWorker);
    }
}