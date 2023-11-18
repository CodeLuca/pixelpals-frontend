// ⚠️ Important: `@walletconnect/react-native-compat` needs to be imported before other `wagmi` packages.
// This is because Web3Modal has a polyfill necessary for the TextEncoder API.
import '@walletconnect/react-native-compat';
import React, { useCallback } from 'react';
import { View } from "react-native";
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useAccount } from 'wagmi';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from '@web3modal/wagmi-react-native';
import { WagmiConfig } from 'wagmi';
import { mainnet, polygon, arbitrum, polygonMumbai, baseGoerli } from 'wagmi/chains';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Wallet from './src/screens/Wallet';
import ProfileScreen from './src/screens/ProfileScreen';
import Explore from './src/screens/Explore';
import Marketplace from './src/screens/Marketplace';
import ListOnMarketplace from './src/screens/ListOnMarketplace';
import Battle from './src/screens/Battle';
import YouWon from './src/screens/YouWon';
import YouLost from './src/screens/YouLost';

const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_CLOUD_PROJECT_ID;

// Metadata to show about the dApp when deep-linking to the wallet
const metadata = {
  name: 'Example dApp',
  description: 'Modern dApp example from Callstack',
  url: 'https://callstack.com/',
  icons: ['https://avatars.githubusercontent.com/u/42239399'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

// Chains that will be supported by the dApp
const chains = [mainnet, polygon, polygonMumbai, arbitrum, baseGoerli];

// Create wagmi config
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Create actual Web3Modal instance
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  defaultChain: baseGoerli
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  const { address } = useAccount()
  return (
    <Tab.Navigator>
      <Tab.Screen name="Wallet" component={Wallet} />
      {
        address && <Tab.Screen name="Profile" component={ProfileScreen} />
      }
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Marketplace" component={Marketplace} />
      {/* ... other tab screens */}
    </Tab.Navigator>
  );
}

function App() {
  const [fontsLoaded] = useFonts({
    'PixelifySans': require('./assets/PixelifySans.ttf'),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <Web3Modal />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Battle" component={Battle} options={{ headerShown: true }} />
          <Stack.Screen name="ListOnMarketPlace" component={ListOnMarketplace} options={{ title: "", headerBackTitle: "Profile" }} />
          <Stack.Screen name="YouWon" component={YouWon} options={{ title: "You Won", headerBackTitle: "Profile" }} />
          <Stack.Screen name="YouLost" component={YouLost} options={{ title: "You Lost", headerBackTitle: "Profile" }} />
          {/* ... other non-tab screens */}
        </Stack.Navigator>
      </NavigationContainer>
    </WagmiConfig>
  );
}

export default App;