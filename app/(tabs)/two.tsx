import { Dimensions, StyleSheet, useColorScheme } from "react-native";

import { Text, View } from "@/components/Themed";
import { ActionService } from "@/api/ActionService";
import { useUserStore } from "@/store/useUserStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto } from "@expo/vector-icons";
import CardStack from "react-native-card-stack-swiper";
import PersonCard from "@/components/PersonCard";
import Colors from "@/constants/Colors";
import { useRef, useState } from "react";

export default function TabTwoScreen() {
  const swiperRef = useRef<CardStack | null>(null);

  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const user = useUserStore((state) => state.user);
  const { data } = ActionService.useAll(user?.device_id ?? "");

  const [index, setIndex] = useState(0);

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
        >
          {(data ?? []).map((card) => (
            <PersonCard key={card.person.id} person={card.person} />
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
