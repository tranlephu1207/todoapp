import * as LocalAuthentication from 'expo-local-authentication';

import { Text, View } from '../components/Themed';

import { Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import React from 'react';
import { RootTabScreenProps } from '../types';
import { StyleSheet } from 'react-native';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      console.log('compatible', compatible);
      const biometricType =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      console.log('biometricType', biometricType);
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const onAuthenticate = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    console.log(savedBiometrics);
    if (savedBiometrics) {
      // LocalAuthentication.authenticateAsync();
      const result = await LocalAuthentication.authenticateAsync();
      console.log(result);
      if (result.success) {
      }
    }
    // const result = await LocalAuthentication.authenticateAsync();
    // console.log(result);
    // if (result.success) {

    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Text>
        {isBiometricSupported
          ? 'Your device is compatible with Biometrics'
          : 'Face or Fingerprint scanner is available on this device'}
      </Text>
      <Button title="Authenticate" onPress={onAuthenticate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
