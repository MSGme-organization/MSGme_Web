"use client";
import { getProfile } from "@/query/profile/getProfile";
import { useAppDispatch } from "@/lib/redux/hooks";
import { fetchProfile } from "@/lib/redux/profile/profileSlice";
import { AppDispatch, AppStore, makeStore } from "@/lib/redux/store";
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
