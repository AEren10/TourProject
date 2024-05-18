import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";

const Card = ({ item, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.inner_conteiner}>
          <ImageBackground
            style={styles.image}
            source={{ uri: "https://i.pravatar.cc" }}
          ></ImageBackground>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textName}> {item.category} </Text>
          <Text style={styles.textCity}> {item.price} </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 140,
    margin: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  image: {
    height: 150,
    width: 240,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: "hidden",
  },
  inner_conteiner: {},
  textName: {
    fontSize: 18,
    color: "black",
    textAlign: "left",
    marginBottom: 6,
    marginTop: 6,
  },
  textCity: {
    fontSize: 13,
    color: "black",
    textAlign: "left",
  },
  textContainer: {
    backgroundColor: "white",
  },
});

export default Card;
