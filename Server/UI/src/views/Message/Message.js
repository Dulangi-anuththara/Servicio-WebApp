import React, {Component} from 'react';
import { render } from 'react-dom'
import ConversationList from './ConversationList';
import {Launcher} from 'react-chat-window';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios' ;

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
            messageList: [],
            CustId:"",
            name:'Servicio'
          };
    }

    _onMessageWasSent(message) {
        this.setState({
          messageList: [...this.state.messageList, message]
        })
        const url=`http://localhost:5000/msg/add/${this.state.CustId}/${this.props.uid}`
    axios.post(url,message)
    .then(response=>{
      console.log(response.data);
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

      handleChatboxClick(e){
        const id = e.target.id
        console.log(e.target.title);
          this.setState({
            loading:true,
            openDialog:true,
            CustId:e.target.id,
            name:e.target.title
          },()=>{
            const URL =`http://localhost:5000/msg/${id}/${this.props.uid}`
            axios.get(URL)
            .then(response=>{
              console.log(response.data)
              this.setState({
                messageList:response.data,
                loading:false,
                openDialog:false,
                open:true
              })
            })
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
      <div style={{
        margin:20
      }}>
      <ConversationList 
      uid={this.props.uid}
      func={this.handleChatboxClick}
      />
    </div>
    <Launcher
            agentProfile={{
            teamName: this.state.name,
            imageUrl: "https://img.icons8.com/bubbles/50/000000/man-with-envelope.png"
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