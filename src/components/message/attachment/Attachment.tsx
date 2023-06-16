import React from "react";
import {AttachmentData, IMAGE_TYPE, VIDEO_TYPE} from "../Message";
import css from './attachment.module.scss';

interface AttachmentI {
    attachments: AttachmentData[]
}

const Attachment: React.FC<AttachmentI> = ({attachments}: AttachmentI) => {

    return (
        <div className={css.container}>
            {
                attachments?.map((attachment, i) => {
                    if (attachment.type === VIDEO_TYPE) {
                        return (
                            <video autoPlay loop controls muted key={i}>
                                <source src={attachment.url} />
                            </video>
                        )
                    } else if (attachment.type === IMAGE_TYPE) {
                        return (
                            <img src={attachment.url} alt="picture" key={i} />
                        )
                    }
                })
            }
        </div>
    );
};

export default Attachment;
