import ReactNativeRecoilPersist from "react-native-recoil-persist";
import { atom, selector, selectorFamily } from "recoil";

export const userAtom = atom({
  key: "user",
  default: {
    uid: "",
    email: "",
  },
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export type BookmarkType = {
  wisdomId: string;
  createdAt: string;
};

export const bookmarkListAtom = atom<BookmarkType[]>({
  key: "bookmarkList",
  default: [],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export type WisdomType = {
  author: string;
  title: string;
  content: string;
  createdAt: string;
  type: string;
};

export const wisdomListAtom = atom<WisdomType[]>({
  key: "wisdomList",
  default: [],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
