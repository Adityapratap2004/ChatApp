import { useEffect } from "react";
import { useConversationContext } from "../../../context/ConversationContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from 'react-icons/ti';

// Define NoChatSelected before MessageContainer
const NoChatSelected = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 Aditya P</p>
                <p>Start a conversation by selecting a chat</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    )
};

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversationContext();
    console.log(selectedConversation);


    useEffect(()=>{

        //clean up function
        return ()=>{
            setSelectedConversation(null);
        }

    },[])
    
    return (
        <div className="md:min-w-[450px] flex flex-col ">
            {
                !selectedConversation ? (
                    <NoChatSelected /> 
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-[#275a5b] px-4 py-2 mb-2">
                            <span className="label-text">To: </span><span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
                        </div>
                        <Messages />
                        <MessageInput />
                    </>
                )
            }
        </div>
    );
};

export default MessageContainer;
