import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useResetRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../../store/atoms";
import Toast from "react-native-toast-message";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import AppleAuthButton from "../../components/AppleAuthButton";

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const resetUserState = useResetRecoilState(userAtom);
  const userState = useRecoilValue(userAtom);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={styles.header}>
        <Text style={styles.title}>HOME</Text>
        <GoogleAuthButton
          Trigger={({ onPress }) => <Button title="google" onPress={onPress} />}
        />
        <AppleAuthButton
          Trigger={({ onPress }) => <Button title="apple" onPress={onPress} />}
        />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
