import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./pages/splash.jsx";
import DashboardScreen from "./pages/TelaComecar.jsx";
import Login from "./pages/login.jsx";
import TabBar from "./pages/TabBar.jsx";
import Cadastro from "./pages/cadastro.jsx";
import inserirTratamento from "./pages/InserirTratamento.jsx";

import { TreatmentProvider } from "./components/TreatmentContext.jsx"; // Certifique-se do caminho

const Stack = createStackNavigator();

export default function App() {
  return (
    <TreatmentProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="TabBar" component={TabBar} />
          <Stack.Screen name="inserirTratamento" component={inserirTratamento} />
        </Stack.Navigator>
      </NavigationContainer>
    </TreatmentProvider>
  );
}
