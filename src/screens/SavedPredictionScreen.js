import React, { useState, useEffect,useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation , useFocusEffect} from "@react-navigation/native";

export default function SavedPredictionScreen({ route }) {
  const { plantId } = route.params;
  console.log(plantId);
  const [ResultText, setResultText] = useState('');
  const [SuggestionText, setSuggestionText] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const [plantImage,setPlantImage] = useState('');
  const [plantResult,setPlantResult] = useState('');
  const [plantDate,setPlantDate] = useState('');
  const [plantName,setPlantName] = useState('');
  const [inputText, setInputText] = useState('');
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`http://192.168.1.7:3000/getplant/${plantId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPlantImage(data["image"]);
        setPlantResult(data["result"]);
        setPlantDate(data["date"]);
        setInputText(data["plantname"]);
        setPlantName(data["plantname"]);
        
      } else {
        console.error('Server response not OK:', response.status);
        const errorData = await response.json(); // Sunucudan gelen hata mesajını al
        console.error('Server error message:', errorData.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [plantId]); // Empty dependency array to run only once after the initial render

    // plantResult değerini ayarla
  useEffect(() => {
    if (plantResult === 'Black_Rot') {
      setResultText("Your plant has Black Rot disease.");
      setSuggestionText("You can change and renew the soil of your plant.");
    } else if (plantResult === 'Scab') {
      setResultText("Your plant has Scab disease.");
      setSuggestionText("Remove diseased leaves regularly. Keep the plant away from humid environments and excessive watering.");
    } else if (plantResult === 'Cedar_Rust') {
      setResultText("Your plant has Cedar Rust disease.");
      setSuggestionText(
        "Prevent the spread of the disease by regularly ventilating the plant's environment and exposing it to sunlight."
      );
    } else {
      setResultText("Your plant is Healthy.");
      setSuggestionText(
        "Your plant is in fine conditions. You can continue your habits."
      );
    }
  }, [plantResult]); // plantResult bağımlılığı ile tetiklenir


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleString('en-US', { weekday: 'short' });
    const month = date.toLocaleString('en-US', { month: 'short' });
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}, ${dayOfMonth} ${month} ${year}, ${hours}:${minutes}`;
  };

  const handleDelete = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`http://192.168.1.7:3000/deleteprediction/${plantId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Prediction Deleted Succesfully", [
          {
            text: "OK",

          },
        ]);
        navigation.navigate("My Plants");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error deleting saved prediction:", error);
      alert("Failed to delete saved prediction result");
    }
  };
  

  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch("http://192.168.1.7:3000/saveagain", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plantId,
          inputText
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Prediction Saved Succesfully", [
          {
            text: "OK",
          },
        ]);
        navigation.navigate("My Plants");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error saving prediction result:", error);
      alert("Failed to prediction result saving");
    }
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
      {/* Fotoğraf */}
      <View style={{ width: windowWidth - 40, height: windowWidth - 40, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center', top:30 }}>
        <Image source={{ uri: plantImage }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </View>

      {/* Text Input */}
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 3,
            borderColor: "green",
            borderRadius: 10,
            width: windowWidth - 40,
            marginTop: 45,
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
            placeholder="Enter your text here"
            value={inputText}
            onChangeText={setInputText}
          />
          {/* İkon */}
          <Image
            source={require("../../assets/editing.png")}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
        </View>
      </View>

      <View style={{ backgroundColor: '#E3EFE9', borderRadius: 10, padding: 10, width: windowWidth - 40, marginBottom: 5, marginTop: 5 }}>
      {/* Result */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green', marginBottom: 5 }}>Result</Text>
          <Text style={{ fontSize: 16 }}>{ResultText}</Text>
          
      </View>

      {/* Suggestions */}
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green', marginBottom: 5 }}>Suggestions</Text>
          <Text style={{ fontSize: 16 }}>{SuggestionText}</Text>
        </View>
      </View>


      <View style={{ justifyContent: 'flex-start',right:70 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'black' }}>Saved at:  {formatDate(plantDate)}</Text>
      </View>

      {/* Save ve Delete Butonları */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            marginRight: 5,
            padding: 10,
            backgroundColor: "green",
            borderRadius: 5,
            marginTop: 8,
          }}
          onPress={handleSave}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            Save Again
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, marginLeft: 5, padding: 10, backgroundColor: 'red', borderRadius: 5, marginTop: 8 }} onPress={handleDelete}>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Delete Result</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
