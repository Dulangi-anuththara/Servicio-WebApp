import React, {useEffect} from 'react';
import shave from 'shave';
import { Badge} from 'reactstrap';
import './ConversationListItem.css';

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

    const { photo, name, text, id, count } = props.data;

    return (
      <div className="conversation-list-item" onClick={props.func} id={id} title={name}>
        <img className="conversation-photo" src={photo} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
          <p className="conversation-snippet">{ text }</p>
          <Badge pill color="primary">{count}</Badge>
        </div>
      </div>
    );
}