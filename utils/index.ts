import { Dimensions } from 'react-native';

// Lấy chiều rộng và chiều cao của màn hình
const { width, height } = Dimensions.get('window');

export const screenWidth = width;
export const screenHeight = height;
export const URL = 'http://192.168.21.108:3000';
