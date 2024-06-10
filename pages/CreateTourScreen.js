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

const API_KEY = "AIzaSyBfGpyUzM8aM059UtpeCmpUzWxMiwev9n0";

export default function CreateTourScreen() {
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
      // console.log(fetchedStops);
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
      <Text style={styles.title}>Tour Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Fetch Tour" onPress={() => fetchTourData(city)} />
      {tour.length > 0 &&
        tour.map((stop, index) => (
          <TourCard key={index} stop={stop} index={index} />
        ))}
      <Button title="konuma göre ara" onPress={() => fetchTourData("Amasya")} />
      <Button
        title="add to Favorites"
        onPress={() => navigation.navigate("TourScreen", { tour })}
        disabled={!tour || tour.length === 0} // tour boşsa butonu devre dışı bırak
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});