import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import Colors from '../constants/Colors'



export default function TermsAndConditionScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 40, fontWeight: 'bold' }}>BAYAQ</Text>
    </View>
  );
}

TermsAndConditionScreen.navigationOptions = {
  header: null,
};

TermsAndConditionScreen.path = '/terms'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center'
  },
});
