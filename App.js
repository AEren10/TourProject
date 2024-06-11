import React from "react";
import "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons"; // Düzeltildi

import { useState } from "react";

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

const TabNavigator = ({ saveTour }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Anasayfa") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Ara") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Oluştur") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Keşiflerim") {
            iconName = focused ? "paper-plane" : "paper-plane-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
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
      <Tab.Screen name="Oluştur" options={{ headerShown: false }}>
        {(props) => <CreateTourScreen {...props} saveTour={saveTour} />}
      </Tab.Screen>
      <Tab.Screen
        name="Keşiflerim"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const MainStackNavigator = () => {
  const [tourData, setTourData] = useState([]);

  const saveTour = (data) => {
    setTourData(data);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" options={{ headerShown: false }}>
        {(props) => <TabNavigator {...props} saveTour={saveTour} />}
      </Stack.Screen>
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
      <Stack.Screen name="FavoritesScreen" options={{ headerShown: false }}>
        {(props) => <FavoritesScreen {...props} tourData={tourData} />}
      </Stack.Screen>
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
