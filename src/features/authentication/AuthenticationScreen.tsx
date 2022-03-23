import * as LocalAuthentication from 'expo-local-authentication';

import { ActivityAction, startActivityAsync } from 'expo-intent-launcher';
import { Button, Linking, Platform, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { RootStackScreenProps, ScreenNames } from '@routers';

import { authenticate } from './actions';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type AuthenticationScreenProps = RootStackScreenProps<ScreenNames.Authentication>;


const AuthenticationScreen: React.FC<AuthenticationScreenProps> = () => {
  const dispatch = useDispatch();
  
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:PASSCODE');
    } else {
      // Linking.openSettings();
      startActivityAsync(ActivityAction.SECURITY_SETTINGS);
    }
  };

  React.useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const biometricType =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      console.log('biometricType', biometricType);
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const onAuthenticate = useCallback(async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    console.log('savedBiometrics', savedBiometrics);
    if (savedBiometrics) {
      dispatch(authenticate());
    } else {
      handleOpenSettings();
    }
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button title="Authenticate" onPress={onAuthenticate} />
    </View>
  );
};

export default AuthenticationScreen;