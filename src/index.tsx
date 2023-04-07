import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from 'src/locales/ru.json';
import kz from 'src/locales/kz.json';

interface AppConfiguration {
    title: string;
}

declare global {
    interface Window {
        Config: AppConfiguration;
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ru,
            kz,
        },
        lng: 'ru',
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false,
        },
    });

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.querySelector('#root')
);
