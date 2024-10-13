import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserType } from '../UserContext';
import { screenWidth, URL } from '../utils';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<any>();
  const { setIsAuth } = useContext(UserType);

  const handleNavigation = () => {
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    const user = {
      email: email,
      password: password
    }

    axios.post(`${URL}/login`, user).then((res) => {
      const token = res.data.token;

      AsyncStorage.setItem('authToken', token);
      setIsAuth(true);
    }).catch((error) => {
      Alert.alert('Login error');
      console.error('error', error);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={{ uri: 'https://logos-world.net/wp-content/uploads/2023/07/Threads-Logo.png' }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Login To Your Account</Text>
        </View>

        <View style={styles.containerInput}>
          <MaterialIcons style={styles.icon} name="email" size={24} color="gray" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder='enter your Email'
            style={[styles.input, { fontSize: email ? 16 : 16 }]}
          />
        </View>

        <View style={styles.containerInput}>
          <AntDesign style={styles.icon} name="lock" size={24} color="gray" />
          <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder='enter your Password'
            style={[styles.input, { fontSize: password ? 16 : 16 }]}
          />
        </View>

        <View style={styles.containerFooter}>
          <Text>Keep me logged in</Text>
          <Text style={styles.textForgotPassword}>Forgot password</Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.btnSignUp} onPress={handleNavigation}>
          <Text style={styles.textSignUp}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  containerLogo: {
    marginTop: 50,
  },
  containerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
  },
  containerInput: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    paddingVertical: 4,
    borderRadius: 8,
    width: screenWidth - 32,
  },
  input: {
    marginVertical: 12,
    color: 'gray',
    flex: 1,
    height: '100%'
  },
  icon: {
    marginLeft: 8
  },
  containerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12
  },
  textForgotPassword: {
    fontWeight: '500',
    color: '#007FFF'
  },
  btnLogin: {
    width: screenWidth - 220,
    backgroundColor: 'black',
    padding: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    marginTop: 40
  },
  textLogin: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnSignUp: {
    marginTop: 10
  },
  textSignUp: {
    textAlign: 'center',
    fontSize: 16
  },
})