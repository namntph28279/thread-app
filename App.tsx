import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import AuthStack from './navigation/AuthRoutes';
import LoadingScreen from './navigation/components/Loading';
import MainStack from './navigation/MainStack';
import { UserContext, UserType } from './UserContext';

function App() {
  const userContext = useContext(UserType);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { isAuth, setIsAuth } = userContext;

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [setIsAuth]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuth ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function AppWrapper() {
  return (
    <UserContext>
      <App />
    </UserContext>
  );
}
