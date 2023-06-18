import React from "react";
import Message, {MessageData} from "../message/Message";
import {useFavourite} from "../../hooks/useFavourite";

interface MessagesListI {
    messages: MessageData[]
}

const MessagesList: React.FC<MessagesListI> = ({messages}: MessagesListI) => {
    const {handleToggleFavorite, isFavourite} = useFavourite();

    return (
        <>
            {
                messages.map((message, i) => (
                    <Message
                        key={i}
                        message={message}
                        isFavourite={isFavourite}
                        handleToggleFavorite={handleToggleFavorite}
                    />
                ))
            }
        </>
    )
};

export default MessagesList;
