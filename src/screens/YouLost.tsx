import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const YouWonScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.feedbackText}>The PixelPal Got Away!</Text>

      {/* Display the NFT Image - replace with actual image URL */}
      <Image source={{ uri: route.params?.nftImageUrl || 'https://placekitten.com/200/200' }} style={styles.nftImage} />

      <TouchableOpacity style={styles.claimButton} onPress={() => { navigation.navigate("Explore") }}>
        <Text style={styles.buttonText}>Back to Explore</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "90%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6f2ff',
  },
  feedbackText: {
    fontFamily: "PixelifySans",
    fontSize: 28,
    fontWeight: 'bold',
    color: 'darkred',
    marginBottom: 20,
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
