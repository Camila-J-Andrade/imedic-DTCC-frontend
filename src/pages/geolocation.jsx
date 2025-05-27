import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const GOOGLE_MAPS_API_KEY = "AIzaSyAxGnNF-tFlDWH8pFgM4aG_XbVIAlMf9z0"; // Substitua com sua chave da API

const Mapa = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getLocation();
    }, []);

    // Obter a localização do usuário
    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permissão Negada",
                    "Precisamos da sua localização para encontrar farmácias próximas."
                );
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const userLocation = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            };
            setUserLocation(userLocation);

            // Buscar farmácias próximas
            fetchNearbyPharmacies(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            console.error("Erro ao obter localização:", error);
            Alert.alert("Erro", "Não foi possível obter a localização.");
        }
    };

    // Buscar farmácias próximas via API do Google Maps
    const fetchNearbyPharmacies = async (latitude, longitude) => {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=pharmacy&key=${GOOGLE_MAPS_API_KEY}`;

        setLoading(true);

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === "OK") {
                setPharmacies(data.results); // Atualiza a lista de farmácias encontradas
            } else {
                console.error("Erro ao buscar farmácias:", data.error_message);
            }
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar farmácias:", error);
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text>Carregando farmácias...</Text> 
                </View>
            ) : userLocation ? (
                <MapView
                    style={styles.map}
                    initialRegion={userLocation}
                    region={userLocation} // Região inicial do mapa
                    showsUserLocation
                >
                    {/* Marcador da localização do usuário */}
                    <Marker
                        coordinate={userLocation}
                        title="Minha Localização"
                        pinColor="#007AFF" // Azul para o usuário
                    />

                    {/* Marcadores das farmácias com cor personalizada */}
                    {pharmacies.map((pharmacy, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: pharmacy.geometry.location.lat,
                                longitude: pharmacy.geometry.location.lng,
                            }}
                            title={pharmacy.name}
                            description={pharmacy.vicinity}
                            pinColor="#ffe79d" // Cor personalizada para farmácias (pode ser qualquer cor)
                        />
                    ))}
                </MapView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Text>Não foi possível carregar a localização.</Text> {/* Agora o Text é reconhecido */}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: "100%", height: "100%" },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Mapa;