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

export type BookMarkType = {
  id: number;
  content: string;
  author: string;
};

export const bookMarkListAtom = atom<BookMarkType[]>({
  key: "bookMarkList",
  default: [],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
