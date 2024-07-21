import React from "react";
import useConversation from "../../state/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation && selectedConversation._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    console.log("isOnline", isOnline, conversation.fullName, conversation._id, onlineUsers);
    return (
        <div>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded px-3 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`} onClick={() => setSelectedConversation(conversation)} >
                <div className={`avatar ${isOnline ? "online": ""}`}>
                    <div className="w-12 rounded-full">
                        <img alt="User Avatar" src={conversation.profilePicture} />
                    </div>
                </div>


                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{conversation.fullName}</p>
                    </div>
                </div>
            </div>
            {!lastIdx ? <div className="divider my-0 py-0 h-1"></div> : null}
        </div>
    );
};

export default Conversation;
