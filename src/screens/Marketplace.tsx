import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

const nftData = [
  {
    id: '1',
    name: 'Mystic Dragon',
    rarity: 'Ultra Rare',
    imageUrl: 'https://placekitten.com/200/200' // Replace with actual image URLs
  },
  {
    id: '2',
    name: 'Space Whale',
    rarity: 'Rare',
    imageUrl: 'https://placekitten.com/201/201'
  },
  // Add more dummy items as needed
];

const NFTComponent = ({ name, rarity, imageUrl, navigation }) => {
  return (
    <View style={styles.nftContainer}>
      <Image source={{ uri: imageUrl }} style={styles.nftImage} />
      <Text style={styles.nftName}>{name}</Text>
      <Text style={styles.nftRarity}>{rarity}</Text>
      <TouchableOpacity style={styles.marketplaceButton} onPress={() => navigation.navigate("ListOnMarketPlace  ")}>
        <Text style={styles.buttonText}>Buy for 2 USDT</Text>
      </TouchableOpacity>
    </View>
  );
};

const Marketplace = ({ walletAddress = '0x123...abc', navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Marketplace</Text>
          <Text style={styles.subtitle}>This is a public marketplace for users to buy and sell their
            PixelPals</Text>
        </View>
      </View>
      <FlatList
        data={nftData}
        renderItem={({ item }) => (
          <NFTComponent
            navigation={navigation}
            name={item.name}
            rarity={item.rarity}
            imageUrl={item.imageUrl} />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.nftList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontFamily: "PixelifySans",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "PixelifySans",
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: "PixelifySans",
    paddingTop: 5,
    fontSize: 16,
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#C6FF00',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    fontFamily: "PixelifySans",
    color: 'white',
    fontSize: 16,
  },
  nftList: {
    paddingHorizontal: 10,
  },
  nftContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  nftImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  nftName: {
    fontWeight: 'bold',
    fontFamily: "PixelifySans",
    fontSize: 16,
  },
  nftRarity: {
    fontSize: 14,
    fontFamily: "PixelifySans",
    color: 'gray',
    marginBottom: 10,
  },
  marketplaceButton: {
    backgroundColor: '#C6FF00',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "PixelifySans",
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Marketplace;
