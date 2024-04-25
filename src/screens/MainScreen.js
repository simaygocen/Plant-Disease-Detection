import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import Profile from "./ProfileScreen";
import HomeScreen from "./HomeScreen";
import PlantsScreen from "./PlantScreen"; // Assuming you have a PlantsScreen component
import PredictScreen from "./PredictScreen";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let style = {};

          switch (route.name) {
            case "Home":
              iconName = require("../../assets/home.png");
              style = {
                width: 27,
                height: 27,
                tintColor: "black",
                opacity: focused ? 1 : 0.5,
              };
              break;
            case "Plants":
              iconName = require("../../assets/leaf.png");
              style = { width: 32, height: 32, opacity: focused ? 1 : 0.5 }; // Slightly larger and rounded
              break;
            case "Diagnose":
              iconName = require("../../assets/plantDiagnose.png");
              style = { width: 40, height: 40, opacity: focused ? 1 : 0.5 }; // Change opacity based on focus
              break;
            case "Profile":
              iconName = require("../../assets/user.png");
              style = {
                width: 28,
                height: 28,
                opacity: focused ? 1 : 0.5,
              };
              break;
          }

          return <Image source={iconName} style={style} />;
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "blue",
        tabBarStyle: {
          display: "flex",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Diagnose"
        component={Profile} // Ensure this is correctly mapped to your Diagnose screen
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Plants"
        component={PlantsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Predict"
        component={PredictScreen} // Add the component for the Predict screen
        options={{ headerShown: false, tabBarButton: () => null }} // Tabbar'da göstermek istemediğimiz için tabBarButton'ı null yapıyoruz
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
