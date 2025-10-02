import { Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, useColorScheme } from "react-native";
import Swiper from "react-native-deck-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";

const profiles = [
  {
    id: 1,
    name: "에스더",
    age: 30,
    distance: "24km",
    image: "https://link-to-image.jpg",
  },
  {
    id: 2,
    name: "Sophie",
    age: 27,
    distance: "10km",
    image: "https://link-to-another.jpg",
  },
];

export default function TinderScreen() {
  const [index, setIndex] = useState(0);
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={styles.header}>
          <Fontisto name="tinder" size={32} color={themeColors.tint} />
          <Text style={[styles.title, { color: themeColors.tint }]}>tinder</Text>
        </View>

        <Swiper
          cards={profiles}
          cardIndex={index}
          renderCard={(card) => (
            <View style={[styles.card]}>
              <Image source={{ uri: card.image }} style={styles.image} />
              <Text style={[styles.name]}>
                {card.name}, {card.age}
              </Text>
              <Text style={[styles.distance]}>{card.distance} 거리</Text>
            </View>
          )}
          onSwiped={(cardIndex) => setIndex(cardIndex + 1)}
          onSwipedRight={(cardIndex) => console.log("Liked:", profiles[cardIndex])}
          onSwipedLeft={(cardIndex) => console.log("Disliked:", profiles[cardIndex])}
          stackSize={3}
          backgroundColor="transparent"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 5,
  },
  card: {
    flex: 0.8,
    borderRadius: 10,
    shadowRadius: 25,
    shadowOpacity: 0.1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  image: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.6,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  distance: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
  },
});
