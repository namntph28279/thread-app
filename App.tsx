import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        setLoading(!isLoading)
      }}>
        <Text>Hello world</Text>
      </TouchableOpacity>

      {isLoading ? (
        <View>
          <TextInput style={{ borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 4 , width: width - 50 }} placeholder='eehhehehe' />
        </View>
      ) : (
        <View>
          <Image style={{ height: 100, width: 100 }} source={{ uri: 'https://vcdn1-giaitri.vnecdn.net/2022/09/23/-2181-1663929656.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=apYgDs9tYQiwn7pcDOGbNg' }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
