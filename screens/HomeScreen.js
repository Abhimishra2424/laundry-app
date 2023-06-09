import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import { products } from "../data/data";
import Dressitem from "../components/Dressitem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import ProfileScreen from "./ProfileScreen";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
  const productsState = useSelector((state) => state.product.product);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [displayCurrentAddress, setdisplayCurrentAddress] = useState("we are loading your location");
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


  useEffect(() => {
    if (productsState.length > 0) return
    const fetchProducts = () => {
      products?.map((item) => dispatch(getProducts(item)));
    };
    fetchProducts();
  }, []);

  return (
    <>
      <ScrollView style={{ marginTop: 40, backgroundColor: "#f0f0f0" }}>
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

          <Pressable onPress={()=> navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
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

        {/* Render all the Products */}
        {productsState.map((item, index) => (
          <Dressitem item={item} key={index} />
        ))}

        {/* Cart item show */}

        {total === 0 ? (
          null
        ) : (
          <Pressable
            style={{
              backgroundColor: "#088F8F",
              padding: 10,
              marginBottom: 40,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>{cart.length} items |  $ {total}</Text>
              <Text style={{ fontSize: 15, fontWeight: "400", color: "white", marginVertical: 6 }}>extra charges might apply</Text>
            </View>

            <Pressable onPress={() => navigation.navigate("PickUp")}>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>Proceed to pickup</Text>
            </Pressable>
          </Pressable>
        )}
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
