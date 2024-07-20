import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../state/useConversation";
import { getTime } from "../../utils/getTime";

const Message = ({message}) => {
    const {user} = useAuthContext();
    const {selectedConversation} = useConversation();

    const isSent = message.senderId === user._id;
    const chatClassName = isSent ? "chat-end" : "chat-start";
    const profilePicture = isSent ? user.profilePicture : selectedConversation.profilePicture;
    const bgColor = isSent ? "bg-blue-500" : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={profilePicture} alt="Chat Bubble Image" />
              </div>
            </div>

            <div className={`chat-bubble text-white ${bgColor}`}>{message.message}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">{getTime(message.createdAt)}</div>
        </div>
    );
};

export default Message;
