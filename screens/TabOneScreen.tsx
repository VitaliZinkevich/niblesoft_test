import * as React from 'react';
import { StyleSheet } from 'react-native';

import { AsyncStorage } from 'react-native';
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
  const [history, setHistory] = React.useState(null);
  

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('history');
      if (!value) {
        return false;
      } else {
        return JSON.parse (value);
      }
    } catch(e) {
      console.log(e)
    }
  }

  let locationText : null| string = 'Loading...';
  let reverseLocationText = '';
  let whetherString = '';

  React.useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem('history')
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
      let data = await getData();
      await setHistory (data? data : [])
    })();
  }, []);
  
  React.useEffect(() => {
    if (locationText && reverseLocationText && whetherString) {
      if (history) {
        storeData ([...history, [new Date (Date.now()).toLocaleString(), locationText, reverseLocationText, whetherString]])
      } else {
        storeData ([[new Date (Date.now()).toLocaleString(), locationText, reverseLocationText, whetherString]])
      }
    }
  }, [history])


  if (errorMsg) {
    locationText = errorMsg;
  } 

  if (location) locationText =  `Координаты: ${location.coords?.latitude} ${location.coords?.longitude}`;
  if (reverseLocation && reverseLocation[0]) reverseLocationText = `Адрес: ${reverseLocation[0]?.country} ${reverseLocation[0]?.city} ${reverseLocation[0]?.street}`;
  if (wether) whetherString = `Погода: ${wether.weather[0].main}, ${wether.weather[0].description}, Температура: Факт ${wether.main.temp} Ощущается: ${wether.main.feels_like} и другое...`;
  

  return (
    <View style={styles.container}>
      <Text>{locationText}</Text>
      <Text>{reverseLocationText}</Text>
      <Text>{whetherString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
