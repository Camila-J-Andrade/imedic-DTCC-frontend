import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Linking, Animated, Easing } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function QRCode() {
    const [temPermissao, setTemPermissao] = useState(null);
    const [digitalizado, setDigitalizado] = useState(false);
    const navigation = useNavigation();

    const animacao = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const obterPermissoesDaCamera = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setTemPermissao(status === "granted");
        };
        obterPermissoesDaCamera();
    }, []);

    useEffect(() => {
        iniciarAnimacao();
    }, []);

    const iniciarAnimacao = () => {
        animacao.setValue(0);
        Animated.loop(
            Animated.timing(animacao, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const lidarComCodigoDigitalizado = ({ type, data }) => {
        setDigitalizado(true);

        if (data.startsWith("http://") || data.startsWith("https://")) {
            Linking.openURL(data);
        } else {
            alert(`Código do tipo ${type} com dados ${data} foi digitalizado!`);
        }
    };

    if (temPermissao === null) {
        return <Text>Solicitando permissão para usar a câmera...</Text>;
    }
    if (temPermissao === false) {
        return <Text>Sem acesso à câmera.</Text>;
    }

    // Configura a posição da linha de animação
    const translateY = animacao.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100], // ajusta a altura da animação dentro da mira
    });

    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={digitalizado ? undefined : lidarComCodigoDigitalizado}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "pdf417"],
                }}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Barra Superior */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Voltar</Text>
            </View>

            {/* Mira do scanner */}
            <View style={styles.miraContainer}>
                <View style={styles.mira} />
                <View style={styles.cantoSuperiorEsquerdo} />
                <View style={styles.cantoSuperiorDireito} />
                <View style={styles.cantoInferiorEsquerdo} />
                <View style={styles.cantoInferiorDireito} />

                {/* Linha de animação */}
                <Animated.View
                    style={[
                        styles.linhaAnimada,
                        {
                            transform: [{ translateY }],
                        },
                    ]}
                />
            </View>

            {/* Botão de re-scan */}
            <TouchableOpacity
                style={styles.botaoScan}
                onPress={() => {
                    setDigitalizado(false);
                }}
            >
                <MaterialCommunityIcons name="qrcode-scan" size={36} color="#89EBF6" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CFC9C0",
    },
    header: {
        position: "absolute",
        top: 50,
        left: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    headerText: {
        color: "white",
        fontSize: 18,
    },
    miraContainer: {
        width: 250,
        height: 250,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        alignSelf: "center",
        marginTop: 150,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    mira: {
        width: 230,
        height: 230,
        borderRadius: 20,
    },
    cantoSuperiorEsquerdo: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderColor: "#89EBF6",
        borderTopLeftRadius: 10,
    },
    cantoSuperiorDireito: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 40,
        height: 40,
        borderTopWidth: 5,
        borderRightWidth: 5,
        borderColor: "#89EBF6",
        borderTopRightRadius: 10,
    },
    cantoInferiorEsquerdo: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderColor: "#89EBF6",
        borderBottomLeftRadius: 10,
    },
    cantoInferiorDireito: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: "#89EBF6",
        borderBottomRightRadius: 10,
    },
    linhaAnimada: {
        width: "90%",
        height: 2,
        backgroundColor: "#89EBF6",
        position: "absolute",
    },
    botaoScan: {
        position: "absolute",
        bottom: 50,
        alignSelf: "center",
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
});
