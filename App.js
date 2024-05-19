import React from "react";
import "react-native-reanimated";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./pages/HomeScreen";
import TourScreen from "./pages/TourScreen";

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}

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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
