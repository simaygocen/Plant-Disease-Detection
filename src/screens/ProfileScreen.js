import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen({ route }) {
  const [usernameText, setUsernameText] = useState();
  const [mailText, setMailText] = useState();
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.1.9:3000/dashboard");
        const data = await response.json();
        console.log(data);
        setUsernameText(data["username"]);
        setMailText(data["email"]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("http://192.168.1.9:3000/edit", {
        method: "POST",
        body: JSON.stringify({
          username: usernameText,
          email: mailText,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "User Updated Succesfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("ProfileScreen"), // Navigate to HomeScreen
          },
        ]);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Failed to update user");
    }
  };
  const handleLogout = async () => {
    navigation.navigate("Login"); // 'LoginScreen' ekran adınız doğru olduğundan emin olun
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* Text Input alanı */}
      <View style={{ width: windowWidth - 40, marginTop: 30 }}>
        {/* Username Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 3,
            borderColor: "green",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              fontSize: 18,
              fontWeight: "bold",
              padding: 10,
              height: 50,
              textAlign: "center",
            }}
            placeholder="Username"
            value={usernameText}
            onChangeText={setUsernameText}
          />
          <Image
            source={require("../../assets/editing.png")}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
        </View>
        {/* Email Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 3,
            borderColor: "green",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              fontSize: 18,
              fontWeight: "bold",
              padding: 10,
              height: 50,
              textAlign: "center",
            }}
            placeholder="Email"
            value={mailText}
            onChangeText={setMailText}
          />
          <Image
            source={require("../../assets/editing.png")}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
        </View>
      </View>

      {/* Butonlar Yatay Olarak */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around", // Butonlar arasında boşluk bırakır
          width: windowWidth - 40, // View genişliğini ayarla
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: 70,
            padding: 10,
            backgroundColor: "green",
            borderRadius: 5,
          }}
          onPress={handleSave}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 70,
            padding: 10,
            backgroundColor: "green",
            borderRadius: 5,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            Delete Your Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 70,
            padding: 10,
            backgroundColor: "green",
            borderRadius: 5,
          }}
          onPress={handleLogout}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
