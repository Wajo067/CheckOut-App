import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Camera, useCameraDevice, useCodeScanner} from 'react-native-vision-camera';

const ScanPage = ({navigation}: {navigation:any}) => {
      const device = useCameraDevice('front')
      const [barCode, setBarCode] = useState('')

      if (device == null) return <NoCameraDeviceError />

const codeScanner = useCodeScanner({
  codeTypes: ['qr', 'ean-13', 'ean-8'],
  onCodeScanned: (codes) => {
    console.log(codes[0].value)
    setBarCode(codes[0].value)
  }
})
      return (
        <View style={styles.container}>
            <Camera
              style={styles.camera}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
              />

            <Text>{barCode}</Text>
              </View>

      )
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  camera: {
    height: '29%',
    margin: 20,
  }
});

export default ScanPage;