import React, {useEffect, useState} from "react";
import axios from "axios";
import Message, {MessageData} from "../message/Message";
import css from './messages.module.scss';
import {ClipLoader} from "react-spinners";

const URL = "http://a0830433.xsph.ru/";

interface MessagesI {
    newestOnTop: boolean,
}

const Messages: React.FC<MessagesI> = ({newestOnTop}: MessagesI) => {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [lastMessageId, setLastMessageId] = useState("0");
    const [isDataLoading, setIsDataLoading] = useState(false);

    // * Функция для получения данных с сервера
    const getMessageData = (lastMessageId: string) => {
        const formData = new FormData();
        formData.append('actionName', 'MessagesLoad');
        formData.append('messageId', lastMessageId);

        setIsDataLoading(true);

        axios.post(URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            handleData(response.data.Messages);
        }).catch(error => {
            console.error(error);
        })
        .finally(() => {
            setIsDataLoading(false);
        })
    }

    // * Функция обработки данных
    const handleData = (Messages: MessageData[]) => {
        if (Messages && Messages.length > 0) {
            if (newestOnTop) {
                setMessages([...Messages, ...messages]);
            } else {
                setMessages([...messages, ...Messages]);
            }
            setLastMessageId(Messages[Messages.length - 1].id);
        }
    }

    // * Каждые 5 секунд запускается функция получения данных
    useEffect(() => {
        const interval = setInterval(() => {
            if (lastMessageId !== "0") {
                getMessageData(lastMessageId);
            }
        }, 5000)

        return () => {
            clearInterval(interval);
        }
    }, [lastMessageId]);

    // * Получение данных при загрузке страницы
    useEffect(() => {
        getMessageData(lastMessageId);
    }, []);


    return (
        <div className={css.messages}>
            {
                isDataLoading && lastMessageId === '0'
                ? <ClipLoader size={100} />
                : messages.map((message, i) => (
                        <Message
                            message={message}
                            key={i}
                        />
                    ))
            }
        </div>
    );
};

export default Messages;
