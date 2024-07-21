import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();    // Listen for new messages.
    const lastMessageRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    }, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {loading && <MessageSkeleton/>}
            {!loading && messages.length > 0 && messages.map((message) => 
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            )}
            {!loading && messages.length === 0 && <p className="text-center text-gray-500 mt-5">Send a message to start a conversation</p>}
        </div>
    );
};

export default Messages;
