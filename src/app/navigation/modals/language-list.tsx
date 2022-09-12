import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeModules,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { dispatch } from '@common';
import {
  Block,
  BottomSheet,
  BottomSheetRef,
  Button,
  CheckBox,
  Icon,
  Text,
} from '@components';
import { appActions } from '@redux-slice';

type Language = {
  id: string;
  name: string;
  isSelected: boolean;
};
const languages: Language[] = [
  {
    id: '1',
    name: 'English',
    isSelected: true,
  },
  {
    id: '2',
    name: 'Español',
    isSelected: true,
  },
  {
    id: '3',
    name: 'العربية',
    isSelected: false,
  },
  {
    id: '4',
    name: 'Deutsch',
    isSelected: false,
  },
  {
    id: '5',
    name: 'Suomi',
    isSelected: false,
  },
  {
    id: '6',
    name: 'Français',
    isSelected: false,
  },
  {
    id: '7',
    name: 'Français (Canada)',
    isSelected: false,
  },
  {
    id: '8',
    name: 'Bahasa Indonesia',
    isSelected: false,
  },
  {
    id: '9',
    name: '日本语',
    isSelected: false,
  },
  {
    id: '10',
    name: '한국어',
    isSelected: false,
  },
  {
    id: '11',
    name: 'Bahasa Melayu',
    isSelected: false,
  },
  {
    id: '12',
    name: 'Русский',
    isSelected: false,
  },
  {
    id: '13',
    name: 'ไทย',
    isSelected: false,
  },
  {
    id: '14',
    name: 'Türkçe',
    isSelected: false,
  },
  {
    id: '15',
    name: 'Tiếng Việt',
    isSelected: false,
  },
  {
    id: '16',
    name: '中文(繁體)',
    isSelected: false,
  },
  {
    id: '17',
    name: '中文(簡体)',
    isSelected: false,
  },
  {
    id: '18',
    name: 'עברית',
    isSelected: false,
  },
  {
    id: '19',
    name: 'Basa Jawa',
    isSelected: false,
  },
  {
    id: '20',
    name: 'Cebuano',
    isSelected: false,
  },
  {
    id: '21',
    name: 'Čeština',
    isSelected: false,
  },
  {
    id: '22',
    name: 'Italiano',
    isSelected: false,
  },
  {
    id: '23',
    name: 'Magyar',
    isSelected: false,
  },
  {
    id: '24',
    name: 'Nederlands',
    isSelected: false,
  },
  {
    id: '25',
    name: 'Polski',
    isSelected: false,
  },
  {
    id: '26',
    name: 'Português',
    isSelected: false,
  },
  {
    id: '27',
    name: 'Română',
    isSelected: false,
  },
  {
    id: '28',
    name: 'slovenščina',
    isSelected: false,
  },
  {
    id: '29',
    name: 'Latviešu',
    isSelected: false,
  },
  {
    id: '30',
    name: 'Afrikaans',
    isSelected: false,
  },
  {
    id: '31',
    name: 'perski',
    isSelected: false,
  },
  {
    id: '32',
    name: 'தமிழ்',
    isSelected: false,
  },
  {
    id: '33',
    name: 'తెలుగు',
    isSelected: false,
  },
  {
    id: '34',
    name: 'አማርኛ',
    isSelected: false,
  },
  {
    id: '35',
    name: 'Esperanto',
    isSelected: false,
  },
  {
    id: '36',
    name: 'Euskara',
    isSelected: false,
  },
  {
    id: '37',
    name: 'Frysk',
    isSelected: false,
  },
  {
    id: '38',
    name: 'Íslenska',
    isSelected: false,
  },
  {
    id: '39',
    name: 'עברית',
    isSelected: false,
  },
  {
    id: '40',
    name: 'Malagasy',
    isSelected: false,
  },
  {
    id: '41',
    name: 'norsk nynorsk',
    isSelected: false,
  },
  {
    id: '42',
    name: 'සිංහල',
    isSelected: false,
  },
  {
    id: '43',
    name: 'Shqip',
    isSelected: false,
  },
  {
    id: '44',
    name: 'српски',
    isSelected: false,
  },
  {
    id: '45',
    name: 'Swahili',
    isSelected: false,
  },
  {
    id: '46',
    name: 'Татарча',
    isSelected: false,
  },
  {
    id: '47',
    name: 'Oʻzbekcha',
    isSelected: false,
  },
  {
    id: '48',
    name: 'беларуская',
    isSelected: false,
  },
  {
    id: '49',
    name: 'Қазақша',
    isSelected: false,
  },
  {
    id: '50',
    name: 'Svenska',
    isSelected: false,
  },
  {
    id: '51',
    name: 'Filipino',
    isSelected: false,
  },
  {
    id: '52',
    name: 'Ελληνικά',
    isSelected: false,
  },
  {
    id: '53',
    name: 'Українська',
    isSelected: false,
  },
  {
    id: '54',
    name: 'اردو',
    isSelected: false,
  },
  {
    id: '55',
    name: 'မြန်မာ',
    isSelected: false,
  },
  {
    id: '56',
    name: 'বাঙ্গালি',
    isSelected: false,
  },
  {
    id: '96',
    name: 'മലയാളം',
    isSelected: false,
  },
  {
    id: '57',
    name: 'मराठी',
    isSelected: false,
  },
  {
    id: '58',
    name: 'Tagalog',
    isSelected: false,
  },
  {
    id: '59',
    name: 'ქართული',
    isSelected: false,
  },
  {
    id: '60',
    name: 'български',
    isSelected: false,
  },
  {
    id: '61',
    name: 'dansk',
    isSelected: false,
  },
  {
    id: '62',
    name: 'norsk bokmål',
    isSelected: false,
  },
  {
    id: '63',
    name: 'slovenčina',
    isSelected: false,
  },
  {
    id: '64',
    name: 'ລາວ',
    isSelected: false,
  },
  {
    id: '65',
    name: 'ਪੰਜਾਬੀ',
    isSelected: false,
  },
  {
    id: '66',
    name: 'ಕನ್ನಡ',
    isSelected: false,
  },
  {
    id: '67',
    name: 'Azərbaycan',
    isSelected: false,
  },
  {
    id: '68',
    name: 'bosanski',
    isSelected: false,
  },
  {
    id: '69',
    name: 'eesti',
    isSelected: false,
  },
  {
    id: '70',
    name: 'hrvatski',
    isSelected: false,
  },
  {
    id: '71',
    name: 'ગુજરાતી',
    isSelected: false,
  },
  {
    id: '72',
    name: 'lietuvių',
    isSelected: false,
  },
  {
    id: '73',
    name: 'македонски',
    isSelected: false,
  },
  {
    id: '74',
    name: 'монгол',
    isSelected: false,
  },
  {
    id: '75',
    name: 'slovenščina',
    isSelected: false,
  },
];

