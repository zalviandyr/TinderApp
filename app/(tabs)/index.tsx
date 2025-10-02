import { AntDesign, Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, useColorScheme, TouchableOpacity } from "react-native";
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
  const swiperRef = useRef<CardStack | null>(null);
  const [index, setIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<
    Array<{ index: number; direction: "left" | "right" }>
  >([]);
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const hasRemainingCards = index < profiles.length;
  const canUndo = swipeHistory.length > 0;

  const handleSwipeLeft = (cardIndex: number) => {
    setSwipeHistory((prev) => [...prev, { index: cardIndex, direction: "left" }]);
    const card = profiles[cardIndex];
    if (card) {
      console.log("Disliked:", card);
    }
  };

  const handleSwipeRight = (cardIndex: number) => {
    setSwipeHistory((prev) => [...prev, { index: cardIndex, direction: "right" }]);
    const card = profiles[cardIndex];
    if (card) {
      console.log("Liked:", card);
    }
  };

  const handleUndo = () => {
    if (!canUndo) {
      return;
    }

    setSwipeHistory((prevHistory) => {
      if (prevHistory.length === 0) {
        return prevHistory;
      }

      const updatedHistory = prevHistory.slice(0, -1);
      const lastSwipe = prevHistory[prevHistory.length - 1];

      if (lastSwipe.direction === "left") {
        swiperRef.current?.goBackFromLeft();
      } else {
        swiperRef.current?.goBackFromRight();
      }

      setIndex((current) => Math.max(current - 1, 0));
      return updatedHistory;
    });
  };

  const handleDislikePress = () => {
    if (!hasRemainingCards) {
      return;
    }
    swiperRef.current?.swipeLeft();
  };

  const handleLikePress = () => {
    if (!hasRemainingCards) {
      return;
    }
    swiperRef.current?.swipeRight();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={styles.header}>
          <Fontisto name="tinder" size={32} color={themeColors.tint} />
          <Text style={[styles.title, { color: themeColors.tint }]}>tinder</Text>
        </View>

        <CardStack
          ref={swiperRef}
          style={styles.cardStack}
          secondCardScale={0.95}
          secondCardAlpha={0.85}
          disableBottomSwipe
          disableTopSwipe
          renderNoMoreCards={() => (
            <View style={styles.noMoreCards}>
              <Text style={styles.noMoreText}>No more cards</Text>
            </View>
          )}
          onSwiped={(cardIndex) => setIndex(cardIndex + 1)}
          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
        >
          {profiles.map((card) => (
            <Card key={card.id} style={styles.cardWrapper}>
              <View style={styles.card}>
                <ImageBackground
                  source={{ uri: card.image }}
                  style={styles.imageBackground}
                  cachePolicy="disk"
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.name}>
                      {card.name}, {card.age}
                    </Text>
                    <View style={styles.distanceWrapper}>
                      <Ionicons name="location-outline" size={18} style={styles.distanceIcon} />
                      <Text style={styles.distance}>{card.distance} 거리</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </Card>
          ))}
        </CardStack>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.undoButton, !canUndo && styles.buttonDisabled]}
            onPress={handleUndo}
            disabled={!canUndo}
          >
            <Feather name="rotate-ccw" size={26} color={canUndo ? "#f5a623" : "#999"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.dislikeButton,
              !hasRemainingCards && styles.buttonDisabled,
            ]}
            onPress={handleDislikePress}
            disabled={!hasRemainingCards}
          >
            <AntDesign name="close" size={30} color={hasRemainingCards ? "#ff6b6b" : "#bbb"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.likeButton,
              !hasRemainingCards && styles.buttonDisabled,
            ]}
            onPress={handleLikePress}
            disabled={!hasRemainingCards}
          >
            <AntDesign name="heart" size={28} color={hasRemainingCards ? "#2bd97c" : "#bbb"} />
          </TouchableOpacity>
        </View>
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
  distanceWrapper: {
    flexDirection: "row",
  },
  distanceIcon: {
    color: "#fff",
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
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 32,
    paddingVertical: 15,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 4,
  },
  likeButton: {
    borderWidth: 2,
    borderColor: "#2bd97c",
  },
  dislikeButton: {
    borderWidth: 2,
    borderColor: "#ff6b6b",
  },
  undoButton: {
    borderWidth: 2,
    borderColor: "#f5a623",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
