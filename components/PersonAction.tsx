import { AntDesign, Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type PersonActionProps = {
  canUndo: boolean;
  hasRemainingCards: boolean;
  handleUndo: () => void;
  handleDislikePress: () => void;
  handleLikePress: () => void;
};

export default function PersonAction({
  canUndo,
  hasRemainingCards,
  handleDislikePress,
  handleLikePress,
  handleUndo,
}: PersonActionProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 32,
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