const BTN_COLOR = '#E8445A';
const BTN_TEXT_COLOR = 'white';
const DIS_BTN_COLOR = '#E8E8E8';
const DIS_BTN_TEXT_COLOR = '#A9A9A9';
const { width, height } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});

const LanguageListComponent = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
  const _refBS = useRef<BottomSheetRef>(null);
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  let formattedLanguages = languages;
  if (isCollapse) {
    formattedLanguages = languages.slice(0, 2);
  }

  const onPress = useCallback(() => {
    const isActive = _refBS?.current?.isActive();
    if (isActive) {
      _refBS?.current?.scrollTo(0);
    } else {
      _refBS?.current?.scrollTo((-(height - statusBarHeight) / 3) * 2);
    }
  }, []);

  useEffect(() => {
    onPress();
  }, [onPress]);

  const renderTopBar = () => (
    <>
      {/* top right btn */}
      <Block
        style={{
          position: 'absolute',
          top: 21,
          right: 24,
          width: 30,
          height: 30,
          zIndex: 1,
        }}>
        <Button onPress={handleConfirm}>
          <Icon icon={'close'} size={30} />
        </Button>
      </Block>
    </>
  );

  const renderLanguageList = () => {
    return formattedLanguages.map(lan => (
      <Block
        key={lan.id}
        marginBottom={12}
        direction={'row'}
        justifyContent={'space-between'}>
        <Text fontSize={15}>{lan.name}</Text>
        <Block>
          <CheckBox
            style={{
              width: 20,
              height: 22,
            }}
            fillStyle={{
              width: 20,
              height: 22,
            }}
            size={20}
            value={lan.isSelected}
          />
        </Block>
      </Block>
    ));
  };

  const disabled = isCollapse
    ? formattedLanguages.filter(item => item.isSelected).length === 0
    : languages.filter(item => item.isSelected).length === 0;
  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={_refBS}
        height={height - statusBarHeight}
        secondHeight={((height - statusBarHeight) / 3) * 2} // enable half height
        throttle={100}
        toggleModal={toggle => {
          if (!toggle) {
            dispatch(appActions.onModalClose());
          }
        }}>
        <Block
          block
          style={{
            alignItems: 'center',
            position: 'relative',
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          {renderTopBar()}
          {/* main content */}
          <Block marginTop={30} width={width - 48}>
            <Block marginTop={12} alignItems={'center'}>
              <Icon icon={'translate'} size={64} />
            </Block>
            <Block marginTop={24}>
              <Text center fontSize={21} fontWeight={'bold'}>
                What languages do you
              </Text>
              <Text center fontSize={21} fontWeight={'bold'}>
                understand?
              </Text>
            </Block>
            <Block marginTop={12}>
              <Text center fontSize={12} color={'#8A8A8A'}>
                This will help us customize your viewing
              </Text>
              <Text center fontSize={12} color={'#8A8A8A'}>
                experience
              </Text>
            </Block>
            {/* language list */}
            <Block
              style={{
                height: 90,
                width: '100%',
                marginTop: 24,
              }}>
              <ScrollView style={{}}>
                {renderLanguageList()}
                {isCollapse && (
                  <Block>
                    <TouchableOpacity>
                      <Text fontSize={15} color={'#8A8A8A'}>
                        More languages
                      </Text>
                    </TouchableOpacity>
                  </Block>
                )}
              </ScrollView>
            </Block>
            {/* button */}
            <Block style={{ marginTop: 72, width: '100%' }}>
              <Button
                // onPress={confirmDate}
                disabled={disabled}
                style={{
                  backgroundColor: disabled ? DIS_BTN_COLOR : BTN_COLOR,
                  paddingVertical: 15,
                  width: '100%',
                }}>
                <Text
                  color={disabled ? DIS_BTN_TEXT_COLOR : BTN_TEXT_COLOR}
                  fontSize={15}
                  center>
                  Confirm
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export const LanguageList = memo(LanguageListComponent, isEqual);
