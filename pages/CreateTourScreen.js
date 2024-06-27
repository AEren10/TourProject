// CreateTourScreen.js
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import TourCard from "../component/Cards/TourCard";
import { createGraph } from "../Utils/Graph";
import { dijkstra } from "../Utils/Dijkstra";
import { useDispatch, useSelector } from "react-redux";
import { addTours } from "../context/SliceTour";
import { useNavigation } from "@react-navigation/native";

const API_KEY = "YOUR_API_KEY";

export default function CreateTourScreen() {
  const dispatch = useDispatch();
  const [stops, setStops] = useState([]);
  const [tour, setTour] = useState([]);
  const [city, setCity] = useState("");

  const navigation = useNavigation();

  const fetchStops = async (cityName) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${cityName} touristic places&key=${API_KEY}`
      );
      const data = await response.json();
      const fetchedStops = data.results.map((place) => ({
        name: place.name,
        lat: place.geometry.location.lat,
        lon: place.geometry.location.lng,
        rating: place.rating,
        place_id: place.place_id,
        place_icon: place.icon_mask_base_uri,
        place_types: place.types,
      }));

      setStops(fetchedStops);
      console.log(fetchedStops);
    } catch (error) {
      console.error("Error fetching stops:", error);
    }
  };
  //***************************** */

  /* ************************ */
  useEffect(() => {
    if (stops.length > 0) {
      const graph = createGraph(stops);
      const shortestPaths = dijkstra(graph, 0); // İlk duraktan başlayarak

      // Tour oluşturma
      const orderedStops = Object.keys(shortestPaths)
        .map((key) => ({
          stopIndex: parseInt(key),
          distance: shortestPaths[key],
        }))
        .sort((a, b) => a.distance - b.distance)
        .map((item) => stops[item.stopIndex]);

      setTour(orderedStops);
    }
  }, [stops]);

  const fetchTourData = async (city) => {
    await fetchStops(city);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.TopContainer}>
        <Text style={styles.TopHeader}>Yeni Rotalar </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Şehir ismi girin..."
        value={city}
        onChangeText={setCity}
      />
      <View style={styles.stickyButtonTopContainer}>
        <View style={styles.stickyButtonContainer}>
          <Button
            title="Turu Oluştur"
            onPress={() => fetchTourData(city)}
            color="white"
          />
        </View>
        <View style={styles.stickyButtonContainer}>
          <Button
            title="Konuma Göre Tur Oluştur"
            onPress={() => fetchTourData("Amasya")}
            color="white"
            style={{ color: "white" }}
          />
        </View>
      </View>
      {tour.length > 0 &&
        tour.map((stop, index) => (
          <TourCard key={index} stop={stop} index={index} />
        ))}
      {tour && tour.length > 0 && (
        <View style={styles.stickyButtonTopContainer}>
          <View style={styles.stickyButtonContainer}>
            <Button
              title="Tura Başla"
              onPress={() =>
                navigation.navigate("MapScreen", { tourData: { places: tour } })
              }
              color="white"
              style={{ color: "white" }}
            />
          </View>
        </View>
      )}
      {/* <View style={styles.stickyButtonTopContainer}>
        <View style={styles.stickyButtonContainer}>
          <Button
            title="Bu Turu Kaydet"
            onPress={() =>
              navigation.navigate("FavoritesScreen", { tourData: tour })
            }
            disabled={!tour || tour.length === 0}
            color="white"
            style={{ color: "white" }} // tour boşsa butonu devre dışı bırak
          />
        </View>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  TopContainer: {
    height: 90,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  TopHeader: {
    marginTop: 40,
    fontSize: 35,
    fontWeight: "600",
  },

  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  stickyButtonContainer: {
    borderRadius: 12,
    height: 50,
    marginBottom: 5,
    width: 360,
    backgroundColor: "#D54568",
    padding: 6,
    borderTopWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  stickyButtonTopContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
