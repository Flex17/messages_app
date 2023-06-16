import React, {useEffect, useState} from "react";
import avatar from "../../img/img.png";

import css from './message.module.scss';
import Attachment from "./attachment/Attachment";
import {checkFavourite, handleFavourite} from "../../helpers/checkFavourite";

export const VIDEO_TYPE = 'video';
export const IMAGE_TYPE = 'image';

export interface AttachmentData {
    type: typeof VIDEO_TYPE | typeof IMAGE_TYPE,
    url: string,
}

export interface MessageData {
    attachments: AttachmentData[],
    author: string,
    channel: string,
    content: string,
    date: string,
    id: string,
    region: string,
    senderNumber: string,
}

interface MessageI {
    message: MessageData,
}

const Message: React.FC<MessageI> = ({
    message,
}: MessageI) => {

    const {attachments, author, id, channel, content} = message;

    const [isFavourite, setIsFavourite] = useState(checkFavourite(id));

    useEffect(() => {
        handleFavourite(id, isFavourite);
    }, [isFavourite]);

    return (
        <div className={css.container}>
            <div className={css.content}>
                <img src={avatar}  alt="avatar"/>
                <div className={css.main}>
                    <div className={css.header}>
                        <div className={css.author_block}>
                            <div className={css.author}>{author}</div>
                            <div className={css.channel}>Канал: {channel}</div>
                        </div>
                        <div
                            className={css.favourite}
                            onClick={() => setIsFavourite(!isFavourite)}
                        >
                            {
                                isFavourite
                                ?  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.3672 3.20312L7.82812 8.39844L2.08594 9.21875C1.07031 9.375 0.679688 10.625 1.42188 11.3672L5.52344 15.3906L4.54688 21.0547C4.39062 22.0703 5.48438 22.8516 6.38281 22.3828L11.5 19.6875L16.5781 22.3828C17.4766 22.8516 18.5703 22.0703 18.4141 21.0547L17.4375 15.3906L21.5391 11.3672C22.2812 10.625 21.8906 9.375 20.875 9.21875L15.1719 8.39844L12.5938 3.20312C12.1641 2.30469 10.8359 2.26562 10.3672 3.20312Z" fill="#0088EE"/>
                                    </svg>
                                : <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.3672 3.20312L7.82812 8.39844L2.08594 9.21875C1.07031 9.375 0.679688 10.625 1.42188 11.3672L5.52344 15.3906L4.54688 21.0547C4.39062 22.0703 5.48438 22.8516 6.38281 22.3828L11.5 19.6875L16.5781 22.3828C17.4766 22.8516 18.5703 22.0703 18.4141 21.0547L17.4375 15.3906L21.5391 11.3672C22.2812 10.625 21.8906 9.375 20.875 9.21875L15.1719 8.39844L12.5938 3.20312C12.1641 2.30469 10.8359 2.26562 10.3672 3.20312Z" fill="#FFFFFF" stroke="#0088EE"/>
                                    </svg>
                            }
                        </div>
                    </div>
                    <div className={css.text}>{content}</div>
                    <Attachment attachments={attachments} />
                </div>
            </div>
        </div>
    );
};

export default Message;
