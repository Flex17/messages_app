import React from "react";

import css from './sortBox.module.scss';

interface SortBoxI {
    newestOnTop: boolean,
    handleNewestOnTop: () => void,
}

const SortBox: React.FC<SortBoxI> = ({newestOnTop, handleNewestOnTop}: SortBoxI) => {

    return (
        <div className={css.box}>
            <div className={css.text}>Новые ссообщения {newestOnTop ? 'сверху' : 'снизу'}</div>
            {
                newestOnTop
                    ? <div className={css.icon} onClick={handleNewestOnTop}>
                        <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-2" x2="17" y2="-2" transform="matrix(1 0 0 -1 0 16)" stroke="black"
                                  strokeWidth="4"
                            />
                            <line y1="-2" x2="23" y2="-2" transform="matrix(1 0 0 -1 0 8)" stroke="black"
                                  strokeWidth="4"
                            />
                            <line y1="-2" x2="29" y2="-2" transform="matrix(1 0 0 -1 0 0)" stroke="black"
                                  strokeWidth="4"
                            />
                        </svg>
                    </div>
                    : <div className={css.icon} onClick={handleNewestOnTop}>
                        <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="2" x2="17" y2="2" stroke="black" strokeWidth="4"/>
                            <line y1="10" x2="23" y2="10" stroke="black" strokeWidth="4"/>
                            <line y1="18" x2="29" y2="18" stroke="black" strokeWidth="4"/>
                        </svg>
                    </div>
            }
        </div>
    );
};

export default SortBox;
