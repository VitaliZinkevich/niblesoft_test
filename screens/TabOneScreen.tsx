import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity } from '../components/Themed';
import { inject, observer } from 'mobx-react';



export default inject('observableStore') (observer (function TabOneScreen({observableStore}) {
  const [location, setLocation] = React.useState(null);
  const [reverseLocation, setreverseLocation] = React.useState(null);
  const [wether, setWether] = React.useState(null);

  let locationText : null| string = 'Loading...';
  let reverseLocationText = '';
  let whetherString = '';

  React.useEffect(() => {
    (async () => {
      let location = await observableStore.getCoords();
      setLocation (location)
      let coordinates: {latitude: number,longitude: number}  = {latitude: location?.coords?.latitude, longitude: location?.coords?.longitude}
      let reverseLocation = await observableStore.getStringsLocation(coordinates);
      setreverseLocation (reverseLocation)
      let weather = await observableStore.getWeather(coordinates)
      setWether (weather)
    })();
  }, []);
  
  React.useEffect(() => {
    if (locationText && reverseLocationText && whetherString) {
      if (observableStore.history) {
        observableStore.storeData ([...observableStore.history, [new Date (Date.now()).toLocaleString(), locationText, reverseLocationText, whetherString]])
      } else {
        observableStore.storeData ([[new Date (Date.now()).toLocaleString(), locationText, reverseLocationText, whetherString]])
      }
    }
  })


  if (location) locationText =  `Координаты: ${location.coords?.latitude} ${location.coords?.longitude}`;
  if (reverseLocation && reverseLocation[0]) reverseLocationText = `Адрес: ${reverseLocation[0]?.country} ${reverseLocation[0]?.city} ${reverseLocation[0]?.street}`;
  if (wether) whetherString = `Погода: ${wether.weather[0].main}, ${wether.weather[0].description}, Температура: Факт ${wether.main.temp} Ощущается: ${wether.main.feels_like} и другое...`;

  return (
    <View style={styles.container}>
      <View>
      <TouchableOpacity
        onPress={() => {
          observableStore.toggleTheme()
        }}
      >
        <Text>Сменить тему</Text>
      </TouchableOpacity>  
    </View> 
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Text>{locationText}</Text>
        <Text>{reverseLocationText}</Text>
        <Text>{whetherString}</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}))

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
  buttonText: {
    fontSize: 20,
  },
});

