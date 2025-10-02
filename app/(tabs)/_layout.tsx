import React from "react";
import { Tabs } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarLabel: "",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Fontisto name="tinder" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="star" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
