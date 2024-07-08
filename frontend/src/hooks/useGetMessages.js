import { useEffect, useState } from "react"
import { useConversationContext } from "../../context/ConversationContext";
import toast from "react-hot-toast";


const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversationContext();

    useEffect(()=>{
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/message/${selectedConversation._id}`);
                const data = await res.json();
                if (!data.success) {
                    throw new Error(data.message);
                }
                setMessages(data.messages);
            } catch (error) {
                toast.error(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        if(selectedConversation?._id)getMessages();
        
    },[selectedConversation?._id,setMessages])

    return { loading ,messages}

}

export default useGetMessages
