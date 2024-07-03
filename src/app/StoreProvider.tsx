"use client";
import { getProfile } from "@/query/profile/getProfile";
import { useAppDispatch } from "@/redux/hooks";
import { fetchProfile } from "@/redux/profile/profileSlice";
import { AppDispatch, AppStore, makeStore } from "@/redux/store";
import { useRef } from "react";
import { Provider, useDispatch } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
