import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { screenWidth } from '../utils';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const navigation = useNavigation<any>();

  const handleNavigation = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password
    }

    axios
      .post('http://192.168.21.107:3000/register', user)
      .then((res) => {
        console.log(res);
        Alert.alert(
          'Registration successfully',
          'you have been registered successfully'
        );
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch((err) => {
        Alert.alert(
          'Registration failed',
          'An error occurred during registration'
        )
        console.error('error', err)
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
          <Text style={styles.title}>Register To Your Account</Text>
        </View>

        <View style={styles.containerInput}>
          <Ionicons style={styles.icon} name="person" size={24} color="gray" />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder='Enter your name'
            style={[styles.input, { fontSize: password ? 16 : 16 }]}
          />
        </View>

        <View style={styles.containerInput}>
          <MaterialIcons style={styles.icon} name="email" size={24} color="gray" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder='Enter your Email'
            style={[styles.input, { fontSize: email ? 16 : 16 }]}
          />
        </View>

        <View style={styles.containerInput}>
          <AntDesign style={styles.icon} name="lock" size={24} color="gray" />
          <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder='Enter your Password'
            style={[styles.input, { fontSize: password ? 16 : 16 }]}
          />
        </View>

        <Pressable style={styles.btnLogin} onPress={handleRegister}>
          <Text style={styles.textLogin}>Register</Text>
        </Pressable>

        <Pressable style={styles.btnSignUp} onPress={handleNavigation}>
          <Text style={styles.textSignUp}>Already have an account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default RegisterScreen

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