import { getRandomEmoji } from "../../../utils/randomEmoji";
import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"


const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {
        loading ? <span className="loading loading-lg"></span> :
          conversations.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              emoji={getRandomEmoji()}
              lastIdx={idx === (conversations.length - 1)}

            />
          ))
      }
    </div>
  )
}

export default Conversations
