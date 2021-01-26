import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window') 

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.playersView}>
          <Text>Jogador 1</Text>
          <Text>Jogador 2</Text>
      </View>
      <View style={styles.viewCells}>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playersView:{
    width,
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cell:{
    height: 100,
    width: 100,
    backgroundColor: '#888',
    margin: 4
  },
  viewCells:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center'
  }
});
