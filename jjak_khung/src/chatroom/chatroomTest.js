import React, {Component, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
//디바이스 구별하는 모듈
import {getUniqueId} from 'react-native-device-info';
export default function(){

    const ChatScreen = () => {
        //node 서버 저장
        const [serverState, setServerState] = useState('Loading...');
        //인풋창 입력되는 메세지 저장
        const [messageText, setMessageText] = useState('');
        //서버에서 받아오는 메세지 저장
        const [serverMessages, setServerMessages] = useState([]);
        let userId = getUniqueId();

        const message={
            user:string,
            message:string
        }
        //웹소켓 저장
        const webSocket = useRef(null);
        useEffect(() => {
        //웹소켓 인스턴스,로컬 아이피 생성
        webSocket.current = new WebSocket(`ws://로컬호스트아이피`);
        //연결시 ServerState변경
        webSocket.current.onopen = () => {
            setServerState('Connected to the server');
            };
        //서버에서 메세지 올때 message에 리스트로 저장(x)
        webSocket.current.onmessage = e => {
            let parse = JSON.parse(e.data);
            //message.push(parse);
            //setServerMessages([...serverMessagesList]);
          };
        //서버에서 에러
        webSocket.current.onerror = e => {
            setServerState(e.message);
        }
        //servee close
        webSocket.current.onclose = e => {
            setServerState('Disconnected. Check internet or server.');
          }
          //?
          return () => {
            webSocket.current.close();
          };
        }, []);
    }
    
    return(
        <View>
            <Text>hi!</Text>
        </View>
    );
}