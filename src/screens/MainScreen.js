import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import Profile from "./ProfileScreen";
import DiseaseScreen from "./DiseaseScreen";
import HomeScreen from "./HomeScreen";
import PlantsScreen from "./PlantScreen"; 
import PredictScreen from "./PredictScreen";
import SavedPredictionScreen from "./SavedPredictionScreen";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(0);

  const handleHomePress = () => {
    // This function will be called when the Home tab is pressed
    // Reset the state to simulate a screen refresh
    setRefresh((prev) => prev + 1);
  };

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
            case "My Plants":
              iconName = require("../../assets/leaf.png");
              style = { width: 32, height: 32, opacity: focused ? 1 : 0.5 }; // Slightly larger and rounded
              break;
            case "Diseases":
              iconName = require("../../assets/mikrop.png");
              style = { width: 35, height: 35, opacity: focused ? 1 : 0.5 }; // Change opacity based on focus
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
        listeners={{
          tabPress: handleHomePress, // Call handleHomePress on tab press
        }}
        options={{ headerShown: false }}
      >
        {() => <HomeScreen refresh={refresh} />}
      </Tab.Screen>
      <Tab.Screen
        name="Diseases"
        component={DiseaseScreen} // Ensure this is correctly mapped to your Diagnose screen
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="My Plants"
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
      <Tab.Screen
        name="SavedPredictionScreen"
        component={SavedPredictionScreen} // Add the component for the Predict screen
        options={{ headerShown: false, tabBarButton: () => null }} // Tabbar'da göstermek istemediğimiz için tabBarButton'ı null yapıyoruz
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
