import MainRouter from './mainRouter';
import { NavigationContainer } from '@react-navigation/native';

const Navigator = () => {
  return (
    <NavigationContainer>
      <MainRouter />
    </NavigationContainer>
  );
};

export default Navigator;