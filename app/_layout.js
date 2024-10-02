import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { db } from "./firebase";
import { RootSiblingParent } from "react-native-root-siblings";

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });
  const router = useRouter();
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const employerDoc = await getDoc(doc(db, "employers", user.uid));
  //       if (employerDoc.exists()) {
  //         console.log("You are an employer");
  //         router.push("employer/employerHome");
  //       } else {
  //         const jobSeekerDoc = await getDoc(doc(db, "seekers", user.uid));
  //         if (jobSeekerDoc.exists()) {
  //           console.log("You are a job seeker");
  //           router.push("home");
  //         } else {
  //           console.log("User type not identified");
  //           router.push("auth");
  //         }
  //       }
  //     } else {
  //       console.log("You are not signed in");
  //       router.navigate("auth");
  //     }
  //   });
  //   setIsMounted(true);
  //   return () => unsubscribe();
  // }, [router]);

  // if (!isMounted) {
  //   return null; // or a loading spinner
  // }

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          marginVertical: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={"green"} />
      </View>
    );
  }
  return (
    <RootSiblingParent>
      <Stack>
        <Stack.Screen options={{ header: () => null }} name="auth" />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen
          name="employer/createJobs"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="employer/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="employer/employerProfile"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="employer/employerHome"
          options={{ headerShown: false }}
        />
      </Stack>
    </RootSiblingParent>
  );
};

export default Layout;
