import React from "react";

import css from './messages.module.scss';

export const SCROLL_UP ='SCROLL_UP';
export const SCROLL_DOWN ='SCROLL_DOWN';

interface DescriptionI {
    isVisible: boolean;
    scroll: typeof SCROLL_UP | typeof SCROLL_DOWN,
}

const Description: React.FC<DescriptionI> = ({isVisible, scroll}: DescriptionI) => {

    return (
        <>
            {
                isVisible
                && <div
                    className={css.description}
                >
                    Скролл {scroll === SCROLL_UP ? 'вверх' : 'вниз'}, чтобы загрузить старые посты
                </div>
            }
        </>
    );
};

export default Description;
