import { FC } from 'react';

interface SimpleCardProps {
    title?: string;
}

export const SimpleCard: FC<SimpleCardProps> = (props) => {
    const { title, children } = props;
    return <div className="w-100 h-75 d-flex justify-content-center flex-column px-3">
        <div className="fw-bold fs-5 mb-4 text-center">{title}</div>
        <div className="mb-4 mx-auto">
            {children}
        </div> 
    </div>;
};
