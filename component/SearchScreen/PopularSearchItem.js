import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PopularSearchItem = ({ text }) => {
  return (
    <View style={styles.popularItem}>
      <Text style={styles.popularText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  popularItem: {
    backgroundColor: "#666666",
    padding: 10,
    margin: 5,
    borderRadius: 50,
    height: 36,
  },
  popularText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#d3d3d3",
  },
});

export default PopularSearchItem;
