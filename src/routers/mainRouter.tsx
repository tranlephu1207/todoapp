import { AuthenticationScreen, TodoScreen, resetAuthentication, selectAuthenticated } from '@features';
import { useDispatch, useSelector } from 'react-redux';

import { RootStackParamList } from './types';
import ScreenNames from './enums';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppState } from '@hooks';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainRouter = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const appState = useAppState();

  useEffect(() => {
    if (appState === 'inactive' || appState === 'background') {
      dispatch(resetAuthentication());
    }
  }, [appState, dispatch]);
  
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