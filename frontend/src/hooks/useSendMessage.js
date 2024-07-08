import { useState } from "react";
import { useConversationContext } from "../../context/ConversationContext";
import { toast } from 'react-hot-toast'

const useSendMessage = () => {
   
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversationContext();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            })
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message);
            }

            setMessages([...messages, data.newMessage]);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return { sendMessage, loading }


    

}

export default useSendMessage