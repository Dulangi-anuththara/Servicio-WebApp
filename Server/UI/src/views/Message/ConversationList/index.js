import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import {Launcher} from 'react-chat-window'
import './ConversationList.css';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const [messageList, setmessageList] = useState([]);
  const handleChatboxClick = props.func;
  const id =props.uid

  useEffect(() => {
    getConversations()
    console.log(id)
  },[])
 const getConversations = () => {
   const url = `http://localhost:5000/msg/${props.uid}`
    axios.get(url).then(response => {
     console.log(response.data)
        let newConversations = response.data.map(result => {
          return {
            count:result.count,
            photo:result.photo,
            name: result.name,
            text: result.text,
            id:result.id
          };
        });
        setConversations([...conversations, ...newConversations])
    });
  }
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenge Box"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />

        {
          conversations.map(conversation =>
            <div>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
              func={handleChatboxClick}
            />
        </div>
          )
        }
      </div>
    );
}