import {create} from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({selectedConversation: conversation}),
    messages: [],
    setMessages: (messages) => set({messages}),
    showSidebar: true,
    setShowSidebar: (show) => set({showSidebar: show}),
}));

export default useConversation;
