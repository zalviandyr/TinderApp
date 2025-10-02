import { Fontisto } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { ImageBackground } from "expo-image";

const profiles = [
  {
    id: 1,
    name: "에스더",
    age: 30,
    distance: "24km",
    image: "https://images.unsplash.com/photo-1676083192960-2a4873858487",
  },
  {
    id: 2,
    name: "Sophie",
    age: 27,
    distance: "10km",
    image: "https://images.unsplash.com/photo-1715329597853-50e0350376a4",
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

        <CardStack
          style={styles.cardStack}
          disableBottomSwipe
          disableTopSwipe
          renderNoMoreCards={() => (
            <View style={styles.noMoreCards}>
              <Text style={styles.noMoreText}>No more cards</Text>
            </View>
          )}
          onSwiped={(cardIndex) => setIndex(cardIndex + 1)}
          onSwipedRight={(cardIndex) => console.log("Liked:", profiles[cardIndex])}
          onSwipedLeft={(cardIndex) => console.log("Disliked:", profiles[cardIndex])}
        >
          {profiles.map((card) => (
            <Card key={card.id} style={styles.cardWrapper}>
              <View style={styles.card}>
                <ImageBackground
                  source={{ uri: card.image }}
                  style={styles.imageBackground}
                  cachePolicy={"disk"}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.name}>
                      {card.name}, {card.age}
                    </Text>
                    <Text style={styles.distance}>{card.distance} 거리</Text>
                  </View>
                </ImageBackground>
              </View>
            </Card>
          ))}
        </CardStack>
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
    height: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 5,
  },
  cardStack: {
    flex: 1,
    alignItems: "center",
  },
  cardWrapper: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.6,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    shadowRadius: 25,
    shadowOpacity: 0.1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardContent: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  distance: {
    fontSize: 16,
    color: "#f0f0f0",
  },
  noMoreCards: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  noMoreText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});
