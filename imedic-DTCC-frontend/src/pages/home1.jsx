import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  BackHandler,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';

export default function HomeScreen({ navigation }) {
  const [tratamentos, setTratamentos] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Atualização do horário em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Bloqueio do botão físico de voltar (não permite voltar para login)
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Sair do app', 'Deseja sair do aplicativo?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Sair', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Impede voltar
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => backHandler.remove();
    }, [])
  );

  // Busca os tratamentos da API
  useFocusEffect(
    React.useCallback(() => {
      const fetchTratamentos = async () => {
        setLoading(true);
        try {
          const response = await fetch("http://35.247.225.42:3333/tratamento");
          const data = await response.json();

          if (Array.isArray(data.message)) {
            setTratamentos(data.message);
          } else {
            setTratamentos([]);
          }
        } catch (error) {
          console.error("Erro ao buscar tratamentos:", error);
          setTratamentos([]);
        } finally {
          setLoading(false);
        }
      };

      fetchTratamentos();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho */}
      <ImageBackground
        source={require('../assets/Rectangle 1.png')}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.navigate("PerfilScreen")}>
            <Image
              source={require('../assets/PerfilLogo.png')}
              style={styles.headerImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Seja Bem-Vindo</Text>
        </View>
      </ImageBackground>

      {/* Data e hora */}
      <Text style={styles.dateTime}>
        {currentDateTime.toLocaleString()}
      </Text>

      <Text style={styles.text2}>Meus medicamentos:</Text>

      {/* Lista de tratamentos */}
      {loading ? (
        <Text style={styles.loadingText}>Carregando tratamentos...</Text>
      ) : tratamentos.length === 0 ? (
        <Text style={styles.noData}>Nenhum tratamento encontrado.</Text>
      ) : (
        tratamentos.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>
              Medicamento: {item.nome_remedio || 'Desconhecido'}
            </Text>
            <Text>Tarja: {item.nome_tarja || 'Sem Tarja'}</Text>
            <Text>
              Dosagem: {item.dosagem ? `${item.dosagem}mg` : 'Sem dosagem'}
            </Text>
            <Text>
              📅 Início: {item.data_inicio ? format(new Date(item.data_inicio), 'dd/MM/yyyy') : 'Data desconhecida'}
            </Text>
            <Text>
              🛑 Fim: {item.data_fim ? format(new Date(item.data_fim), 'dd/MM/yyyy') : 'Data desconhecida'}
            </Text>
          </View>
        ))
      )}

      {/* Botões */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("inserirTratamento")}
      >
        <Text style={styles.textButton}>Adicionar Tratamento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("QRCode")}
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
    width: '100%',
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
});
