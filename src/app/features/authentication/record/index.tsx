import React, { memo, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import isEqual from 'react-fast-compare';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Video from 'react-native-video';

import { Block, Button, Image, Text } from '@components';
import Amplify, { Storage } from 'aws-amplify';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const RecordComponent = () => {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const selectFile = async () => {
    await launchImageLibrary(
      { mediaType: 'mixed' },
      (result: ImagePickerResponse) => {
        console.log('result: ', result);
        if (!result.assets) {
          Alert.alert(result.errorMessage || '');
          return;
        }
        setAsset(result.assets[0]);
      },
    );
  };

  const openCamera = async () => {
    launchCamera(
      {
        mediaType: 'mixed',
      },
      response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.errorMessage) {
          console.log('User tapped custom button: ', response.errorMessage);
        } else {
          console.log('response.assets', response.assets);
        }
      },
    );
  };

  const fetchResourceFromURI = async (uri: string) => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    return blob;
  };
  const uploadResource = async () => {
    if (isLoading) return;
    if (!asset) return;
    setisLoading(true);
    const img = await fetchResourceFromURI(asset.uri || '');
    return Storage.put(asset.uri || '', img, {
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
        Storage.get(res.key)
          .then(result => console.log(result))
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

  const renderAsset = () => {
    if (!asset) {
      return null;
    }
    console.log('type: ', asset.type);
    if (asset.type?.split('/')[0] === 'image') {
      console.log('image asset?.uri: ', asset?.uri);
      return <Image source={{ uri: asset?.uri ?? '' }} />;
    } else {
      console.log('video asset?.uri: ', asset?.uri);
      return <Video source={{ uri: asset?.uri ?? '' }} />;
    }
  };

  // user: amplify-Yj7ND
  // pwd: sB+/T3iQ*!nC5A.
  // accessKeyId: AKIAQKYX2CQYFPPAAEXS
  // secretAccessKey: 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

  // us-east-1
  // amplify pull --appId d22huvt3boh4ze --envName dev
  // render
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
      <Block style={{ marginTop: 60 }}>
        <Button onPress={uploadResource}>
          <Text>UPLOAD</Text>
        </Button>
      </Block>
      <Block style={{ marginTop: 60 }}>
        <Button onPress={openCamera}>
          <Text>OPEN CAMERA</Text>
        </Button>
      </Block>
      {renderAsset()}
      {asset && (
        <>
          <TouchableOpacity onPress={() => setAsset(null)}>
            <Text>Remove Selected Image</Text>
          </TouchableOpacity>
        </>
      )}
    </Block>
  );
};

export const Record = memo(RecordComponent, isEqual);
