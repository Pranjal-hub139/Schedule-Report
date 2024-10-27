import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSreen from './src/Screens/LoginScreen';
import  Home from './src/Screens/Home';
import LoginScreen from './src/Screens/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import DoneModal from './src/CalederComponents/DoneModal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
