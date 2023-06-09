import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import store from './store'
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <Provider store={store} >
      <StackNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({

});
