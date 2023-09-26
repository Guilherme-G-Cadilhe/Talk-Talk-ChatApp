import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { JoinedChatsList, AvailableChatsList, TitleChat } from "../../components/export.components";
import { useChatsStore } from "../../../js/store";
import { withBaseLayout } from "../../layouts/Base.component";
import NotificationUtils from "../../../js/utils/notifications";

const Home = () => {
  const fetchChats = useChatsStore((state) => state.fetchChats)
  const joined = useChatsStore((state) => state.joined)
  const available = useChatsStore((state) => state.available)

  useEffect(() => {
    NotificationUtils.setup()
    fetchChats()
  }, [])


  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={joined} />
      </div>
      <div className="col-9 fh">
        <TitleChat title="Choose your channel" >
          <Link to="/chat/create" className="btn btn-outline-primary">New Channel</Link>
        </TitleChat>
        <AvailableChatsList chats={available} />
      </div>
    </div>

  )
}

export default withBaseLayout(Home);