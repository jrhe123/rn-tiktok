import React, { memo, useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

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
import Amplify, { Storage } from 'aws-amplify';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const videoLink =
  'https://rnmobilefe7d9e3bc8d54535927316a80820c8f1212814-test.s3.us-east-1.amazonaws.com/public/861a5860-8bc4-4fa8-816c-9ca415586621.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAQKYX2CQYEO4VJR6R%2F20220904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220904T013508Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLWVhc3QtMSJHMEUCIEW8%2BoQqkYCyGnkg16gfbu%2B6kezAPadU19RyzIGHFWNfAiEA7I2GD%2FxNr3fGWjuccT0n9MkrMCsQprdD6Txr%2BQ8mnpoqmwYIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgwwMjMxMzUzOTI4MTYiDHQRMnYE32m6cnTZIyrvBXu63PG7PkuNlDtqcZOx3EBVOWV5%2BlvdakNz0PogCIn%2F%2B5UbG3hlyluDNisIhFVMBlgtmCSK3D3sGK9q7oWpiIRzem1A2B5GmigoNRSxjXxq2HUegV9x2dJGujfDZcYCfeuMn38BAVmqXFK1msWq0eqFyIO7SS6lZjmBJcCDYtlLkA1TzzRgx7qjTO4OQPJb5mbx7mNXWsPI0bmNdicBMNHNYxBKmrurYPagbaGH8JH7SE%2B9HHwlT1ZYYtv3mVcTKhctMI3s5s6b3tKCk%2BJowBE2JMwcXEYyCodBMZofTFWYhItMQ9drB4diiXWbY7dIILombvEUmpvAYlHIsis0hpID9qELW9E2bUNsJvzrE1g5kJxq%2FDrICLXLBihUc3GSXyHYJtLXbse7YwVqV7dIT5lbsS2LQeda9za%2FvD2ZQ1H0rWZKmXhJKWILexCmFCFwWiN6WC11VAimEvDcBTJEvUzkFWvaZ6PUlAPAFTHZ6%2FQSxLiHIrBqfYzFHSbcV8TJG26pZeZ8mVWK0%2F7TVbZcGVe1StKd30kk8cyCnWsUISftFZAYuhkxpdJk7Fai329WRw7YxUB%2FFfKaFRfTC2Hd4Q9vpktzoaCOKMNeoihfsJmEeTlP3oFVZJcuwpYrRcKRqUo8sQxXUXvkA6jNn%2Fhpn95J5Yi7mYsjO9n2pngGKJKKX5i86gbAM%2BEyVT0ITZzsw4TvlohVh4kmUXNtI2LZkCZCT3eXmWVU5dpBJor2%2FXscFUkzyOT3HbwHdNyujMiTWXEu2oAvbf2UvN%2BuDiajHOJMMM8U5oiHgru0jWh9CZZw%2FpV7gm7Mnrl4YEOxFGgFx8rBmpqfO1BLPku0fPqywfr%2F0GIMARl4%2FQvM9o0mDvkQ5c9xPDsHxHtqPrjQDTu5%2FDK5Da4IvPJI6e3bcM4xuI4eqUj%2Fw4F7fx%2BmSKZmbg6rHrcKLh515X1NFuqsWqiEve2OYE89LpRUAuwuFGSE4h0RifcM6CMQlMxChHrLq7owy4HQmAY6hwIZ%2BQvXlEEZbI64bBdfkldyeWBlbwaYnLMTxpWn7SRSRmGyepaReMoGPO181PIOP4Jbx0mgx7iU6YiWAwUq2TjfxwMk0OVZCSsZY%2BmQ%2BjVfq4hFtCnjTtjbfx6qdlpilI5zAFEdxf%2Fyh0ECwzG53kkStLdhZLa59fPuTN75E1qRxwjaiXv5dDV5yDUb1tKfB3q9xfDkO5gyO%2FROho%2BIMLwL8nG0JOFCpsaKxDbi3SgsCgxgCn6DgZJZstFyR6yTAgke0eENkYlel301ObwWtuBtq%2BWsAezmbCpcRI5veWtWsqer%2B9FwMa1OSCKQAGhSTm0WvQuoU0xOY%2FG3GEAR1Sw2B4ceUeZLbQ%3D%3D&X-Amz-Signature=4a7d7bac267b43f58b74a307230dfa04f97d9ea996b0a9c7cf474be6d2cda04c&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.1%20os%2Fother%20lang%2Fjs%20md%2Fbrowser%2Funknown_unknown%20api%2Fs3%2F3.6.1%20aws-amplify%2F4.7.2_react-native&x-id=GetObject';

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
        setTestUrl(response.path);
      })
      .catch(err => console.log({ err }));
  }, []);

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
      <Image source={{ uri: testUrl }} />
    </Block>
  );
};

export const Record = memo(RecordComponent, isEqual);
