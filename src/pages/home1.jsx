import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, BackHandler, Alert, Animated, ScrollView, ToastAndroid, ActivityIndicator,} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { format } from "date-fns";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [tratamentos, setTratamentos] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const animatedHeight = useRef({}).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Sair do app", "Deseja sair do aplicativo?", [
          { text: "Cancelar", style: "cancel" },
          { text: "Sair", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => backHandler.remove();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchTratamentos();
    }, [])
  );

  const fetchTratamentos = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://34.151.199.145:3333/tratamento");
      const data = await response.json();

      const lista = Array.isArray(data.message) ? data.message : [];

      setTratamentos(lista);

      lista.forEach((item) => {
        if (!animatedHeight[item.id_tratamento]) {
          animatedHeight[item.id_tratamento] = new Animated.Value(0);
        }
      });
    } catch (error) {
      console.error("Erro ao buscar tratamentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os tratamentos.");
      setTratamentos([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = (id) => {
    if (expandedCard === id) {
      Animated.timing(animatedHeight[id], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedCard(null);
    } else {
      if (expandedCard !== null) {
        Animated.timing(animatedHeight[expandedCard], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      Animated.timing(animatedHeight[id], {
        toValue: 60,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedCard(id);
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Deletar", "Tem certeza que deseja excluir este tratamento?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => deleteTratamento(id) },
    ]);
  };

  const deleteTratamento = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`http://34.151.199.145:3333/tratamento/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Falha ao deletar");
      }

      ToastAndroid.show("Tratamento deletado com sucesso!", ToastAndroid.SHORT);

      setTratamentos((prev) => prev.filter((item) => item.id_tratamento !== id));

      if (expandedCard === id) {
        Animated.timing(animatedHeight[id], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setExpandedCard(null);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar o tratamento.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = (item) => {
    navigation.navigate("AtualizarTratamento", { tratamento: item });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../assets/Rectangle 1.png")}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.navigate("PerfilScreen")}>
            <Image
              style={styles.headerImage}
              source={require("../assets/PerfilLogo.png")}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Seja Bem-Vindo</Text>
        </View>
      </ImageBackground>

      <Text style={styles.text2}>Meus medicamentos:</Text>

      <Text style={styles.dateTime}>
        {format(currentDateTime, "dd/MM/yyyy HH:mm:ss")}
      </Text>

      {loading && (
        <Text style={styles.loadingText}>Carregando tratamentos...</Text>
      )}

      {!loading && tratamentos.length === 0 && (
        <Text style={styles.noData}>Nenhum tratamento encontrado.</Text>
      )}

      {tratamentos.map((item) => (
        <View key={item.id_tratamento}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => toggleCard(item.id_tratamento)}
            disabled={deletingId === item.id_tratamento}
          >
            <Text style={styles.cardTitle}>
              Medicamento: {item.nome_remedio || "Desconhecido"}
            </Text>
            <Text>Tarja: {item.nome_tarja || "Sem Tarja"}</Text>
            <Text>
              Dosagem: {item.dosagem ? item.dosagem + "mg" : "Sem dosagem"}
            </Text>
            <Text>
              📅 Início:{" "}
              {item.data_inicio
                ? format(new Date(item.data_inicio), "dd/MM/yyyy")
                : "Data desconhecida"}
            </Text>
            <Text>
              🛑 Fim:{" "}
              {item.data_fim
                ? format(new Date(item.data_fim), "dd/MM/yyyy")
                : "Data desconhecida"}
            </Text>
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.animatedContainer,
              { height: animatedHeight[item.id_tratamento] || 0 },
            ]}
          >
            <TouchableOpacity
              onPress={() => handleDelete(item.id_tratamento)}
              style={styles.icons}
              disabled={deletingId === item.id_tratamento}
            >
              {deletingId === item.id_tratamento ? (
                <ActivityIndicator color="red" size="small" />
              ) : (
                <MaterialIcons name="delete" size={24} color="red" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleUpdate(item)}
              style={styles.icons}
              disabled={deletingId === item.id_tratamento}
            >
              <Ionicons name="create-outline" size={24} color="#1C6789" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("inserirTratamento")}
        disabled={loading}
      >
        <Text style={styles.textButton}>Adicionar Tratamento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("QRCode")}
        disabled={loading}
      >
        <Text style={styles.textButton}>Escanear QR Code da Bula</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6EE',
    padding: 16,
    alignItems: 'center',
    flexGrow: 1,
  },
  headerBackground: {
    width: 400,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderRadius: 15,
    marginTop: -15,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  headerImage: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  text2: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  loadingText: {
    fontStyle: 'italic',
    marginVertical: 20,
    color: '#999',
  },
  card: {
    backgroundColor: '#fff2C9',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    width: 350,       // largura fixa para padrão
    alignSelf: 'center', // centraliza horizontalmente
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noData: {
    fontStyle: 'italic',
    marginVertical: 20,
    color: '#999',
  },
  button: {
    width: 234,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#89EBF6",
    borderRadius: 20,
    marginTop: 30,
  },
  button2: {
    width: 234,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFE79D",
    borderRadius: 20,
    marginTop: 15,
  },
  textButton: {
    fontSize: 16,
    color: "#000000",
    fontWeight: 'bold',
  },
  animatedContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  icons: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginHorizontal: 15,
    marginVertical: 10,
    height: 50,
  },
});
