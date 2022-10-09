import React, { memo, useEffect, useRef, useState } from 'react';
import { Alert, Platform, TouchableOpacity, View } from 'react-native';

import isEqual from 'react-fast-compare';
import { RNCamera } from 'react-native-camera';
import { createThumbnail } from 'react-native-create-thumbnail';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import Video from 'react-native-video';

import { Block, Button, Image, Text } from '@components';
import { S3_BASE_URL } from '@env';
import CameraRoll from '@react-native-community/cameraroll';
import Amplify, { Storage } from 'aws-amplify';
import RNFetchBlob from 'rn-fetch-blob';

import awsconfig from './aws-exports';

type configType = {
  fileCache: boolean;
  useDownloadManager?: boolean;
  notification?: boolean;
  mediaScannable?: boolean;
  title: string;
  path: string;
  appendExt?: string;
};

Amplify.configure(awsconfig);

const videoLink = S3_BASE_URL + '/03615426-ed78-42d1-9bab-2a22f7c16feb.mp4';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

const RecordComponent = () => {
  const camera = useRef<RNCamera | null>(null);
  const [asset, setAsset] = useState<Asset | null>(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const [testUrl, setTestUrl] = useState('');

  useEffect(() => {
    createThumbnail({
      url: videoLink,
      timeStamp: 10000,
    })
      .then(response => {
        console.log('check: ', response);
        setTestUrl(response.path);
      })
      .catch(err => console.log({ err }));
  }, []);

  const selectFile = async () => {
    await launchImageLibrary(
      { mediaType: 'mixed' },
      (result: ImagePickerResponse) => {
        // console.log('result: ', result);
        if (!result.assets) {
          Alert.alert(result.errorMessage || '');
          return;
        }
        setAsset(result.assets[0]);
      },
    );
  };

  const fetchResourceFromURI = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadResource = async () => {
    // if (isLoading) return;
    if (!asset || !asset.uri) return;
    setisLoading(true);
    const file = await fetchResourceFromURI(asset.uri);
    const fileName = uuid.v4() + '.' + file.type.split('/').slice(-1)[0];
    return Storage.put(fileName, file, {
      level: 'public',
      contentType: asset.type,
      progressCallback(uploadProgress) {
        setProgressText(
          `Progress: ${Math.round(
            (uploadProgress.loaded / uploadProgress.total) * 100,
          )} %`,
        );
        console.log(
          `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
        );
      },
    })
      .then(res => {
        setProgressText('Upload Done: 100%');
        setAsset(null);
        setisLoading(false);
        console.log('!!!!!!!!!!!');
        console.log('res: ', res);
        Storage.get(res.key)
          .then(result => {
            console.log('!!!!!!!!!!!');
            console.log('result: ', result);
          })
          .catch(err => {
            setProgressText('Upload Error');
            console.log(err);
          });
      })
      .catch(err => {
        setisLoading(false);
        setProgressText('Upload Error');
        console.log(err);
      });
  };

  const downloadResource = () => {
    const { dirs } = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb: configType = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'test.mp4',
      path: `${dirToSave}/test.mp4`,
    };
    const configOptions = Platform.select({
      ios: {
        appendExt: 'mp4',
        fileCache: configfb.fileCache,
        title: configfb.title,
        path: configfb.path,
      },
      android: configfb,
    });
    if (configOptions) {
      RNFetchBlob.config(configOptions)
        .fetch('GET', videoLink, {})
        .then(async res => {
          // if (Platform.OS === 'ios') {
          //   RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
          //   RNFetchBlob.ios.previewDocument(configfb.path);
          // }
          // console.log('The file saved to ', configfb.path);
          const result = await CameraRoll.save(configfb.path, {
            type: 'video',
          });
          console.log('result: ', result);
        })
        .catch(e => {
          console.log('The file saved to ERROR', e);
        });
    }
  };

  const submit = async () => {
    if (camera.current) {
      const { uri, codec = 'mp4' } = await camera.current.recordAsync();
      console.info(uri);
    }
  };
  const stop = () => {
    if (camera.current) {
      camera.current.stopRecording();
    }
  };

  const takePicture = async () => {
    if (camera.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await camera.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await camera.current.pausePreview();
        console.log('picture source', source);
      }
    }
  };

  const recordVideo = async () => {
    if (camera.current) {
      try {
        const videoRecordPromise = camera.current.recordAsync();
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          if (source) {
            console.log('video source', source);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  const stopVideoRecording = () => {
    if (camera.current) {
      camera.current.stopRecording();
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };

  const renderCam = () => {
    return (
      <RNCamera
        ref={camera}
        style={{
          width: '100%',
          height: 300,
        }}
        defaultVideoQuality={RNCamera.Constants.VideoQuality['480p']}
        type={cameraType}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({ status }) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => takePicture()}
                style={{
                  flex: 0,
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 15,
                  paddingHorizontal: 20,
                  alignSelf: 'center',
                  margin: 20,
                }}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onLongPress={recordVideo}
                onPressOut={stopVideoRecording}
                style={{
                  flex: 0,
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 15,
                  paddingHorizontal: 20,
                  alignSelf: 'center',
                  margin: 20,
                }}>
                <Text style={{ fontSize: 14 }}> record </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    );
  };

  const renderAsset = () => {
    if (!asset) {
      return null;
    }
    if (asset.type?.split('/')[0] === 'image') {
      return <Image source={{ uri: asset?.uri ?? '' }} />;
    } else {
      return <Video source={{ uri: asset?.uri ?? '' }} />;
    }
  };

  return (
    <Block
      block
      style={{
        backgroundColor: 'red',
        position: 'relative',
      }}>
      <Block style={{ marginTop: 60 }}>
        <Button onPress={selectFile}>
          <Text>SELECT {asset ? 'ANOTHER' : ''} FILE</Text>
        </Button>
      </Block>
      {/* <Block style={{ marginTop: 60 }}>
        <Button onPress={selectFile}>
          <Text>SELECT {asset ? 'ANOTHER' : ''} FILE</Text>
        </Button>
      </Block>
      <Block style={{ marginTop: 60 }}>
        <Button onPress={uploadResource}>
          <Text>UPLOAD</Text>
        </Button>
      </Block>
      <Block style={{ marginTop: 60 }}>
        <Button onPress={downloadResource}>
          <Text>DOWNLOAD</Text>
        </Button>
      </Block> */}
      {/* <Block style={{ borderWidth: 3, borderColor: 'green' }}>
        {renderCam()}
      </Block> */}
      {renderAsset()}
      {/* {asset && (
        <>
          <TouchableOpacity onPress={() => setAsset(null)}>
            <Text>Remove Selected Image</Text>
          </TouchableOpacity>
        </>
      )} */}
      {/* <Image source={{ uri: testUrl }} /> */}
    </Block>
  );
};

export const Record = memo(RecordComponent, isEqual);

// https://instamobile.io/react-native-tutorials/capturing-photos-and-videos-with-the-camera-in-react-native/
