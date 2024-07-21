import { createContext, useState, useEffect, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        if (user) {
            const newSocket = io("http://localhost:5000", {
                query: {
                    userId: user._id
                }
            });

            setSocket(newSocket);

            newSocket.on("connect", () => {
                console.log("Socket connected");
            });

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Cleanup function to close the socket connection when the component unmounts
            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
