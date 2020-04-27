import AsyncStorage from '@react-native-community/async-storage';

export const isLoged = async () => {
  return await AsyncStorage.getItem('token').then((res) => res);
};

export const logout = async () => {
  return await AsyncStorage.clear();
};
