import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useContractRead } from 'wagmi';
import { abis, ca } from '../web3/constants/contants';

const ExploreScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nfts, setNfts] = useState([
    { id: 2, name: 'Pixel#2', rarity: 'Super-Rare', imageUrl: 'https://ipfs.io/ipfs/bafybeifby6t7jclea4gh44x5yna7cnsvt6ruwvrpvqxnpp6xmf4i4uq2qi/1.png'},
    { id: 35, name: 'Pixel#35', rarity: 'Rare', imageUrl: 'https://ipfs.io/ipfs/bafybeifby6t7jclea4gh44x5yna7cnsvt6ruwvrpvqxnpp6xmf4i4uq2qi/8.png'},
    { id: 45, name: 'Pixel#45', rarity: 'Rare', imageUrl: 'https://ipfs.io/ipfs/bafybeifby6t7jclea4gh44x5yna7cnsvt6ruwvrpvqxnpp6xmf4i4uq2qi/9.png'},
    { id: 75, name: 'Pixel#75', rarity: 'Common', imageUrl: 'https://ipfs.io/ipfs/bafybeifby6t7jclea4gh44x5yna7cnsvt6ruwvrpvqxnpp6xmf4i4uq2qi/11.png'},
    { id: 85, name: 'Pixel#85', rarity: 'Common', imageUrl: 'https://ipfs.io/ipfs/bafybeifby6t7jclea4gh44x5yna7cnsvt6ruwvrpvqxnpp6xmf4i4uq2qi/12.png'},
  ]);
  const {data} = useContractRead({
    address: ca.random_coordinates,
    abi: abis.random_coordinates,
    functionName: 'getGeneratedData',
    chainId: 80001
  })
  const random_locations = data[0];
  console.log(random_locations);
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
      {nfts.map((nft, index) => (
        <Marker
          key={nft.id}
          coordinate={{ latitude: Number(random_locations[2*index])/100000, longitude: Number(random_locations[(2*index)+1])/100000 }}
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
