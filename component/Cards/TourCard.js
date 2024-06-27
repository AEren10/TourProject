// CardComponent.js
import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const API_KEY = "YOUR_API_KEY";

const TourCard = ({ targetScreen, stop, index }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    //navigation.navigate(targetScreen, params);

    console.log(stop, "carda bastın suan");
  };
  const photoCache = {};
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (stop.place_id) {
      fetchPhotos(stop.place_id);
    }
  }, [stop.place_id]);

  const fetchPhotos = async (place_id) => {
    if (photoCache[place_id]) {
      setPhotos(photoCache[place_id]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=photos&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.result.photos && data.result.photos.length > 0) {
        const photoReferences = await Promise.all(
          data.result.photos.map(async (photo) => {
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`;
            return photoUrl;
          })
        );

        photoCache[place_id] = photoReferences; // Önbelleğe kaydet
        setPhotos(photoReferences);
      } else {
        setPhotos([]);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {loading && <Text>Loading...</Text>}
      {!loading && photos.length === 0 && null}
      {photos.length > 0 ? (
        <Image source={{ uri: photos[0] }} style={styles.image} />
      ) : (
        <Text>No image </Text>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{stop.name}</Text>
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{index + 1}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 75,
    width: 380,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 63,
    height: 63,
    borderRadius: 40,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
});

export default TourCard;
