import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from './AuthContext'
import io from "socket.io-client"
import toast from "react-hot-toast";
export const SocketContext = createContext();


export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState();
    const { authUser } = useAuthContext();
    // const SocketURL=import.meta.env.VITE_API_URL;
    const [socketURL,setSocketURL]=useState('');
    

    useEffect(() => {
        if (authUser) {

            fetch('/env')
            .then(res=>res.json())
            .then(data=>setSocketURL(data))
            .catch(error=>toast.error("Error setting up socket",error));

            const socket = io(socketURL, {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();

        }
        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }



    }, [authUser]);

    return <SocketContext.Provider value={{socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>
}