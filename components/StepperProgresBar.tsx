import Colors from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface StepperProgressBarProps {
  steps: number; // total step
  currentStep: number; // step aktif (mulai dari 1)
}

export default function StepperProgressBar({ steps, currentStep }: StepperProgressBarProps) {
  // Hitung lebar pill berdasarkan banyaknya step
  const pillWidth = (width - 60) / steps - 8; // -8 buat jarak antar pill

  return (
    <View style={styles.container}>
      <View style={styles.stepsWrapper}>
        {Array.from({ length: steps }).map((_, index) => {
          const stepIndex = index + 1;
          const isActive = stepIndex <= currentStep;

          return (
            <View key={index} style={styles.stepContainer}>
              <View style={[styles.pill, { width: pillWidth }, isActive && styles.activePill]} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  stepsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 60,
  },
  stepContainer: {
    alignItems: "center",
  },
  pill: {
    height: 5,
    borderRadius: 6,
    backgroundColor: "#ddd",
    marginBottom: 8,
  },
  activePill: {
    backgroundColor: Colors.light.tint,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
