import React from "react";
import "react-native-reanimated";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./pages/HomeScreen";
import TourScreen from "./pages/TourScreen";
import ProfileScreen from "./pages/ProfileScreen";
import TourComponent from "./pages/json";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="TourScreen"
          component={TourScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="aaaa"
          component={TourComponent}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
