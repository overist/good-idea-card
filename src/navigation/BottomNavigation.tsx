import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/home/HomeScreen";
import BookmarkScreen from "../screens/bookmark/BookmarkScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 스택스크린 : 하나의 바텀 탭 안에 포함된 모든 스크린의 모음
// 탭네비게이터 : 바텀 탭을 구성하는 네비게이터

const HomeStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();
const BookmarkStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ANCHOR 첫번째 탭 - 홈 바텀 네비게이션을 가리키는 스크린들
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

// ANCHOR 두번째 탭 - 북마크 바텀 네비게이션을 가리키는 스크린들
function BookmarkStackScreen() {
  return (
    <BookmarkStack.Navigator>
      <BookmarkStack.Screen name="bookmark" component={BookmarkScreen} />
    </BookmarkStack.Navigator>
  );
}

// ANCHOR 세번째 탭 - 세팅 바텀 네비게이션을 가리키는 스크린들
function SettingStackScreen() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="setting" component={SettingScreen} />
    </SettingStack.Navigator>
  );
}

// ANCHOR 바텀 탭 네비게이션
export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarIcon: ({ focused, size, color }) => {
          let iconName: any = "";
          if (route.name === "homeStack") {
            iconName = focused ? "home-sharp" : "home-outline";
            color = focused ? "#000" : "#ccc";
          } else if (route.name === "bookmarkStack") {
            iconName = focused ? "bookmark-sharp" : "bookmark-outline";
            color = focused ? "#000" : "#ccc";
          } else if (route.name === "settingStack") {
            iconName = focused ? "settings-sharp" : "settings-outline";
            color = focused ? "#000" : "#ccc";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="homeStack" component={HomeStackScreen} />
      <Tab.Screen name="bookmarkStack" component={BookmarkStackScreen} />
      <Tab.Screen name="settingStack" component={SettingStackScreen} />
    </Tab.Navigator>
  );
}
