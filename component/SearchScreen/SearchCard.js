import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

const SearchCard = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("TourScreen", { tourData: item.tour });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: item.tourImage }} style={styles.cardImage} />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    height: 110,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  cardOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default SearchCard;
