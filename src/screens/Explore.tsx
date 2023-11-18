import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const ExploreScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nfts, setNfts] = useState([
    // Dummy data for NFTs with location coordinates and other details
    { id: 'nft1', name: 'NFT One', rarity: 'Rare', imageUrl: 'https://placekitten.com/200/200', latitude: 37.78825, longitude: -122.4324 },
    // Add more NFTs here
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return <Text>Loading...</Text>;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={location}
      showsUserLocation={true}
    >
      {nfts.map(nft => (
        <Marker
          key={nft.id}
          coordinate={{ latitude: nft.latitude, longitude: nft.longitude }}
          title={nft.name}
        >
          <Image source={{ uri: "https://placekitten.com/200/200" }} style={styles.markerImage} />
          <Callout>
            <View style={styles.calloutView}>
              <Image source={{ uri: nft.imageUrl }} style={styles.nftImage} />
              <View style={{ flex: 1, padding: 10 }}>
                <Text style={styles.nftName}>{nft.name}</Text>
                <Text style={styles.nftRarity}>Rarity: {nft.rarity}</Text>
                <TouchableOpacity style={styles.marketplaceButton} onPress={() => navigation.navigate("Battle")}>
                  <Text style={styles.buttonText}>Battle</Text>
                </TouchableOpacity>
              </View>
              {/* Add distance calculation if needed */}
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  markerImage: {
    width: 60, // Set the size of the image
    height: 60,
    borderRadius: 60,
    borderColor: "black",
    borderWidth: 3
  },
  nftName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nftRarity: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  calloutView: {
    flex: 1,
    flexDirection: "row",
    width: 250,
    height: 110,
    padding: 3
  },
  nftImage: {
    marginBottom: 5,
    marginRight: 5,
    width: 100,
    height: 100,
  },
  marketplaceButton: {
    backgroundColor: '#4e9af1',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ExploreScreen;
