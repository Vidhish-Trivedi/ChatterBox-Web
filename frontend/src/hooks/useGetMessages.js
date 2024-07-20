import React, { useEffect, useState } from 'react'
import useConversation from '../state/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {
        if(!selectedConversation) return;
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                if(!res.ok) throw new Error("Failed to fetch messages");
                const data = await res.json();
                
                if(data.error) {
                    throw new Error(data.error);
                }

                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getMessages();
    }, [selectedConversation, setMessages]);

    return {loading, messages};
}

export default useGetMessages