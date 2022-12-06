import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {useWindowDimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChatroomMain from './chatroommain';
import MemberList from './memberlist';

const Drawer = createDrawerNavigator();

function Chatroom(props) {
  const route = useRoute();
  const serverUrl = props.serverUrl;
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;
  const userInfo = props.userInfo;
  const [chatroom, setChatroom] = useState({});

  useEffect(() => {
    console.log(chatroom);
    setChatroom({
      chat_number: route.params.chat_number,
      subject_number: {
        subject_name: route.params.subject_number.subject_name,
        subject_number: route.params.subject_number.subject_number,
        subject_professor: route.params.subject_number.subject_professor
      }
    })
    console.log(chatroom);
  }, []);

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      initialRouteName="chatroommain"
      defaultStatus="closed"
      screenOptions={{
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: isLargeScreen ? null : {width: '50%'},
        overlayColor: 'transparent',
        drawerPosition: 'right',
      }}
      drawerContent={props => (
        <MemberList chat_number={route.params.chat_number} serverUrl={serverUrl} />
      )}>
      <Drawer.Screen name="chatroommain" options={{headerShown: false}}>
        {props => (
          <ChatroomMain
            chatroom={chatroom}
            setChatroom={setChatroom}
            serverUrl={serverUrl}
            userInfo={userInfo}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="memberlist" options={{headerShown: false}}>
        {props => (
          <MemberList
            chat_number={chatroom.chat_number}
            serverUrl={serverUrl}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default Chatroom;
