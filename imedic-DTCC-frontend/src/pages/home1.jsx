import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';

export default function HomeScreen({ navigation }) {
  const [tratamentos, setTratamentos] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Busca os tratamentos ao focar a tela
  useFocusEffect(
    React.useCallback(() => {
      const fetchTratamentos = async () => {
        setLoading(true);
        try {
          const response = await fetch("http://35.247.252.179:3333/tratamento");
          const data = await response.json();

          console.log("Resposta da API de tratamento:", data);

          // A resposta da API está em data.message, então precisamos acessar esse array
          if (Array.isArray(data.message)) {
            setTratamentos(data.message); // Atualiza o estado com o array de tratamentos
          } else {
            console.warn("A resposta não é um array:", data);
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
      <View style={styles.div1}>
        <Image
          source={require('../assets/PerfilLogo.png')}
          style={styles.image}
        />
        <Text style={styles.text1}>Seja Bem-Vindo</Text>
      </View>

      <Text style={styles.dateTime}>{currentDateTime.toLocaleString()}</Text>

      <Text style={styles.text2}>Meus medicamentos:</Text>

      {/* Tratamentos */}
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
            <Text>Dosagem: {item.dosagem ? `${item.dosagem}mg` : 'Sem dosagem'}</Text>
            <Text>📅 Início: {item.data_inicio ? format(new Date(item.data_inicio), 'dd/MM/yyyy') : 'Data desconhecida'}</Text>
            <Text>🛑 Fim: {item.data_fim ? format(new Date(item.data_fim), 'dd/MM/yyyy') : 'Data desconhecida'}</Text>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("inserirTratamento")}
        accessible={true}
        accessibilityLabel="Botão para adicionar um novo tratamento"
      >
        <Text style={styles.textButton}>Adiconar Tratamento</Text>
      </TouchableOpacity>
            <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("QRCode")}
        accessible={true}
        accessibilityLabel="Botão para acionar camera para QRCode"
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
  div1: {
    marginTop: 42,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
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
