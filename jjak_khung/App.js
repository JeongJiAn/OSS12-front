<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './src/signin/signin';
import Signup from './src/signup/signup';
=======
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from './src/signin/signin';
import Signup from './src/signup/signup';
import Termtime from './src/termtime/termtime';
import Entrytime from './src/entrytime/entrytime';
import Chatroom from './src/chatroom/chatroom';
import allsubject from './src/json/subject.json';
>>>>>>> 14708311788b96d330e0bbf8c30f1fbe098ac627

const Stack = createNativeStackNavigator();

const App = () => {
  const serverUrl = 'http://localhost:8080/';
  const entryDeadline = {m: 9, d: 7}; // 9 7
  const [semTime, setSemTime] = useState('');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
<<<<<<< HEAD
=======
  const [subjectList, setSubjectList] = useState([]);
>>>>>>> 14708311788b96d330e0bbf8c30f1fbe098ac627
  const [userInfo, setUserInfo] = useState({
    user_name: '',
    user_point: -1,
    user_recom: -1,
  });
<<<<<<< HEAD

  useEffect(() => {
    const nowTime = new Date();
    const month = nowTime.getMonth() + 1;
    const date = nowTime.getDate();
    if (month < entryDeadline.m || (month === entryDeadline.m && date <= entryDeadline.d)) {
      setSemTime('entrytime');
    } else {
      setSemTime('termtime');
    }
  }, []);
=======
>>>>>>> 14708311788b96d330e0bbf8c30f1fbe098ac627

  useEffect(() => {
    const nowTime = new Date();
    const month = nowTime.getMonth() + 1;
    const date = nowTime.getDate();
    if (
      month < entryDeadline.m ||
      (month === entryDeadline.m && date <= entryDeadline.d)
    ) {
      setSemTime('entrytime');
    } else {
      setSemTime('termtime');
    }
    const getSubjectListApi = async () => {
      try {
        const callUrl = serverUrl + 'board/subject/list';
        const subjectListResponse = await fetch(callUrl);
        const subjectListJson = await subjectListResponse.json();
        setSubjectList(subjectListJson);
      } catch (e) {
        console.log(e);
      }
    };
    getSubjectListApi();
  }, []);

  function UserSignin(user) {
    setUserId({id: user.user_id});
    setUserPassword({password: user.user_password});
<<<<<<< HEAD
    setUserInfo({ ...userInfo, user_name: user.user_name, user_point: user.user_point, user_recom: user.user_recom, user_number: user.user_number });
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='signin'>
        <Stack.Screen name='signin' options={{headerShown: false}}>
          {props => <Signin serverUrl={serverUrl} semTime={semTime} UserSignin={UserSignin} />}
        </Stack.Screen>
        <Stack.Screen name='signup'>
          {props => <Signup serverUrl={serverUrl} />}
=======
    setUserInfo({
      ...userInfo,
      user_name: user.user_name,
      user_point: user.user_point,
      user_recom: user.user_recom,
      user_number: user.user_number,
    });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signin">
        <Stack.Screen name="signin" options={{headerShown: false}}>
          {props => (
            <Signin
              serverUrl={serverUrl}
              semTime={semTime}
              UserSignin={UserSignin}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="signup">
          {props => <Signup serverUrl={serverUrl} />}
        </Stack.Screen>
        <Stack.Screen name="entrytime" options={{headerShown: false}}>
          {props => (
            <Entrytime
              subjectList={subjectList}
              userInfo={userInfo}
              serverUrl={serverUrl}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="termtime" options={{headerShown: false}}>
          {props => <Termtime userInfo={userInfo} serverUrl={serverUrl} />}
        </Stack.Screen>
        <Stack.Screen name="chatroom" options={{headerShown: false}}>
          {props => <Chatroom userInfo={userInfo} serverUrl={serverUrl} />}
>>>>>>> 14708311788b96d330e0bbf8c30f1fbe098ac627
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({});

export default App;