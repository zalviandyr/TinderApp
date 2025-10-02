import { Fontisto } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, useColorScheme, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import CardStack from "react-native-card-stack-swiper";
import { PersonService } from "@/api/PersonService";
import PersonCard from "@/components/PersonCard";
import PersonAction from "@/components/PersonAction";
import { useUserStore } from "@/store/useUserStore";
import { ActionService } from "@/api/ActionService";

export default function TinderScreen() {
  const { data } = PersonService.useGetPersons();
  const profiles = data ?? [];
  const colorScheme = useColorScheme();
  const user = useUserStore((state) => state.user);
  const { mutate: saveAction } = ActionService.useSave();
  const { mutate: deleteAction } = ActionService.useDelete();

  const swiperRef = useRef<CardStack | null>(null);
  const [index, setIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<
    Array<{ index: number; direction: "left" | "right" }>
  >([]);

  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const hasRemainingCards = index < profiles.length;
  const canUndo = swipeHistory.length > 0;

  const handleSwipeLeft = (cardIndex: number) => {
    setSwipeHistory((prev) => [...prev, { index: cardIndex, direction: "left" }]);
    const card = profiles[cardIndex];
    if (card) {
      if (user) {
        saveAction({
          personId: card.id,
          userId: user.id,
          status: "DISLIKE",
        });

        console.log("Disliked:", card);
      }
    }
  };

  const handleSwipeRight = (cardIndex: number) => {
    setSwipeHistory((prev) => [...prev, { index: cardIndex, direction: "right" }]);
    const card = profiles[cardIndex];
    if (card) {
      if (user) {
        saveAction({
          personId: card.id,
          userId: user.id,
          status: "LIKE",
        });

        console.log("Liked:", card);
      }
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

      // delete last person
      const lastPerson = profiles[lastSwipe.index];
      if (user) {
        deleteAction({
          personId: lastPerson.id,
          userId: user.id,
        });
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
            <PersonCard key={card.id} person={card} />
          ))}
        </CardStack>

        <PersonAction
          {...{ canUndo, hasRemainingCards, handleUndo, handleDislikePress, handleLikePress }}
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
