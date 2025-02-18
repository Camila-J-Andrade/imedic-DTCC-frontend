import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/splash.jsx"; // Importa a tela inicial
import DashboardScreen from "./screens/TelaComecar.jsx"; // Importa a tela de destino
import Login from "./screens/login.jsx";
// import Cadastro from "./screens/cadastro.jsx";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Cadastro" component={Cadastro} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
