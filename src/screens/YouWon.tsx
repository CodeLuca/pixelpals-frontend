import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const YouWonScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.feedbackText}>You Won and managed to capture a PixelPal!</Text>

      {/* Display the NFT Image - replace with actual image URL */}
      <Image source={{ uri: route.params?.nftImageUrl || 'https://placekitten.com/200/200' }} style={styles.nftImage} />

      <TouchableOpacity style={styles.claimButton} onPress={() => {/* Claim logic */ }}>
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
  feedbackText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
    fontFamily: "PixelifySans",
    marginBottom: 20,
    padding: 10,
  },
  nftImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
  },
  claimButton: {
    alignItems: "center",
    borderColor: '#333',
    borderWidth: 2,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#333',
    fontFamily: "PixelifySans",
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default YouWonScreen;
