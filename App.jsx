import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./src/pages/splash.jsx";
import DashboardScreen from "./src/pages/TelaComecar.jsx";
import Login from "./src/pages/login.jsx";
import TabBar from "./src/pages/TabBar.jsx";
import Cadastro from "./src/pages/cadastro.jsx";
import inserirTratamento from "./src/pages/InserirTratamento.jsx";
import QRCode from "./src/pages/QRCode.jsx";
import PromoTela from "./src/pages/promoTela.jsx";
import PerfilScreen from "./src/pages/telaPerfil.jsx";
import Setting from "./src/pages/configuracaoScreen.jsx";
import AtualizarTratamento from "./src/pages/AtualizarTratamento.jsx";

import { TreatmentProvider } from "./src/components/TreatmentContext.jsx";
import { ProfileProvider } from "./src/components/ProfileContext.jsx"; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <TreatmentProvider>
      <ProfileProvider> 
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="TabBar" component={TabBar} />
            <Stack.Screen name="inserirTratamento" component={inserirTratamento} />
            <Stack.Screen name="QRCode" component={QRCode} />
            <Stack.Screen name="PromoTela" component={PromoTela} />
            <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="AtualizarTratamento" component={AtualizarTratamento} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProfileProvider>
    </TreatmentProvider>
  );
}
