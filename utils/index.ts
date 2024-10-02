import { Dimensions } from 'react-native';

// Lấy chiều rộng và chiều cao của màn hình
const { width, height } = Dimensions.get('window');

export const screenWidth = width;
export const screenHeight = height;
