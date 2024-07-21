import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { MdOutlineMessage } from "react-icons/md";
import useConversation from "../../state/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation, showSidebar, setShowSidebar } = useConversation();

    const handleSidebarToggle = () => {
        setShowSidebar(true);
        setSelectedConversation(null);
    }

    useEffect(() => {
        // Cleanup selected conversation on unmount
    }, [setSelectedConversation]);

    return <div className="sm:min-w-[450px] flex flex-col">
        {!selectedConversation ? <NoChatSelected /> :
            (<>

                <div className="bg-slate-500 px-4 py-2 mb-2">
                    <button className="btn btn-circle bg-sky-500 text-white hover:bg-green-400 gap-2" onClick={handleSidebarToggle}><MdOutlineMessage className="w-6 h-6 outline-none" /></button>
                    <span className="ml-2 label-text">To:</span> <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
                </div>

                <Messages />
                <MessageInput />
            </>)
        }
    </div>;
};

const NoChatSelected = () => {
    const { user } = useAuthContext();
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome {user.fullName}!</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="text-3xl text-center md:text-6xl" />
            </div>
        </div>
    );
};


export default MessageContainer;
