import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const YouWonScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.subtitle}>You Won the Battle</Text>

      {/* Display the NFT Image - replace with actual image URL */}
      <Image source={{ uri: route.params?.nftImageUrl || 'https://placekitten.com/200/200' }} style={styles.nftImage} />

      <TouchableOpacity style={styles.claimButton} onPress={() => { navigation.navigate("Home") }}>
        <Text style={styles.buttonText}>Claim Your PixelPal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6f2ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    color: 'green',
    marginBottom: 20,
  },
  nftImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  claimButton: {
    backgroundColor: '#4e9af1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // ... other styles ...
});

export default YouWonScreen;