import ChatHead from "./components/chat-head";
import ChatInbox from "./components/chat-inbox";

 
export default function MessagePage( ) {
  return (
    <section className="p-3">
        <div className="lg:flex">
            <ChatHead/>
            <ChatInbox/>
        </div>
    </section>
  )
}