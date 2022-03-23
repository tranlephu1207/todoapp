import { AuthenticationScreen, TodoScreen, resetAuthentication, selectAuthenticated } from '@features';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'react-native';
import { RootStackParamList } from './types';
import ScreenNames from './enums';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainRouter = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);

  const handleResetAuthentication = useCallback((newState) => {
    if (newState === 'inactive' || newState === 'background') {
      dispatch(resetAuthentication());
    }
  }, [dispatch]);

  useEffect(() => {
    AppState.addEventListener('change', handleResetAuthentication);

    return () => {
      AppState.removeEventListener('change', handleResetAuthentication);
    };
  }, [handleResetAuthentication]);
  
  return (
    <Stack.Navigator>
      {authenticated
        ?
        <Stack.Screen
          name={ScreenNames.Todo}
          component={TodoScreen}
        />
        :
        <Stack.Screen
          name={ScreenNames.Authentication}
          component={AuthenticationScreen}
          options={{ headerShown: false }}
        />
      }
    </Stack.Navigator>
  );
};

export default MainRouter;