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

const videoLink =
  'https://rnmobilefe7d9e3bc8d54535927316a80820c8f1212814-test.s3.us-east-1.amazonaws.com/public/e953eea1-ab65-49eb-8b3d-d76dccaa63ee.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAQKYX2CQYCLFBBPNJ%2F20220904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220904T172531Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLWVhc3QtMSJGMEQCICW%2BBxdx%2Fv%2FjRIwYnX25YnT1L3jFMzimg%2FK2jdyjo5%2FoAiA7IU26GuhivIdcLGTNoh0K8DWwIxd4fGsFBLeCHEaeDCqbBgjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAMaDDAyMzEzNTM5MjgxNiIMGddYKnKI0dCHQAWBKu8Fta9l2n%2BzSQMrLPAg83yoNrS6e4%2BoK99V%2BNeixUcsRtgXRKCENiECSl%2FZ36tD8XZfX%2F7hPeaoxht4LxkA%2BlhuFBkXvwjjcpsXwDm2skbBKdqK%2BmtZdWsEb3UYl9u6v9OAow6Fi5Dss5gACa%2FA9t9vt%2FN8jrL%2FToJx0Zu3M2ZSVpc836LLu9b%2FeJI%2BCFm8CW2eNkR7yGOPCEdBeo1ZHpXKAHdbYGPmqOAgT%2FQ%2Bv1Iob2KIcE9%2FuI5AAvQzpUXG6XrXt%2BLNKYZ9bogOjR2HA8e6iNNNghl%2BvG94o9hjSkeX%2BfgUpL3ZngaILK9fU4W2MwB13zlQotUVEfysTpBmL2xg0g5bfhMfFiP%2Fj17H7dFt1EDHkoZNCsSjgt1UbeaDmwSaAPKc3b9daCywyN8CoogkRVLY29LpE2v1S338UuUjLeJ8r9BFx17ApYIChy%2BChcwQfrNIKEALLh4dnuHjc0ycgeYRNT5OKXcYQzExLJaDm6aqxMHfARNYgeSJVpzO02WtTu3NpGfbP%2B8d20ft1uU9RH6YlDlUfPuEepoRjGHoVGJayJ2mhm%2Bj%2BwCPxOgMTC%2Fe8lkCYE3qpOoiRK6o5BXJLJuo2KxstqjwMPFkUyulpJyzv4Bm3uwceJKAc4zowJXqdosOC62iKAIzZo41YeMnwbsaxK3zafc7ae4tj8r%2BgkBNTJE1VKvm%2BhkBbL%2FU4SFJjCtBdQU67aa6NakL6dRQBW%2BvMWBkyMI5CbDYiHJ3sljszOtVCC3SF%2B6f0IbQRAB7qHeJZ1iaLHWMep%2FUX3iSBaWibP6dUpzrFotqgl%2FOMOFjGp94or1jEgxJz%2FRXhd%2FrZZLfCZ7UJ%2B68b2MGiEl16M3t8Fm69tTYXcJRiKuuiblmzuKPQ9K2LD%2BtIDk3fcizV3nqyFXhFjvlQNbuljnnTMNVc5E%2BIZmo4%2BlEK8Hy7R3ZJHizIsxTGUndjfetq0sO%2BkRkcaaPAuK9dn8HpA4%2BwfxEpOrynHM%2BEqsqMKFybjCGv9OYBjqIAkDWo%2FgVpCJ0bDFIozc2EWtPaiRQDBMjj88jURXCMpNhFp8OBvd0stqOeuDWUcgFBO7Zy6shAEg1KE6jSYZM%2F1OWrY%2Fzb0DwzXxMjm95bO7t1ZTX87F7yb5uuusuZJSornncOj1ZDHxq8Q%2BpIdvu14NILWQNVkacj%2BdkaT3V7mZNcMUCp37RfgPZuWjWq69GlC2fKQLpXLbm6HXnJTpR%2FOW6GRHe0YDS5OJFWHw%2BUZaS1QU7%2FlxH465Shrl18qiEN6BxINI5BfAB7AZld5wFoPpIlbCPQ%2FqZ%2B3fHW%2BVnHMSojhKfdsiinXYOdn4FA0z%2BXfkEo4CWGuwDNDHk%2BEQUzyU8wNaF4v4u1w%3D%3D&X-Amz-Signature=ed167fa897a39546d19ab8a9ad6ed585f2a683b2a0e4e15e8939f032aa6fe856&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.1%20os%2Fother%20lang%2Fjs%20md%2Fbrowser%2Funknown_unknown%20api%2Fs3%2F3.6.1%20aws-amplify%2F4.7.2_react-native&x-id=GetObject';

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
