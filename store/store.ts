import { action, observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';

class ObservableStore {
  @observable history = [];
  API_KEY = '1e5ba5fd40020098fd0d2bb7e5018106';

  @action setHistory(newProperty: any) {
    this.history = newProperty;
  }

  @action getData = async () => {
    try {
      const value = await AsyncStorage.getItem('history');
      if (!value) {
        this.setHistory([]);
      } else {
        console;
        this.setHistory(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  @action storeData = async (value: any) => {
    try {
      this.setHistory(value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('history', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  @action clearStorageHistory = async () => {
    try {
      await AsyncStorage.removeItem('history');
      this.setHistory([]);
    } catch (e) {
      console.log(e);
    }
  };

  @action getWeather = async ({
    latitude,
    longitude
  }: {
    latitude: number;
    longitude: number;
  }) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${this.API_KEY}&units=metric`
    ).then(response => response.json());
  };

  @action initLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
    }
  };

  @action getCoords = async () => {
    Location.setApiKey('AIzaSyClysK3d4SsFgKaDzKcZn4OIxGbEzWB0u4');
    return await Location.getCurrentPositionAsync({});
  };

  @action getStringsLocation = async (coordinates: {
    latitude: number;
    longitude: number;
  }) => {
    return await Location.reverseGeocodeAsync(coordinates);
  };
}

const observableStore = new ObservableStore();
observableStore.getData();
observableStore.initLocation();

export default observableStore;
