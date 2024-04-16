import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View, Pressable, Image, TextInput, ToastAndroid, Alert} from 'react-native';
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
      const showToast = () => {
          ToastAndroid.show('Added Successfully!!!', ToastAndroid.LONG);
        };

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

const addQuantity = () => {
    const item = {...cartItems.find((item) => item.code === scannedProduct.code)};
    const newItem = {...item, quantity: item.quantity + quantity};
    const index = cartItems.findIndex((item) => item.code === scannedProduct.code);

    cartItems[index] = newItem;

    setCartItems(cartItems);
}

function addToCart(){
    setScannedProduct({});
    setQuantity(1);
    if(cartItems.find((item) => item.code === scannedProduct.code)){
        Alert.alert(
               //This is title
              "Product in Cart",
                //This is body text
              "Add quantity?",
              [
                {text: 'No', onPress: () => {setScannedProduct({});setQuantity(1);}},
                {text: 'Yes', onPress: () => addQuantity()},
              ],
              //on clicking out side, Alert will not dismiss
            );
    }else{
        setCartItems(cartItems => [...cartItems, {...scannedProduct, quantity: quantity}]);
        showToast();

    }
}

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

              <Text style={styles.black}>Quantity:</Text>

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

              <Text style={styles.black}>Total: {scannedProduct.price * quantity}</Text>

              {scannedProduct &&
              <View style={styles.fixToText}>
                  <Pressable style={styles.addButton}
                    onPress={() => {setScannedProduct({}); setQuantity(1);}}>
                    <Text style={styles.buttonText}>X</Text>
                  </Pressable>

                  <Pressable style={styles.addButton}
                    onPress={addToCart}>
                    <Text style={styles.buttonText}>✔</Text>
                  </Pressable>
              </View>
              }

             <Pressable style={styles.cartButton}
               onPress={() => navigation.navigate('cart_page')}>
               <Text style={styles.buttonText}>View Cart</Text>
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
  addButton: {
    width: 69,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: 'black',
    },
  cartButton: {
    width: 140,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: 'black',
    bottom: 0,
  },
  camera: {
    height: '45%',
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