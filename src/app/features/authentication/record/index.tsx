import React, { memo, useEffect, useState } from 'react';
import { Alert, Platform, TouchableOpacity } from 'react-native';

import isEqual from 'react-fast-compare';
import { createThumbnail } from 'react-native-create-thumbnail';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import Video from 'react-native-video';

import { Block, Button, Image, Text } from '@components';
import CameraRoll from '@react-native-community/cameraroll';
import Amplify, { Storage } from 'aws-amplify';
import RNFetchBlob from 'rn-fetch-blob';

import awsconfig from './aws-exports';
import { S3_BASE_URL } from '@env';

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

const RecordComponent = () => {
  const [asset, setAsset] = useState<Asset | null>(null);
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
        <Button onPress={downloadResource}>
          <Text>DOWNLOAD</Text>
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
      <Image source={{ uri: testUrl }} />
    </Block>
  );
};

export const Record = memo(RecordComponent, isEqual);
