
import { BsSend } from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage';
import { useState } from 'react';
const MessageInput = () => {
  
  const [msg, setMsg] = useState("");
  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!msg) return;
    await sendMessage(msg);
    setMsg("");

  }
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input type="text"
          className="border outline-none text-sm rounded-lg block w-full p-2.5 bg-[#275a5b] border-[#275a5b] text-white"
          placeholder="Send a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type='submit' className="absolute inset-y-0 end-0 flex items-center pe-3 ">
          {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
