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
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProfileScreen({ route }) {
  const [usernameText, setUsernameText] = useState();
  const [mailText, setMailText] = useState();
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  useEffect(() => {
    // Erişim tokenini her istekte ekleyin
    const fetchUserData = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await fetch('http://192.168.1.7:3000/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
      const data = await response.json();
      /*console.log(data);*/
      setUsernameText(data["username"]);
      setMailText(data["email"]);
    } else {
      console.error('Error fetching user data:', response.status);
    }
    } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      /*http://192.168.1.9:3000/edit*/
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch("http://192.168.1.7:3000/edit", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usernameText,
          mailText
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
    await AsyncStorage.clear();
    navigation.navigate("Login"); // 'LoginScreen' ekran adınız doğru olduğundan emin olun
  };
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const accessToken = await AsyncStorage.getItem('accessToken');
              const response = await fetch(
                /*http://192.168.1.9:3000/delete_account*/
                "http://192.168.1.7:3000/delete_account",{
                  method: "GET",
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                  },
                }
              );

              if (response.ok) {
                navigation.navigate("Welcome");
              } else {
                throw new Error("Failed to delete the account");
              }
            } catch (error) {
              console.error("Error deleting account:", error);
              alert("Failed to delete the account");
            }
          },
        },
      ]
    );
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
          onPress={handleDeleteAccount}
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
