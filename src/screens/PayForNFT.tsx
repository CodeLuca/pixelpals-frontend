import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NFTDisplayComponent from '../components/NFTDisplayComponent';

const PayForNFT = ({ route, navigation }) => {
  const [selectedChain, setSelectedChain] = useState('Polygon');
  const dummyData = { name: "loading...", rarity: "loading...", imageUrl: "https://placehold.it/100x100", tokenID: 1, price: 10 };
  const { name, rarity, imageUrl, tokenID, price } = route.params || dummyData;

  // Placeholder for payment logic
  const handlePayment = () => {
    // Implement payment logic here
    console.log(`Paying ${price} USDT on ${selectedChain} chain for tokenID: ${tokenID}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase PixelPal</Text>
      <Text style={styles.subtitle}>
        You can choose which chain you want to pay on. If you don’t have any USDT, you can grab some easily on your profile page.
      </Text>

      <NFTDisplayComponent name={name} rarity={rarity} imageUrl={imageUrl} />

      {/* Chain Selection Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Chain</Text>
        <Picker
          selectedValue={selectedChain}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedChain(itemValue)}>
          <Picker.Item label="Polygon" value="Polygon" />
          <Picker.Item label="Base" value="Base" />
          <Picker.Item label="Arbitrum" value="Arbitrum" />
          <Picker.Item label="Optimism" value="Optimism" />
        </Picker>
      </View>

      {/* Purchase Button */}
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Purchase for {price} USDT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8ffde',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "PixelifySans",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "PixelifySans",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "PixelifySans",
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    fontFamily: "PixelifySans",
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#C6FF00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontFamily: "PixelifySans",
    fontSize: 16,
  },
});

export default PayForNFT;
