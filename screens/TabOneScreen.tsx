import * as React from 'react';
import { StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { Text, View } from '../components/Themed';
import * as Location from 'expo-location';

const API_KEY = '1e5ba5fd40020098fd0d2bb7e5018106';

function getWeather ({latitude, longitude}) {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`)
    .then(response => response.json())
}

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('history', jsonValue)
  } catch (e) {
    // saving error
  }
}

export default function TabOneScreen() {

  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [reverseLocation, setreverseLocation] = React.useState(null);
  const [wether, setWether] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }



      let location = await Location.getCurrentPositionAsync({});
      setLocation (location)
      let coordinates: {latitude: number,longitude: number}  = {latitude: location?.coords?.latitude, longitude: location?.coords?.longitude}
      let reverseLocation = await Location.reverseGeocodeAsync(coordinates)
      setreverseLocation (reverseLocation)
      let weather = await getWeather(coordinates)
      setWether (weather)
      storeData ({data: 111})
      
    })();
  }, []);

  let locationText : null| string = 'Loading...';
  let reverseLocationText = '';
  let whetherString = '';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = JSON.stringify(location);
    reverseLocationText = JSON.stringify(reverseLocation);
    whetherString = JSON.stringify(wether);
  }

  return (
    <View style={styles.container}>
    <Text>{locationText}</Text>
    <Text>{reverseLocationText}</Text>
    <Text>{whetherString}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
