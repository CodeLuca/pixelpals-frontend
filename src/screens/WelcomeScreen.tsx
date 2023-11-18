import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useWeb3Modal } from '@web3modal/wagmi-react-native';

const WelcomeScreen = ({ navigation }) => {
  const { open } = useWeb3Modal();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PixelPals</Text>
      <Text style={styles.subtitle}>Your Adventure Awaits</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => { open() }}>
        <Text style={styles.buttonText}>Connect your Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4e9af1',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default WelcomeScreen;
