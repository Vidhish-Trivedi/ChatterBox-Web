import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../state/useConversation';

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(() => {
        if(socket) {
            socket.on("newMessage", (newMessage) => {
                setMessages([...messages, newMessage]);
            });
        }

        return () => {
            if(socket) {
                socket.off("newMessage");
            }
        }
    }, [socket, setMessages, messages]);

}

export default useListenMessages