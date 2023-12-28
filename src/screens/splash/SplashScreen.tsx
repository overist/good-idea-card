import { StyleSheet, Text, View } from "react-native";
import Navigation from "../../navigation/Navigation";
import React, { useEffect, useState } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { userAtom, bookmarkListAtom, BookmarkType } from "../../store/atoms";
import { useSetRecoilState, useResetRecoilState } from "recoil";

export default function SplashScreen() {
  const setUserState = useSetRecoilState(userAtom);
  const resetUserState = useResetRecoilState(userAtom);
  const setBookmarkListState = useSetRecoilState(bookmarkListAtom);
  const resetBookmarkListState = useResetRecoilState(bookmarkListAtom);

  useEffect(() => {
    async function prepareApp() {
      await ExpoSplashScreen.preventAutoHideAsync();
      try {
        const userId = auth().currentUser?.uid;
        const userDoc = await firestore().collection("users").doc(userId).get();

        if (userDoc.data()?.email) {
          console.log("app firestore user check", userDoc);

          setUserState({
            uid: userId,
            email: userDoc.data()?.email,
          });

          // 유저의 개인 북마크리스트 조회
          const bookmarkListSnapshot = await firestore()
            .collection("bookmarkList")
            .doc(userId)
            .collection("datas")
            .get();

          // 북마크리스트가 존재할 경우
          if (!bookmarkListSnapshot.empty) {
            const bookmarkList = [];

            // 각 문서의 데이터 (북마크들) 조회
            for (const doc of bookmarkListSnapshot.docs) {
              const item = doc.data();

              const bookmark: BookmarkType = {
                wisdomId: item.createdAt,
                createdAt: item.wisdomId,
              };

              bookmarkList.push(bookmark);
            }

            // 전역 상태에 북마크리스트 저장
            setBookmarkListState(bookmarkList);
          }
        } else {
          console.log("No user data found!");

          resetUserState();
          resetBookmarkListState();
        }
      } catch (error) {
        console.error(error);

        resetUserState();
        resetBookmarkListState();
      } finally {
        await ExpoSplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, []);

  return <Navigation />;
}
