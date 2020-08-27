import React, {Component} from 'react';
import { render } from 'react-dom'
import {Modal, Button} from 'react-bootstrap'
import { Row, Col } from 'reactstrap'
import ConversationList from './ConversationList';
import MessageList from './MessageList'
import {Launcher} from 'react-chat-window'

class Message extends Component{

    constructor(){
        super();
        this.state = {
            messageList: [
            {
                author: 'them',
              type: 'text',
              data: {
                text: 'Hi'
              }
            },
            {
            author: 'me',
              type: 'text',
              data: {
                text: 'Im Dulangi'
              }
            }]
          };
    }
    _onMessageWasSent(message) {
        this.setState({
          messageList: [...this.state.messageList, message]
        })
      }

      _sendMessage(text) {
        if (text.length > 0) {
          this.setState({
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text }
            }]
          })
        }
      }
    
    render(){

        
    return (
            <div>
      <div>
      <ConversationList />
    </div>
          <Launcher
            agentProfile={{
            teamName: 'Servico',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            }}
            onMessageWasSent={this._onMessageWasSent.bind(this)}
            messageList={this.state.messageList}
            showEmoji
            />
    </div>
    );
 }

}


export default Message;