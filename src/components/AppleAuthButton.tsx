import React from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { handleAuth } from "../common/handleAuth";
import { userAtom } from "../store/atoms";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import firestore from "@react-native-firebase/firestore";
import { appleAuth } from "@invertase/react-native-apple-authentication";

export default function AppleAuthButton({ Trigger }) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const resetUserState = useResetRecoilState(userAtom);
  const setUserState = useSetRecoilState(userAtom);

  const signIn = async () => {
    try {
      // Apple 로그인 수행
      const appleAuthResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Apple 로그인이 성공하면 Firebase로 인증 정보를 보냅니다
      const credential = auth.AppleAuthProvider.credential(
        appleAuthResponse.identityToken,
        appleAuthResponse.nonce
      );

      const userCredential = await auth().signInWithCredential(credential);
      const user = userCredential.user;

      // firestore에 user 정보가 있는지 확인
      const userDoc = await firestore().collection("users").doc(user.uid).get();
      if (userDoc.data().email) {
        handleAuth(user, setUserState, resetUserState, navigation);
        return;
      }

      // firestore에 user 정보 저장
      await firestore().collection("users").doc(user.uid).set({
        email: user.email,
      });

      handleAuth(user, setUserState, resetUserState, navigation);
    } catch (error) {
      console.error(error);
    }
  };

  return <Trigger onPress={signIn} />;
}
