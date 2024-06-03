import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import TourCard from "../component/Cards/TourCard"; // TourCard bileşeninin doğru yolu burada olmalı

const API_KEY = "AIzaSyBfGpyUzM8aM059UtpeCmpUzWxMiwev9n0"; // Google Places API anahtarınızı buraya ekleyin

const fetchPlaces = async (city) => {
  const placeId = "ChIJz22UC9q3yhQR4RqiiMp9vio"; // Yerinizin place_id'si
  const apiKey = "YOUR_API_KEY"; // Google Places API anahtarınız

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_address,photos,reviews&key=${API_KEY}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // İstek başarılı oldu, JSON verisini kullanabilirsiniz
    })
    .catch((error) => {
      // İstekte hata oluştu
      console.error("There was a problem with your fetch operation:", error);
    });
};

const ProfileScreen = () => {
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false); // Yeni state

  fetchPlaces();
  // Eğer fetched true ise ve places state'i güncellenmişse FlatList'i render et

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şehir İsmi Girin:</Text>

      {/* renderList fonksiyonunu çağır */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default ProfileScreen;
