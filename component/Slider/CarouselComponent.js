import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");
const carouselItemWidth = width;

const tours = [
  { title: "Tour 1", description: "Description 1" },
  { title: "Tour 2", description: "Description 2" },
  { title: "Tour 3", description: "Description 3" },
  { title: "Tour 4", description: "Description 4" },
  { title: "Tour 5", description: "Description 5" },
];

function CarouselComponent() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = (event) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / carouselItemWidth
    );
    setActiveSlide(slideIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Merhaba, woOWow</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {tours.map((tour, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // Carousel öğesine basıldığında çalışacak kod buraya gelir
              console.log(`Carousel item ${index} basıldı`);
            }}
          >
            <View
              style={[
                styles.slide,
                { width: carouselItemWidth, backgroundColor: "white" },
              ]}
            >
              <Text style={styles.title}>{tour.title}</Text>
              <Text style={styles.description}>{tour.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {tours.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeSlide && { backgroundColor: "black" },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  name: {
    position: "absolute",
    top: 70,
    left: 20,
    zIndex: 1,
    fontSize: 20,
    fontWeight: "500",
  },
  slide: {
    height: 420,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  paginationDot: {
    width: 16,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#CCCCCC",
  },
});

export default CarouselComponent;
