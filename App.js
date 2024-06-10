import React from "react";
import "react-native-reanimated";
import { Text, View } from "react-native";

import HomeScreen from "./pages/HomeScreen";
import TourScreen from "./pages/TourScreen";
import ProfileScreen from "./pages/ProfileScreen";
import CreateTourScreen from "./pages/CreateTourScreen";
import MapScreen from "./pages/MapScreen";
import FavoritesScreen from "./pages/FavoritesScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import store from "./context/store";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Anasayfa"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Ara"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Oluştur"
        component={CreateTourScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Keşiflerim"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator for screens that should be navigated to
const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TourScreen"
        component={TourScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
