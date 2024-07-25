import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from "../../state/useConversation";

const Home = () => {
    const {showSidebar, selectedConversation, setSelectedConversation, setShowSidebar} = useConversation();

    useEffect(() => {
        if(selectedConversation) {
            setShowSidebar(false);
        } else {
            setShowSidebar(true);
        }
    }, [setSelectedConversation]);

    return (
        <div className="flex sm:max-h-[60%] md:h-[80%] rounded-xl overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
            {showSidebar && <Sidebar />}
            {selectedConversation && <MessageContainer />}
        </div>
    );
};

export default Home;
