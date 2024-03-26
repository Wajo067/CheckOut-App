import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Linking, TouchableOpacity, Image, Button} from 'react-native';
import {Camera, useCameraDevice, getCameraFormat} from 'react-native-vision-camera';

const CameraApp = () => {

    const camera = useRef<Camera>(null);
    const device = useCameraDevice('back');
    const format = getCameraFormat(device, [
            { photoResolution: 'max' },
            { autoFocusSystem: 'contrast-detection' }
        ]);

    const [showCamera, setShowCamera] = useState(false);
    const [imageSource, setImageSource] = useState('');

//     const isFocused = useIsFocused()
//     const appState = useAppState()
//     const isActive = isFocused && appState === "active"

//     const [isFocused, appState] = useState(true);

//     const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {
    async function getPermission() {
       const getPermission = await Camera.requestCameraPermission();
       console.log('Camera permission status: ${permission}');
       if (permission === 'denied') await Linking.openSettings();
    }
    getPermission();
    },
    []);

    async function capturePhoto() {
        if (camera.current !== null) {
          const photo = await camera.current.takePhoto({
            flash: 'on'
            });
          setImageSource(photo.path);
          setShowCamera(false);
          savePhoto(photo.path);
          console.log(photo.path);
        }
      }

    async function savePhoto(data: string) {
        const filename = await camera.current.takePhoto()
        await CameraRoll.save(`file://${file.path}`, {
          type: 'photo',
        });
        }

    async function fetchData() {
        const filename = await camera.current.takePhoto()
        const result = await fetch(`file://${file.path}`)
        const data = await result.blob();
        }

      if (device == null) {
        return <Text>Camera not available</Text>;
      }

    return (
        <View style={styles.container}>
          {showCamera ? (
            <>
              <Camera
                ref={camera}
                style={[StyleSheet.absoluteFill, styles.camera]}
                device={device}
                isActive={showCamera}
                photo={true}
            />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.camButton}
                  onPress={() => capturePhoto()}
                  />
              </View>
            </>
          ) : (
            <>
              <Button title="Launch Camera" onPress={() => setShowCamera(true)} />
              {imageSource !== '' ? (
                <Image
                  style={styles.image}
                  source={{uri: `file://'${imageSource}`
                  }}
               />
              ) : null}
            </>
          )}
        </View>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e5de',
  },
  camera: {
    height: '93%',
    },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    bottom: 0,
    padding: 20,
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 9 / 16,
  },
});

export default CameraApp;