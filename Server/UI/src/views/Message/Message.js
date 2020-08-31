import React, {Component} from 'react';
import { render } from 'react-dom'
import {Modal, Button} from 'react-bootstrap'
import { Row, Col } from 'reactstrap'
import ConversationList from './ConversationList';
import MessageList from './MessageList'
import {Launcher} from 'react-chat-window';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Paper } from '@material-ui/core';

const override = css`
  display: block;
  margin: 0 auto;
  height: 100;

`;

class Message extends Component{

    constructor(props){
        super(props);
        this.handleChatboxClick = this.handleChatboxClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            loading: false,          
            open:false,
            openDialog:false,
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

      handleChatboxClick(){
          this.setState({
            loading:true,
            openDialog:true
          })
      }

      handleClose(){
        if(this.state.open){
          this.setState({
            open:false
          })
        }
      }
    
    render(){

        
    return (
            <div>
      <div>
      <ConversationList 
      func={this.handleChatboxClick}
      />
    </div>
    <Launcher
            agentProfile={{
            teamName: 'Servico',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            }}
            onMessageWasSent={this._onMessageWasSent.bind(this)}
            messageList={this.state.messageList}
            showEmoji
            isOpen={this.state.open}
            handleClick={this.handleClose}
            
            />


          <Dialog open={this.state.openDialog} fullWidth={true}>
              
                      <DialogActions >
                      <ClipLoader
                        css={override}
                        size={150}
                        color={"#123abc"}
                        loading={this.state.loading}
                      />

                      </DialogActions>
          </Dialog>
    </div>
    );
 }

}


export default Message;