import React, {useEffect, useState} from "react";
import axios from "axios";
import {MessageData} from "../message/Message";
import {ClipLoader} from "react-spinners";
import {useScrollToTopRequest} from "../../hooks/useScrollToTopRequest";
import MessagesList from "./MessagesList";

import css from './messages.module.scss';
import Description, {SCROLL_DOWN, SCROLL_UP} from "./Description";

const URL = "http://a0830433.xsph.ru/";

interface MessagesI {
    newestOnTop: boolean,
}

const Messages: React.FC<MessagesI> = ({newestOnTop}: MessagesI) => {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [prevMessages, setPrevMessages] = useState<MessageData[]>([]);
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

    // * Запрос на старые посты
    const getOldMessages = () => {
        const formData = new FormData();
        formData.append('actionName', 'MessagesLoad');
        formData.append('oldMessages', 'true');

        axios.post(URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data)
            setPrevMessages(response.data.Messages);
        }).catch(error => {
            console.error(error);
        })
    }

    // * Функция обработки данных
    const handleData = (newMessages: MessageData[]) => {
        if (newMessages && newMessages.length > 0) {
            setMessages(prev => [...prev, ...newMessages]);

            const lasMessageId = newMessages[newMessages.length - 1].id;
            setLastMessageId(lasMessageId);
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

    let first = true;
    // * Получение данных при загрузке страницы
    useEffect(() => {
        if (first) {
            getMessageData(lastMessageId);
            first = false;
        }
    }, []);

    // * При получении предыдущих сообщений
    useEffect(() => {
        setMessages(prev => [...prevMessages, ...prev]);
    }, [prevMessages]);

    // * Хук для динамического получения с сервера старых постов
    useScrollToTopRequest(getOldMessages, newestOnTop);

    // * Отображение спинера при загрузке данных
    if (isDataLoading && lastMessageId === '0') {
        return (
            <div className={css.messages}>
                {
                    <ClipLoader size={100} />
                }
            </div>
        )
    }

    const reverseMessages = [...messages].reverse();
    const isDescriptionVisible = prevMessages.length < 1;

    return (
        <div className={css.messages}>
            {
                newestOnTop
                ?  <>
                        <MessagesList messages={reverseMessages} />
                        <Description isVisible={isDescriptionVisible} scroll={SCROLL_DOWN} />
                    </>
                : <>
                        <Description isVisible={isDescriptionVisible} scroll={SCROLL_UP} />
                        <MessagesList messages={messages} />
                    </>
            }
        </div>
    );
};

export default Messages;
