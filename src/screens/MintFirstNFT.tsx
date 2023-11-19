import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { wallet_client } from '../web3/wagmi_client';
import { abis, ca } from '../web3/constants/contants'
import { readContract } from '@wagmi/core';
import { useAccount } from 'wagmi';

const MintFirstNFT = ({ navigation, route }) => {
  const { address } = useAccount();
  const mint_nft = async () => {
    if (!address) {
      return
    }
    await wallet_client.writeContract({
      address: ca.pixels,
      abi: abis.pixels,
      functionName: 'mintNFT',
      args: [tokenID, address]
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.feedbackText}>Your first PixelPal is on us.</Text>
      <Text style={styles.subtitle}>BAYC members receive a rare PixelPal</Text>
      {/* Display the NFT Image - replace with actual image URL */}
      {/* <Image source={{ uri: imageURL }} style={styles.nftImage} /> */}

      <TouchableOpacity style={styles.claimButton} onPress={() => {/* Claim logic */ }}>
        <Text style={styles.buttonText} onPress={mint_nft}>Claim Your PixelPal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8ffde',
  },
  feedbackText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontFamily: "PixelifySans",
    padding: 10,
    paddingTop: 0
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontFamily: "PixelifySans",
    marginBottom: 20,
    padding: 10,
    paddingTop: 0
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
    backgroundColor: '#C6FF00',
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

export default MintFirstNFT;
