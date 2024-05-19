import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";

import FavoriteIcon from "../component/Icon/FavoriteIcon";
import TourCard from "../component/Cards/TourCard";

const { width } = Dimensions.get("window");

const data = [
  {
    id: "hakkinda",
    title: "Hakkında",
    description: () => (
      <ScrollView>
        <View>
          <TourCard text={"asasdfasdfsdafsdaf"} />
          <TourCard number={2} />
          <TourCard number={3} />
          <TourCard number={4} />
          <TourCard number={5} />
          <TourCard number={6} />
          <TourCard number={7} />
          <TourCard number={8} />
        </View>
      </ScrollView>
    ),
  },
  {
    id: "İpuçları",
    title: "İpuçları",
    description: () => <Text>buraya açıklama gelecek vsvsvsvs</Text>,
  },
  {
    id: "benzer",
    title: "Benzer",
    description: () => (
      <ScrollView>
        <View>
          <TourCard number={2} />
          <TourCard number={3} />
          <TourCard number={4} />
        </View>
      </ScrollView>
    ),
  },
];

const TourScreen = () => {
  const [selectedId, setSelectedId] = useState(data[0].id); // İlk başlık varsayılan olarak seçili
  const [currentIndex, setCurrentIndex] = useState(0); // İlk başlık varsayılan olarak seçili
  const scrollX = useRef(new Animated.Value(0)).current;

  const language = "Türkçe";
  const duration = "25";
  const stops = "16";

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedId(item.id);
        setCurrentIndex(data.findIndex((d) => d.id === item.id));
      }}
      style={styles.headerContainer}
    >
      <View
        style={[
          styles.headerContainer,
          selectedId === item.id && styles.selectedHeaderContainer,
        ]}
      >
        <Text
          style={[
            styles.headerText,
            selectedId === item.id && styles.selectedHeaderText,
          ]}
          onPress={() => setSelectedId(item.id)}
        >
          {item.title}
        </Text>
        {selectedId === item.id && <View style={styles.selectedIndicator} />}
      </View>
    </TouchableOpacity>
  );
  const indicatorWidth = scrollX.interpolate({
    inputRange: data.map((_, i) => i * width),
    outputRange: data.map(() => 100), // Genişliği ayarlayabilirsiniz
  });

  const translateX = scrollX.interpolate({
    inputRange: data.map((_, i) => i * width),
    outputRange: data.map((_, i) => i * (width / data.length)),
  });
  return (
    <View style={styles.container}>
      <View style={styles.fixedContent}>
        <Image style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Başlık</Text>
          <Text style={styles.subtitle}>Alt başlık</Text>
        </View>
        <View style={styles.infoBar}>
          <Text style={styles.infoBarText}>
            {stops} durak • {language} • {duration} dakika
          </Text>
          <FavoriteIcon style={styles.infoBarIcon} />
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>İstanbul, Türkiye</Text>
        </View>
      </View>
      <View style={styles.scrollableContent}>
        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.headerList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.headerListContent}
        />
        <Animated.View
          style={[
            styles.animatedIndicator,
            { width: indicatorWidth, transform: [{ translateX }] },
          ]}
        />
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setSelectedId(data[index].id);
          }}
          style={styles.descScroll}
          ref={(scrollView) => {
            this.scrollView = scrollView;
          }}
        >
          {data.map((item) => (
            <View key={item.id} style={styles.descContainer}>
              {selectedId === item.id && item.description()}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedContent: {
    // Üst kısım sabit içerik için stil
  },
  image: {
    width: "100%",
    height: 290,
    borderBottomWidth: 2,
    borderColor: "black",
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  infoBar: {
    backgroundColor: "lightgray",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoBarText: {
    fontSize: 15,
  },
  locationContainer: {
    position: "absolute",
    top: 277, // Görselin yüksekliği kadar
    left: 15,
    width: 150,
    backgroundColor: "lightblue",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 8,
  },
  locationText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  description: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 20,
  },
  scrollableContent: {
    flex: 1,
  },
  headerList: {
    flexGrow: 0,
  },
  headerListContent: {
    paddingHorizontal: 10,
  },
  headerContainer: {
    padding: 7,
    marginHorizontal: 10,
    alignItems: "center",
    width: 100,
  },
  headerText: {
    fontSize: 18,
    color: "#000",
  },
  selectedHeaderText: {
    color: "pink",
  },
  animatedIndicator: {
    height: 2,
    backgroundColor: "pink",
    position: "absolute",
    top: 40,
    left: 0,
  },
  descScroll: {
    flex: 1,
  },
  descContainer: {
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  descText: {
    fontSize: 14,
  },
});

export default TourScreen;
