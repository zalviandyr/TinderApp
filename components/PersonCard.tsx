import { ImageBackground } from "expo-image";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card } from "react-native-card-stack-swiper";
import { Text } from "./Themed";
import { Ionicons } from "@expo/vector-icons";
import { IPerson } from "@/types/person";

type PersonCardProps = {
  person: IPerson;
};

export default function PersonCard({ person }: PersonCardProps) {
  return (
    <Card style={styles.cardWrapper}>
      <View style={styles.card}>
        <ImageBackground
          source={{ uri: person.picture }}
          style={styles.imageBackground}
          cachePolicy="disk"
        >
          <View style={styles.cardContent}>
            <Text style={styles.name}>
              {person.name}, {person.age}
            </Text>
            <View style={styles.distanceWrapper}>
              <Ionicons name="location-outline" size={18} style={styles.distanceIcon} />
              <Text style={styles.distance}>
                {person.distance} {person.location}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
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
});
