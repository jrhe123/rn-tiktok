import React, { memo, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import isEqual from 'react-fast-compare';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
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
