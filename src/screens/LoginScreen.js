import {
  View,
  Text,
  Image,
  Alert,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Clear the input fields when the screen is focused
      setUsername("");
      setPassword("");
    }
  }, [isFocused]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    try {
      /*http://192.168.1.9:3000/login*/
      const response = await fetch("http://192.168.1.7:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const json = await response.json();
      const accessToken = json.access_token;

      if (response.status === 200) {
        await AsyncStorage.setItem("accessToken", accessToken);
        Alert.alert("Success", "Login successful", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Main"), // Navigate to HomeScreen
          },
        ]);
      } else {
        // Handle error messages
        if (json.message === "Account does not exist") {
          Alert.alert(
            "Don't you have an account ? ",
            "No account found with these credentials."
          );
        } else {
          Alert.alert(
            "Don't you have an account ?",
            "We couldn't found account with these credentials."
          );
        }
      }
    } catch (error) {
      console.error("Failed to login:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 30 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Welcome Back ! 👋
          </Text>

          <Text
            style={{
              fontSize: 13,
              fontWeight: "300",
              color: COLORS.black,
            }}
          >
            Sign in to access your account !
          </Text>
        </View>

        <View style={{ marginBottom: 25 }}>
          <View
            style={{
              width: "100%",
              height: 48,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
              backgroundColor: "#F6F5F5",
            }}
          >
            <TextInput
              placeholder="Enter your user name"
              placeholderTextColor="#B4B4B8"
              keyboardType="name-phone-pad"
              onChangeText={setUsername}
              value={username}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: "100%",
              height: 48,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
              backgroundColor: "#F6F5F5",
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#B4B4B8"
              secureTextEntry={!isPasswordShown}
              onChangeText={setPassword}
              value={password}
              style={{
                width: "100%",
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Login"
          filled
          onPress={handleLogin}
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Don't have an account ?{" "}
          </Text>
          <Pressable
            onPress={() => navigation.navigate("SignUp", { name: "User" })}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
