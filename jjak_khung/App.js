import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './src/signin/signin';
import Signup from './src/signup/signup';

const Stack = createNativeStackNavigator();

const App = () => {
  const serverUrl = 'http://127.0.0.1:8080/';
  const entryDeadline = { m: 9, d: 7 };
  const [semTime, setSemTime] = useState('');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userInfo, setUserInfo] = useState({
    user_name: '',
    user_point: -1,
    user_recom: -1,
  });

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

  function UserSignin (user) {
    setUserId({id: user.user_id});
    setUserPassword({password: user.user_password});
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
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
});

export default App;