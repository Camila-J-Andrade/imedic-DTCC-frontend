import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const GOOGLE_MAPS_API_KEY = "AIzaSyAxGnNF-tFlDWH8pFgM4aG_XbVIAlMf9z0"; // Chave de API do Maps

const Mapa = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mapType, setMapType] = useState("standard"); 

    useEffect(() => {
        getLocation();
    }, []);

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
            fetchNearbyPharmacies(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            console.error("Erro ao obter localização:", error);
            Alert.alert("Erro", "Não foi possível obter a localização.");
        }
    };

    const fetchNearbyPharmacies = async (latitude, longitude) => {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=pharmacy&key=${GOOGLE_MAPS_API_KEY}`;
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === "OK") {
                setPharmacies(data.results);
            } else {
                console.error("Erro ao buscar farmácias:", data.error_message);
            }
        } catch (error) {
            console.error("Erro ao buscar farmácias:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleMapType = () => {
        setMapType((prev) => (prev === "standard" ? "satellite" : "standard"));
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text>Carregando farmácias...</Text>
                </View>
            ) : userLocation ? (
                <>
                    <MapView
                        style={styles.map}
                        initialRegion={userLocation}
                        showsUserLocation
                        mapType={mapType}
                    >
                        <Marker
                            coordinate={userLocation}
                            title="Minha Localização"
                            pinColor="#007AFF"
                        />

                        {pharmacies.map((pharmacy, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: pharmacy.geometry.location.lat,
                                    longitude: pharmacy.geometry.location.lng,
                                }}
                                title={pharmacy.name}
                                description={pharmacy.vicinity}
                                pinColor="#ffe79d"
                            />
                        ))}
                    </MapView>

                    <TouchableOpacity style={styles.button} onPress={toggleMapType}>
                        <Text style={styles.buttonText}>
                            Modo: {mapType === "standard" ? "Padrão" : "Satélite"}
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.loadingContainer}>
                    <Text>Não foi possível carregar a localização.</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: "100%", height: "100%" },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    button: {
        position: "absolute",
        bottom: 635,
        left: "21%",
        transform: [{ translateX: -75 }],
        backgroundColor: "#89EBF6",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        elevation: 10,
    },
    buttonText: {
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Mapa;
