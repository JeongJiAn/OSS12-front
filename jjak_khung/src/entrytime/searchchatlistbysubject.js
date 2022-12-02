import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  creteNativeStackNavigator,
} from '@react-navigation/native-stack';
import allSubjectList from './../json/subject.json';

function SearchChatListbySubject(props) {
  const navigation = useNavigation();
  const subjectList = props.subjectList;
  const [subjectNameList, setSubjectNameList] = useState([]);

  function makeSubjectNameList() {
    const tempSubjectList = [];
    for (const subject of subjectList) {
      var dupplicated = false;
      for (const item of tempSubjectList) {
        if (item === subject.subject_name) {
          dupplicated = true;
          break;
        }
      }
      if (dupplicated === false) {
        tempSubjectList.push(subject.subject_name);
      }
    }
    setSubjectNameList(tempSubjectList);
  }

  useEffect(() => {
    makeSubjectNameList();
  }, []);

  return (
    <FlatList
      keyExtractor={item => item.toString()}
      data={subjectNameList}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.subjectWrap}
          onPress={() => {
            props.setSubject(item);
            navigation.navigate('searchchatlistbyprof');
          }}>
          <Text style={styles.subjectText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  chatlistSubjectWrap: {
    width: '100%',
    height: '100%',
    paddingLeft: '7%',
    paddingRight: '7%',
    paddingTop: '15%',
    backgroundColor: '#f8f9ff',
  },
  subjectWrap: {
    borderBottomWidth: 1,
    borderColor: '#8398D1',
  },
  subjectTextWrap: {
    justifyContent: 'center',
  },
  subjectText: {
    fontSize: 18,
    color: '#000000',
    padding: 10,
  },
});

export default SearchChatListbySubject;
