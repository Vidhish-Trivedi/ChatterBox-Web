import React from "react";
import { IoSearch } from "react-icons/io5";
import useConversation from "../../state/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = React.useState("");
    const {setSelectedConversation} = useConversation();
    const {conversations} = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!search) return;
        if(search.length < 3) {
            toast.error("Search query must be at least 3 characters long");
            return;
        }

        const conversation = conversations.find((conversation) => conversation.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("No user found with that name");
        }
    };

    return <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input type="text" placeholder="Search..." className="input input-bordered rounded-full" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white hover:bg-green-400">
            <IoSearch className="w-6 h-6 outline-none" />
        </button>
    </form>
};

export default SearchInput;
