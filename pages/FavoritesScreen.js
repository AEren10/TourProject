import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FavoriteCard from "../component/Cards/FavoriteCard";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const FavoritesScreen = () => {
  const navigation = useNavigation();

  const favorites = useSelector((state) => state.favorites.favorites);
  const actions = useSelector((state) => state.actions.actions);

  const renderItem = ({ item }) => (
    <FavoriteCard
      showRemoveButton={true}
      item={item}
      onPress={() => navigation.navigate("TourScreen", { tourData: item })}
    />
  );
  const renderActionsItem = ({ item }) => (
    <FavoriteCard
      item={item}
      onPress={() => navigation.navigate("TourScreen", { tourData: item })}
    />
  );

  const [selectedId, setSelectedId] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const indicatorWidth = width / 2;
  const translateX = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: [0, indicatorWidth],
  });

  const handleTabClick = (index) => {
    setSelectedId(index);
    scrollViewRef.current.scrollTo({ x: index * width, animated: true });
  };

  return (
    <>
      <View style={styles.TopContainer}>
        <Text style={styles.TopHeader}>Keşiflerim</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.headerList}>
          <TouchableOpacity
            onPress={() => handleTabClick(0)}
            style={[
              styles.headerContainer,
              selectedId === 0 && styles.selectedHeaderContainer,
            ]}
          >
            <Text
              style={[
                styles.headerText,
                selectedId === 0 && styles.selectedHeaderText,
              ]}
            >
              Son Eylemler
            </Text>
            {selectedId === 0 && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTabClick(1)}
            style={[
              styles.headerContainer,
              selectedId === 1 && styles.selectedHeaderContainer,
            ]}
          >
            <Text
              style={[
                styles.headerText,
                selectedId === 1 && styles.selectedHeaderText,
              ]}
            >
              Favoriler
            </Text>
            {selectedId === 1 && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>
        </View>

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
            setSelectedId(index);
          }}
          style={styles.descScroll}
          ref={scrollViewRef}
        >
          <ScrollView style={styles.InnerContainerScroll}>
            <View style={[styles.contentContainer, { width }]}>
              <View style={styles.contentInnerContainer}>
                {actions.length > 0 ? (
                  <FlatList
                    data={actions}
                    renderItem={renderActionsItem}
                    keyExtractor={(item) => item.id}
                  />
                ) : (
                  <Text>Henüz Son Eylem Yok</Text>
                )}
              </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.InnerContainerScroll}>
            <View style={[styles.contentContainer, { width }]}>
              <View style={styles.contentInnerContainer}>
                {favorites.length > 0 ? (
                  <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                  />
                ) : (
                  <Text>Henüz Favorilenmiş Tur Yok</Text>
                )}
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  TopContainer: {
    height: 110,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  TopHeader: {
    marginTop: 60,
    fontSize: 35,
    fontWeight: "600",
    marginLeft: 20,
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  headerList: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerContainer: {
    padding: 10,
    width: 160,
  },
  selectedHeaderContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#D54568",
  },
  headerText: {
    fontSize: 18,
  },
  selectedHeaderText: {
    fontWeight: "bold",
    color: "#D54568",
  },

  animatedIndicator: {
    height: 2,
    backgroundColor: "#D54568",
  },
  descScroll: {
    flex: 1,
  },
  InnerContainerScroll: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentInnerContainer: {
    padding: 20,
  },
});

export default FavoritesScreen;
