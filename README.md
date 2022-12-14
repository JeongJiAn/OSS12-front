# OSS12-front 
2022 오픈소스SW개발 프로젝트 12조 frontend

<br><br>
## About the project
프로젝트 소개:
* 채팅을 통해 실시간 소통이 가능한 어플리케이션
* 멘토와 멘티 간의 1:n 채팅 서비스
* 원하는 과목과 교수님, 멘토까지 선택 가능
<br>
짝khu웅 프로젝트는 React-Native와 Spring으로 구현되었습니다.
특정 과목에 몰려있는 기존의 멘토링과 멘토 선택의 어려움 그리고 낮은 참여도와 적극도 같은 문제들을 해결하기 위한 멘토링 서비스 어플리케이션입니다. 실시간으로 채팅이 가능하며 자신이 수강하는 과목과 교수님을 선택한 후에 개인의 취향에 맞는 멘토를 선택하여 채팅할 수 있습니다.
또한 소융대 학생들의 적극적인 이용을 기대하고자 크레딧 기능을 활용하였습니다.

<br><br>

#### Software architecture

![arc](https://user-images.githubusercontent.com/72684838/205894223-c7f62741-aa85-4351-a418-59d6b2f78d3d.png)


<br><br>

## Getting Started(Installation)
- FE : React Native (npm 8.15.0, react native 0.68.2)
1. 라이브러리 다운
```
npm installs 

// react navigation
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context

//stack navigator
npm install @react-navigation/native-stack

//drawer navigator
npm install @react-navigation/drawer
npm install react-native-gesture-handler react-native-reanimated

//dropdown picker
npm i react-native-dropdown-picker
```
react-navigation을 android에서 사용하기 위해서는 아래의 코드를 android/app/src/main/java/<your package name>/MainActivity.java 파일에 추가해주어야 한다.
```
// MainActivity.java 파일 상단
import android.os.Bundle;
// MainActivity Class 내부
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}
```

2. React native 시작
```
// Terminal 1
npm start
// Terminal 2 (new Terminal)
react-native run-android // for android
```
Application의 경우 .apk파일을 실행해주면됩니다.
 
<br><br>

## usage
#### Flow Chart
![flow chart](https://user-images.githubusercontent.com/113916318/205669810-8458f053-1d2b-4b43-b818-8a6760f3c9fb.png)

#### E-R Diagram
![er](https://user-images.githubusercontent.com/72684838/205894987-82a47000-20c8-427d-8365-006f307c7d34.png)


<br><br>
## Roadmap
- [x] UI Change
- [x] Add Chatroom
- [x] Add Login Application
- [x] Add Subject List

<br><br>
 ## License
 Distributed under the MIT License. [LICENSE.txt](https://github.com/JeongJiAn/OSS12-front/files/10165693/LICENSE.txt)

<br><br>
## Contact
Email: jian0219@khu.ac.kr
