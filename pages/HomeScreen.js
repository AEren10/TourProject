import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// FlatList componentinin dosya yoluna göre düzenleyin
import FlatListComponent from "../component/Flat/FlatListComponent.js";
import CarouselComponent from "../component/Slider/CarouselComponent.js";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CarouselComponent />
      <FlatListComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default HomeScreen;
