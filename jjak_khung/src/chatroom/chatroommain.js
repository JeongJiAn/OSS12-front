import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';

function ChatroomMain(props) {
  const navigation = useNavigation();
  const userInfo = props.userInfo;
  const chatroom = props.chatroom;
  const scrollViewRef = useRef();
  const [messageList, setMessageList] = useState([])
  const webSocket = useRef(null);
  let msgContent = '';
  const [webSocketReady, setWebSocketReady] = useState(false);

  useEffect(() => {
    if (!webSocketReady) {
      console.log(chatroom);
      if (Object.keys(chatroom).length !== 0) {
        console.log("in");
        console.log(chatroom);
        webSocket.current = io('http://107.21.124.128:23023/chat');
        setWebSocketReady(true);
        webSocket.current.on('connect', () => {
          let data = {
            type: 'Welcome',
            name: userInfo.user_name,
            msg: "enter",
            room: chatroom.chat_number
          }
          webSocket.current.emit('welcome', data);
          console.log('Connected Server');
        });
  
        webSocket.current.on('message', e => {
          let list = messageList;
          list.push(e);
          setMessageList(list);
          forceRender();
        });
  
        webSocket.current.on('disconnect', () => {
          console.log("Disconnected");
        });
      }
    }
  })
  
  function forceRender() {
    setMessageList([...messageList]);
  }

  function trySendMessage() {
    if (msgContent !== '') {
      let msg = {
        name: userInfo.user_name,
        msg: msgContent
      }
      webSocket.current.emit('message', msg);
      msgContent = '';
    }
  }

  function ChatroomHeader() {
    return (
      <View style={styles.chatroomHeaderWrap}>
        <View style={styles.chatroomHeader}>
          <TouchableOpacity
            style={styles.quitButton}
            onPress={() => {
                const room = {};
                props.setChatroom(room);
                webSocket.current.disconnect();
                navigation.pop();
              }}>
            <Text style={{color: '#ffffff', fontSize: 20}}>나가기</Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{color: '#ffffff', fontSize: 30}}>채팅방</Text>
          </View>
          <TouchableOpacity
            style={styles.memberListButton}
            onPress={() => navigation.openDrawer()}>
            <Text style={{color: '#ffffff', fontSize: 30}}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function MyChat(msg) {
    return (
      <View style={styles.myChatWrap}>
        <View style={styles.myChat}>
          <Text>
            {msg.msg}
          </Text>
        </View>
      </View>
    );
  }

  function OthersChat(msg) {
    return (
      <View style={styles.othersChatWrap}>
        <View
          style={{backgroundColor: 'red', padding: 5, alignSelf: 'flex-start'}}>
          <Text>{msg.name}</Text>
        </View>
        <View style={styles.othersChat}>
          <Text>
            {msg.msg}
          </Text>
        </View>
      </View>
    );
  }

  function Chat(msg) {
    if (msg.msg.name === userInfo.user_name) {
      return (
        <MyChat msg={msg.msg.msg} name={msg.msg.name}/>
      )
    } else {
      return (
        <OthersChat msg={msg.msg.msg} name={msg.msg.name}/>
      )
    }
  }

  function MessageList() {
    if (messageList.length !== 0) {
      console.log(messageList);
      return (
        <View>
          {messageList.map((msg, index) => (
            <Chat key={index} msg={msg}/>
          ))}
        </View>
      )
    } else {
      return null;
    }
  }

  function ChatArea() {
    return (
      <ScrollView
        style={styles.chatAreaWrap}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        <MessageList />
      </ScrollView>
    );
  }

  function ChatroomFooter() {
    return (
      <View style={styles.chatroomFooterWrap}>
        <TouchableOpacity style={styles.imageSendButton}>
          <Text>사진</Text>
        </TouchableOpacity>
        <View style={styles.messageInputWrap}>
          <TextInput
            style={styles.messageInput}
            multiline={true}
            onChangeText={(text) => msgContent = text}
          />
        </View>
        <TouchableOpacity
          style={styles.messageSendButton}
          onPress={() => trySendMessage()}>
          <Text>전송</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.chatroomWrap}>
      <ChatroomHeader />
      <ChatArea />
      <ChatroomFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  chatroomWrap: {
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  chatroomHeaderWrap: {
    height: 100,
    backgroundColor: '#6667AB',
    justifyContent: 'flex-end',
  },
  chatroomHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quitButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    marginHorizontal: 20,
    marginTop: 10,
  },
  memberListButton: {
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20,
  },
  chatAreaWrap: {
    margin: 10,
  },
  myChatWrap: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  myChat: {
    width: 200,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#2ecc70',
    borderColor: '#2ecc70',
  },
  othersChatWrap: {
    marginBottom: 15,
  },
  othersChat: {
    width: 200,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#ededed',
    borderColor: '#ededed',
  },
  chatroomFooterWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    paddingBottom: 20,
    backgroundColor: '#6667AB',
  },
  imageSendButton: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cecece',
    borderColor: '#cecece',
  },
  messageInputWrap: {
    width: 230,
    height: 60,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#dddddd',
    borderColor: '#dddddd',
  },
  messageInput: {
    marginBottom: 5,
  },
  messageSendButton: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cecece',
    borderColor: '#cecece',
  },
});

export default ChatroomMain;
