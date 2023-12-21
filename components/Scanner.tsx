import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ScannerOption from './ScannerOption';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { actionName } from '../redux/actionName';
import { setStatusBar } from '../redux/actions';
const QRCodeScannerScreen = () => {
  const [isFlashOn, setFlashOn] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // Cleanup function to reset status bar when component unmounts
    dispatch(setStatusBar({
      color: 'black',
      style: 'light-content'
    }))

    return () => {
      dispatch(setStatusBar({
        color: 'transparent',
        style: 'dark-content'
      }))
    }
  }, []);

  const onSuccess = (e: { data: any; }) => {
    console.log('QR Code data:', e.data);
    // Handle the QR code data here
  };

  const toggleFlash = () => {
    setFlashOn((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker
        reactivate
        reactivateTimeout={2000}
        flashMode={isFlashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        bottomContent={<ScannerOption />}
        containerStyle={styles.scannerContainer}
        markerStyle={styles.marker}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleFlash} style={[styles.button, { opacity: isFlashOn ? 0.1 : 1 }]}>
          <Icon name={'flash'} size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  scannerContainer: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    borderColor: '#FFF',
    borderRadius: 10,
    borderWidth: 2,
  },
  buttonContainer: {
    position: 'absolute',
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35353577',
    bottom: 150,
    right: 20
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 60,
    width: 60,

  },

});

export default QRCodeScannerScreen;
