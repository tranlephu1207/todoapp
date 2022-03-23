import { RootStackParamList } from './types';
import ScreenNames from './enums';
import { TodoScreen } from '@features';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.Todo}
        component={TodoScreen}
      />
    </Stack.Navigator>
  );
};

export default MainRouter;