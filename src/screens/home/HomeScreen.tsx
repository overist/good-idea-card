import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  Image,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useResetRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../../store/atoms";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const resetUserState = useResetRecoilState(userAtom);
  const userState = useRecoilValue(userAtom);

  const handleLogout = async () => {
    try {
      resetUserState();
      await auth().signOut();
      Toast.show({
        type: "success",
        text1: "로그아웃 성공",
        text2: `로그아웃 되었습니다.`,
      });
      navigation.replace("login");
    } catch (error) {
      console.log("logout error", error.message);
    }
  };

  const asd = () => {
    Toast.show({
      type: "success",
      text1: "로그인 성공",
      text2: `${userState.email}으로 로그인 되었습니다.`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>TICON CHAT</Text>
        <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
          <Text style={styles.logOutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userinfoContainer}>
        <Image
          source={{ uri: userState.imageUrl }}
          style={{ width: 150, height: 150, borderRadius: 100 }}
        />
        <Text style={styles.userinfoHead}>유저 정보</Text>

        <Pressable onPress={asd}>
          <Text>asd</Text>
        </Pressable>
        <Text style={styles.userinfoText}>메일: {userState.email}</Text>
        <Text style={styles.userinfoText}>유져명: {userState.username}</Text>
        <Text style={styles.userinfoText}>
          성별: {userState.gender === 1 ? "남자" : "여자"}
        </Text>
      </View>
      <View style={styles.matchStartContainer}>
        <TouchableOpacity
          style={styles.matchStartButton}
          onPress={() => navigation.push("matching")}
        >
          <Text style={styles.logOutText}>랜덤 매칭 시작</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 20 : 0,
    backgroundColor: "#f7f8fa",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: 35,
    fontWeight: "600",
  },
  logOutText: {
    color: "white",
    fontSize: 20,
  },
  logOutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 4,
  },
  userinfoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  userinfoHead: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "600",
  },
  userinfoText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  matchStartContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  matchStartButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 4,
  },
});