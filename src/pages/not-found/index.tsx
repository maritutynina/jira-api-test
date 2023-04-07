import { FC } from 'react';
import { SimpleCard } from 'src/components/simple-card/simple-card';
import { useTranslation } from 'react-i18next';

export const NotFoundPage: FC = () => {
    const { t } = useTranslation('not-found-page');

    return <SimpleCard title={t('title')}>
        {t('description')}
    </SimpleCard>;
};
