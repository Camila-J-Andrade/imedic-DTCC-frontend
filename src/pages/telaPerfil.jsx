import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

export default function Perfil({ navigation, route }) {

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/Rectangle 1.png')}
                    style={styles.rectangle}
                />
                <Text style={styles.text1}>Meu Perfil</Text>
            </View>

            <View style={styles.div1}>
                <Image
                    style={styles.logo}
                    source={require('../assets/PerfilLogo.png')}
                />
            </View>

            {/* Nome do usuário exibido */}
            <Text style={styles.text2}>Usuario</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Alterar foto de perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('TabBar')}
            >
                <Text style={styles.textButton}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity                 
                style={styles.button}
                onPress={() => navigation.navigate('Setting')}
            >
                <Text style={styles.textButton}>Configurações</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button1}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.textButton}>Sair da minha conta</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Distribuído por:</Text>
                <Image source={require('../assets/logoTechFlint.png')} style={styles.marca} />
                <Text style={styles.footerText}>2024</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff3ec',
        alignItems: 'center',
    },
    header: {
        width: 450,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 20,
        marginTop: 15
    },
    rectangle: {
        position: 'absolute',
        width: '100%',
        height: 165,
        resizeMode: 'cover',
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
    button: {
        width: 234,
        height: 40,
        alignItems: 'center',
        backgroundColor: '#89EBF6',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginTop: 12,
    },
    button1: {
        width: 234,
        height: 40,
        alignItems: 'center',
        backgroundColor: '#1C6789',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginTop: 12,
    },
    textButton: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
    },
    text1: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        zIndex: 1,
    },
    text2: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '500',
    },
    div1: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    div2: {
        alignItems: 'center',
        margin: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#444',
    },
    marca: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginVertical: 4,
    },
});
