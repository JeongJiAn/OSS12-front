import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Emailverification from './emailverification';
import Userinfo from './userinfo';

const Stack = createNativeStackNavigator();

function Signup(props){
    const serverUrl = props.serverUrl;
    const [userEmail, setUserEmail] = useState('');

    return(
        <Stack.Navigator>
            <Stack.Screen name='emailverification' options={{headerShown: false}}>
                {props => <Emailverification serverUrl={serverUrl} userEmail={userEmail} setUserEmail={setUserEmail}/>}
            </Stack.Screen>
            <Stack.Screen name='userinfo' options={{headerShown: false}}>
                {props => <Userinfo serverUrl={serverUrl} userEmail={userEmail}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );  
};

export default Signup;