import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/Card";
import { addActions } from "../../context/SliceLastAction";

const FlatListComponent = ({ header, newsData }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const actions = useSelector((state) => state.actions.actions);

  if (!newsData) {
    return null; // Eğer newsData undefined ise component render etmeyin
  }
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{header}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {newsData.map((item) => (
          <Card
            key={item.id}
            item={item}
            onPress={() => {
              console.log(`Flat item basıldı`);
              navigation.navigate("TourScreen", { tourData: item });
              dispatch(addActions(item));
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 30, paddingLeft: 8 },
  name: { fontSize: 20, fontWeight: "500", marginLeft: 12 },
});

export default FlatListComponent;
