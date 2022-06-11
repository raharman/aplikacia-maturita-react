import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import TopScreen from "./screens/TopScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Uvod from "./screens/Uvod";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetScreen from "./screens/ResetScreen";
import SelectionScreen from "./screens/SelectionScreen";
import TopicScreen from "./screens/TopicScreen";
import { auth } from "./firebase";
import QuizScreen from "./screens/QuizScreen";
import "react-native-gesture-handler";
import "react-native-reanimated";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

  function HomeStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Selection"
          component={SelectionScreen}
          options={{
            tabBarShowLabel: false,
            title: "",
            headerStyle: {
              backgroundColor: "#4A7A96",
            },
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 32,
            },
          }}
        />

        <Stack.Screen
          name="Selected"
          component={TopicScreen}
          options={{
            tabBarShowLabel: false,
            title: "",
            headerStyle: {
              backgroundColor: "#4A7A96",
            },
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 32,
            },
          }}
        />

        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{
            tabBarShowLabel: false,
            title: "",
            headerStyle: {
              backgroundColor: "#4A7A96",
            },
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 32,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  if (isSignedIn == true) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "HomeScreen") {
                iconName = focused ? "ios-home" : "ios-home-outline";
              } else if (route.name === "Top") {
                iconName = focused ? "trophy" : "trophy-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              } else {
                iconName = focused ? "settings" : "settings-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#4a7a96",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="HomeScreen"
            options={{ headerShown: false, tabBarShowLabel: false }}
            component={HomeStackScreen}
          />
          <Tab.Screen
            name="Top"
            component={TopScreen}
            options={{
              tabBarShowLabel: false,
              title: "Rebríček",
              headerStyle: {
                backgroundColor: "#4A7A96",
              },
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 32,
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            options={{
              tabBarShowLabel: false,
              title: "Profil",
              headerStyle: {
                backgroundColor: "#4A7A96",
              },
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 32,
              },
            }}
            component={ProfileScreen}
          />
          <Tab.Screen
            name="Settings"
            options={{
              tabBarShowLabel: false,
              title: "Nastavenia",
              headerStyle: {
                backgroundColor: "#4A7A96",
              },
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 32,
              },
            }}
            component={SettingsScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Uvod"
            options={{ headerShown: false }}
            component={Uvod}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
            component={RegisterScreen}
          />
          <Stack.Screen
            name="Reset"
            options={{
              title: "Zabudol som heslo",
              headerTransparent: true,
              statusBarHidden: true,
              headerStyle: {
                borderBottomWidth: 0,
              },
            }}
            component={ResetScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
