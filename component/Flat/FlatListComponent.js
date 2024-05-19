import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Text } from "react-native";

import Card from "../Cards/Card";

const FlatListComponent = ({ header }) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((response) => response.json())
      .then((data) => {
        const slicedData = data.slice(0, 5); // İlk 5 veriyi al

        setNewsData(slicedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{header}</Text>
      <FlatList
        data={newsData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPress={() => {
              console.log(`Flat item ${item.id} basıldı`);
              // Kart'a basıldığında yapılacak işlemleri buraya yazabilirsiniz
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 30, paddingLeft: 8 },
  name: { fontSize: 20, fontWeight: "500", marginLeft: 12 },
});

export default FlatListComponent;
