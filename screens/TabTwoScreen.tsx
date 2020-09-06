import * as React from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('history')
    if(value !== null) {
      // value previously stored
      return value
    }
  } catch(e) {
    console.log(e)
  }
}
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  
  const [histrory, setHistrory] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let data = await getData ()
      console.log(data)
      setHistrory (data)
      
    })();
  }, []);

  let historyText : null | string = 'Loading'
  if (histrory) {
    historyText = histrory
  }

  return (
    <View style={styles.container}>
      <Text>{historyText}</Text>
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
