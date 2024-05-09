import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  Alert,
} from "react-native";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        /*http://192.168.1.9:3000/*/
        const response = await fetch("http://192.168.1.15:3000/");
        const json = await response.json();
      } catch (error) {
        Alert.alert("Error", "Unable to connect to the server");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.welcomeText}>{"Appleio"}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login", { name: "User" })}
          >
            <Text style={styles.buttonText2}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate("SignUp", { name: "User" })}
          >
            <Text style={styles.buttonText1}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B2C8BA",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.05,
  },
  logo: {
    width: width * 0.9,
    height: undefined,
    aspectRatio: 1,
  },
  welcomeText: {
    textAlign: "left",
    fontSize: 34,
    fontWeight: "500",
    color: "#070F2B",
    marginTop: 10,
    marginLeft: width * -0.21,
  },
  buttonContainer: {
    marginTop: height * 0.06,
    alignItems: "center", // Butonları dikey olarak ortala
  },
  loginButton: {
    backgroundColor: "white",
    borderRadius: 95,
    paddingVertical: 10,
    paddingHorizontal: width * 0.35,
    alignSelf: "center",
    marginBottom: 10, // Log in butonunun altına bir boşluk bırakır
  },
  signupButton: {
    backgroundColor: "#070F2B", // Renk değiştirilebilir
    borderRadius: 95,
    paddingVertical: 10,
    paddingHorizontal: width * 0.35,
    alignSelf: "center",
  },
  buttonText1: {
    color: "white",
    textAlign: "center",
    fontWeight: "300",
  },
  buttonText2: {
    color: "black",
    textAlign: "center",
    fontWeight: "300",
  },
});

export default WelcomeScreen;
