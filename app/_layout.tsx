import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { UserService } from "@/api/UserService";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@/types/user";
import { useUserStore } from "@/store/useUserStore";

// TODO: progress bar in tinder
// TODO: swagger in laravel
// TODO: like oppent view
// TODO: relation in RDB
// TODO: Cronjob in laravel

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // react-query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { mutate } = UserService.useLogin();
  const [isAuth, setIsAuth] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const getUser = async (): Promise<IUser | null> => {
    const deviceId = await AsyncStorage.getItem("device_id");
    const userId = await AsyncStorage.getItem("user_id");

    if (deviceId && userId) {
      return { device_id: deviceId, id: userId };
    }

    return null;
  };

  useEffect(() => {
    getUser().then((value) => {
      if (value) {
        setUser(value);

        setIsAuth(true);
      } else {
        const myUuid = uuid.v4();
        mutate(myUuid, {
          onSuccess: (data) => {
            Promise.all([
              AsyncStorage.setItem("device_id", data.device_id),
              AsyncStorage.setItem("user_id", data.id),
            ]).then(() => {
              setUser(data);
              setIsAuth(true);
            });
          },
        });
      }
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {isAuth ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <View style={styles.progressWrapper}>
          <Progress.Circle size={100} indeterminate={true} borderWidth={10} />
        </View>
      )}
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  progressWrapper: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
  },
});
