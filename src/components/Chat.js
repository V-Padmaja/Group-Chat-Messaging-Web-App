import React from "react";
import styled from "styled-components";

const rooms = [
  "general",
  "webDev",
  "fun",
  "admin"
];

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    background-color: lightgrey;
    border: 5px solid black;
    
`;

const SideBar = styled.div`
    height: 100%;
    width: 15%;
    border-right: 3px solid black;
    background-color: #95a6c2;
`;

const ChatPanel = styled.div`
    height: 100;
    width: 85%;
    display: flex;
    flex-direction: column;
    backgroung-color: #95a6c2;
    padding: 10px;
     
    overflow: auto;
`;

const BodyContainer = styled.div`
    width: 100%;
    height: 75%;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
    border-bottom: 3px solid black;
`;

const TextBox = styled.textarea`
    height: 45%;
    width: 100%;
`;

const ChannelInfo = styled.div`
    height: 15%;
    width: 100%;
    border-bottom: 5px #95b3c2;
    background-color: #95b3c2;
    font-size: 20px;
  font-weight: bold;
  
`;

const Row = styled.div`
    cursor: pointer;
`;

const Messages = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

function Chat(props) {

  function renderRooms(room) {
    const currentChat = {
      chatName: room,
      isChannel: true,
      receiverId: "",
    };

    return(
      <Row onClick={() => props.toggleChat(currentChat)} key={room}>
        {room}
      </Row>
    );
  }

  function renderUser(user) {
    if (user.id === props.yourId) {
      return (
        <Row key={user.id}>
          You: {user.username}
        </Row>
      );
    }

    const currentChat = {
      chatName: user.username,
      isChannel: false,
      receiverId: user.id,
    };
    
    return(
      <Row onClick={() => {
        props.toggleChat(currentChat);
      }} key={user.id}>
        {user.username}
      </Row>
    );

  };

  function renderMessages(message, index) {
    return (
      <div key={index}>
        <h3>{message.sender}</h3>
        <p>{message.content}</p>
      </div>
    );
  }

  let body;
  
  if(!props.currentChat.isChannel || props.connectedRooms.includes(props.currentChat.chatName)) {
    body = (
      <Messages>
        {props.messages.map(renderMessages)}
      </Messages>
    );
  } else {
    body = (
      <button onClick={() => props.joinRoom(props.currentChat.chatName)} > Join {props.currentChat.chatName}</button>
    );
  }

  function handleKeyPress(e) {
    if(e.key === "Enter") {
      props.sendMessage();
    }
  }

  return (
    <Container>
      <SideBar>
        <h3>Channels</h3>
        {rooms.map(renderRooms)}
        <h3>All Users</h3>
        {props.allUsers.map(renderUser)}
      </SideBar>
      <ChatPanel>
        <ChannelInfo>
          {props.currentChat.chatName}
        </ChannelInfo>
        <BodyContainer>
          {body}
        </BodyContainer>
        <TextBox
          value={props.message}
          onChange={props.handleMessageChange}
          onKeyPress={handleKeyPress}
          placeholder="type something to send message..."
        
        />
      </ChatPanel>
    </Container>
  );
};

export default Chat;