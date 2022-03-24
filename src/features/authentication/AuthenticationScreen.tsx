import { ActivityAction, startActivityAsync } from 'expo-intent-launcher';
import { Button, Image, Linking, Platform, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { RootStackScreenProps, ScreenNames } from '@routers';
import { authenticate, checkBiometricSupported, checkSavedBiometrics, getBiometricTypes } from './actions';
import { useDispatch, useSelector } from 'react-redux';

import { Images } from '@constants';
import { Text } from '@components';
import { selectAuthenticationData } from './selectors';
import { useAppState } from '@root/src/hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  prompTxt: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    width: '70%',
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type AuthenticationScreenProps = RootStackScreenProps<ScreenNames.Authentication>;


const AuthenticationScreen: React.FC<AuthenticationScreenProps> = () => {
  const dispatch = useDispatch();
  const appState = useAppState();

  const {
    hasSavedBiometrics,
    biometricTypes,
    isBiometricSupported,
  } = useSelector(selectAuthenticationData);
  
  const onCheckBiometricSupported = useCallback(() => {
    dispatch(checkBiometricSupported());
  }, [dispatch]);

  const onGetBiometricTypes = useCallback(() => {
    dispatch(getBiometricTypes());
  }, [dispatch]);

  const onCheckSavedBiometrics = useCallback(() => {
    dispatch(checkSavedBiometrics());
  }, [dispatch]);

  const onAuthenticate = useCallback(async () => {
    dispatch(authenticate());
  }, [dispatch]);

  const onHandleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:PASSCODE');
    } else {
      startActivityAsync(ActivityAction.SECURITY_SETTINGS);
    }
  };

  React.useEffect(() => {
    if (appState === 'active') {
      if (!isBiometricSupported) {
        onCheckBiometricSupported();
      }
      if (!biometricTypes) {
        onGetBiometricTypes();
      }
      onCheckSavedBiometrics();
    }
  }, [appState, biometricTypes, hasSavedBiometrics, isBiometricSupported, onCheckBiometricSupported, onCheckSavedBiometrics, onGetBiometricTypes]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={Images.icon} style={styles.icon}/>
        <Text style={styles.title}>{'Todo App'}</Text>
      </View>
      <View>
        {hasSavedBiometrics
          ?  
          <Button title="Authenticate" onPress={onAuthenticate} />
          :  
          <View style={styles.bottomContainer}>
            <Text style={styles.prompTxt}>{'You don\'t have any biometric enrolled on your device'}</Text>
            <Button title="Go to Settings" onPress={onHandleOpenSettings} />
          </View>
        }
      </View>
    </View>
  );
};

export default AuthenticationScreen;