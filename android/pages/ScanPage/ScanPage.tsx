import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {Camera, useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import firestore  from '@react-native-firebase/firestore';

const ScanPage = ({navigation}: {navigation:any}) => {
      const device = useCameraDevice('back')
      const [barCode, setBarCode] = useState('')
      const [scannedProduct, setScannedProduct] = useState('')
      const [products, setProducts] = useState([])

      if (device == null) return <NoCameraDeviceError />

      useEffect(() => {
        async function fetchData() {
          try {
            const snapshot = await firestore().collection("Products").get();
            const productList = snapshot.docs.map((doc) => doc.data());
            setProducts(productList)
            return productList;
          } catch (error) {
            console.error("Error fetching data:", error);
            return null;
          }
        }

        fetchData();
      }, []);


const codeScanner = useCodeScanner({
  codeTypes: ['qr', 'ean-13', 'ean-8'],
  onCodeScanned: (codes) => {
    console.log(codes[0].value)
    let product = products.filter(product => product.code == codes[0].value)
    if(product.length > 0){
        setScannedProduct(product[0])
        console.log(scannedProduct)
    }else{
        setScannedProduct('')
    }
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

              <View style={styles.container}>
                <Image source={{uri: scannedProduct.imgUrl}}
                    style={{width: 200, height: 200}} />
                <Text style={styles.bigBlue}>{scannedProduct.name || 'Not found!'}</Text>
                <Text style={styles.black}>Ksh: {scannedProduct.price || 'Not found!'}</Text>
              </View>



        </View>

      )
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    padding: 20,
    backgroundColor: 'transparent',
  },
  camera: {
    height: '26%',
    margin: 20,
  },
  bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 18,
    },
    black: {
      color: 'black',
      fontSize: 18,
    }
});

export default ScanPage;