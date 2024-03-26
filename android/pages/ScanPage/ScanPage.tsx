import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View, Pressable, Image, TextInput} from 'react-native';
import {Camera, useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import firestore  from '@react-native-firebase/firestore';
import { useCartContext, CartProvider } from "../../context/context";

const ScanPage = ({navigation}: {navigation:any}) => {
      const device = useCameraDevice('back')
      const [barCode, setBarCode] = useState('')
      const [quantity, setQuantity] = useState(1)
      const [scannedProduct, setScannedProduct] = useState('')
      const [products, setProducts] = useState([])
      const {cartItems, setCartItems} = useCartContext();

      console.log(cartItems)

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
  codeTypes: ['ean-13', 'ean-8'],
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
        <View style={styles.cameraContainer}>
            <Camera
              style={styles.camera}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
              />

            <View style={styles.container}>
              <Image source={{uri: scannedProduct.imgUrl}}
                  style={{width: 190, height: 190}} />
              <Text style={styles.bigBlue}>{scannedProduct.name || 'Not found!'}</Text>
              <Text style={styles.black}>Ksh: {scannedProduct.price || 'Not found!'}</Text>

              <Text>Quantity:</Text>

              <View style={styles.fixToText}>
                  <Pressable style={styles.button}
                    onPress={() => setQuantity(quantity-1)}
                    disabled={quantity <= 1}>
                    <Text style={styles.buttonText}>-</Text>
                  </Pressable>

                  <Text>{quantity}</Text>

                  <Pressable style={styles.button}
                    onPress={() => setQuantity(quantity+1)}>
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>
              </View>

              <Text>Total: {scannedProduct.price * quantity}</Text>

              {scannedProduct &&
              <View style={styles.fixToText}>
                  <Pressable style={styles.button}
                    onPress={() => setScannedProduct({})}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </Pressable>

                  <Pressable style={styles.button}
                    onPress={() => setCartItems(cartItems => [...cartItems, {...scannedProduct, quantity: quantity}])}>
                    <Text style={styles.buttonText}>Add To Cart</Text>
                  </Pressable>
              </View>
              }

             <Pressable style={styles.button}
               onPress={() => navigation.navigate('cart_page')}>
               <Text style={styles.buttonText}>Go To Cart</Text>
             </Pressable>

            </View>
        </View>

      )
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    padding: 20,
    backgroundColor: '#e8e5de',
//     height: '100%',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'starts',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  camera: {
    height: '40%',
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 90,
  },
  cameraContainer: {
    backgroundColor: '#e8e5de',
    marginTop: 20,
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