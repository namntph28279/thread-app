import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenWidth } from '../utils';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<any>();

  const handleNavigation = () => {
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    console.log('login');

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

        <Pressable style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.textLogin}>Login</Text>
        </Pressable>

        <Pressable style={styles.btnSignUp} onPress={handleNavigation}>
          <Text style={styles.textSignUp}>Don't have an account? Sign Up</Text>
        </Pressable>
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