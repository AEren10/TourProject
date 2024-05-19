import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
// FlatList componentinin dosya yoluna göre düzenleyin
import FlatListComponent from "../component/Flat/FlatListComponent.js";
import CarouselComponent from "../component/Slider/CarouselComponent.js";

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <CarouselComponent />
        <FlatListComponent header={"İstanbul Turları"} />
        <FlatListComponent header={"Avrupa Turları"} />
        <FlatListComponent header={"Mayıs Ayı Önerileri"} />
        <FlatListComponent header={"İtalya Turları"} />
      </View>
    </ScrollView>
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
