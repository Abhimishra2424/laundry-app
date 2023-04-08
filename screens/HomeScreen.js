import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";

const HomeScreen = () => {
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log(response);

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  return (
    <SafeAreaView style={{ marginTop: 40 }}>
      {/* location and Profile */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Entypo
          name="location"
          size={30}
          color="#FF0000"
          style={{ marginRight: 5 }}
        />
        <View>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>Home</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>

        <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://lh3.googleusercontent.com/-rw9XpQCMLoQ/AAAAAAAAAAI/AAAAAAAAAAA/AN6ncHiNOWYCI8vGCrf_fmBNPQ34_Xns8Q/photo.jpg?sz=46",
            }}
          />
        </Pressable>
      </View>
      {/* search Bar */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          margin: 10,
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "grey",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Search for Items or More" />
        <AntDesign name="search1" size={24} color="black" />
      </View>

      {/* Image Carousel*/}
      <Carousel />
      {/* services  */}
      <Services />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
