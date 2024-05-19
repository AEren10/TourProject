// CardComponent.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TourCard = ({ imageUrl, text, number, targetScreen, params }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    //navigation.navigate(targetScreen, params);
    {
    }
    console.log(number, "carda bastın suan");
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{number}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
    borderWidth: 2,
    borderWidthColor: "black",
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
