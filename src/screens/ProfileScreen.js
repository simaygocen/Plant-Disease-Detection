import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  Image,
  Modal,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ route }) {
  const [usernameText, setUsernameText] = useState();
  const [mailText, setMailText] = useState();
  const [profileImage, setProfileImage] = useState(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [isUsernameModalVisible, setUsernameModalVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");

  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch("http://192.168.1.9:3000/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsernameText(data["username"]);
          setMailText(data["email"]);
          setProfileImage(data["profilePicture"]);
        } else {
          console.error("Error fetching user data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch("http://192.168.1.9:3000/edit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameText,
          mailText,
          profileImage,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "User Updated Successfully", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("Profile", {
                screen: "Profile",
              }),
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
              const accessToken = await AsyncStorage.getItem("accessToken");
              const response = await fetch(
                "http://192.168.1.9:3000/delete_account",
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
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

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../assets/userPic.png")
              }
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.profileName}
              placeholder="Username"
              value={usernameText}
              editable={false}
            />
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setUsernameModalVisible(true);
                setOriginalUsername(usernameText); // Save original username value
              }}
            >
              <FeatherIcon name="edit-3" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.profileAddress}
              placeholder="Email"
              value={mailText}
              editable={false}
            />
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEmailModalVisible(true);
                setOriginalEmail(mailText); // Save original email value
              }}
            >
              <FeatherIcon name="edit-3" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <TouchableOpacity onPress={handleDeleteAccount} style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}>
                <FeatherIcon color="#fff" name="trash-2" size={20} />
              </View>

              <Text style={styles.rowLabel}>Delete your account</Text>

              <View style={styles.rowSpacer} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
                <FeatherIcon color="#fff" name="log-out" size={20} />
              </View>
              <Text style={styles.rowLabel}>Log out</Text>
              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Username Modal */}
      <Modal
        visible={isUsernameModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setUsernameModalVisible(false);
          setUsernameText(originalUsername); // Restore original username if modal is closed
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Username</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter new username"
              value={usernameText}
              onChangeText={setUsernameText}
            />

            <TouchableOpacity
              onPress={() => {
                setUsernameModalVisible(false);
                setIsEditingUsername(true);
                handleSave();
              }}
              style={styles.row}
            >
              <Text style={styles.rowLabel}> Save </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setUsernameModalVisible(false);
                setUsernameText(originalUsername); // Restore original username if user cancels
              }}
              style={styles.row}
            >
              <Text style={styles.rowLabel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Email Modal */}
      <Modal
        visible={isEmailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setEmailModalVisible(false);
          setMailText(originalEmail); // Restore original email if modal is closed
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Email</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter new email"
              value={mailText}
              onChangeText={setMailText}
            />

            <TouchableOpacity
              onPress={() => {
                setEmailModalVisible(false);
                setIsEditingEmail(true);
                handleSave();
              }}
              style={styles.row}
            >
              <Text style={styles.rowLabel}> Save </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEmailModalVisible(false);
                setMailText(originalEmail); // Restore original email if user cancels
              }}
              style={styles.row}
            >
              <Text style={styles.rowLabel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profile: {
    padding: 24,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  profileAvatar: {
    width: 160,
    height: 160,
    borderRadius: 36,
    marginTop: 60,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
    flex: 1,
  },
  profileAddress: {
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
    flex: 1,
  },
  editButton: {
    right: 50,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  modalInput: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
});
