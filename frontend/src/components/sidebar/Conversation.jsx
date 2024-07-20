import React from "react";
import useConversation from "../../state/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation && selectedConversation._id === conversation._id;

    return (
        <div>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded px-3 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`} onClick={() => setSelectedConversation(conversation)} >
                <div className="avatar online">
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
