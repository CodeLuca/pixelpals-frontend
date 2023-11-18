import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const ExploreScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nfts, setNfts] = useState([
    // Dummy data for NFTs with location coordinates and other details
    { id: 'nft1', name: 'NFT One', rarity: 'Rare', imageUrl: 'https://example.com/nft1.jpg', latitude: 37.78825, longitude: -122.4324 },
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
          <Callout>
            <View style={styles.calloutView}>
              <Image source={{ uri: nft.imageUrl }} style={styles.nftImage} />
              <Text>{nft.name}</Text>
              <Text>Rarity: {nft.rarity}</Text>
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
  calloutView: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nftImage: {
    width: 50,
    height: 50,
  },
});

export default ExploreScreen;
