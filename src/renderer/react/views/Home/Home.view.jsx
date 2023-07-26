import React from "react";

import { JoinedChats, AvailableChats, TitleChat } from "../../components/export.components";

const Home = () => {

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChats />
      </div>
      <div className="col-9 fh">
        <TitleChat />
        <AvailableChats />
      </div>
    </div>
  )
}

export default Home;