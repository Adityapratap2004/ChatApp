import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useGetConversations = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/user');
                const data = await res.json();
                if (!data.success) {
                    throw new Error(data.message);
                }
                setConversations(data.users);

            } catch (err) {
                toast.error(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        getConversations();
    }, []);

    return {loading,conversations };

}

export default useGetConversations;


