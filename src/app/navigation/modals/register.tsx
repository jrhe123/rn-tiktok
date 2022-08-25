import React, { memo, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  NativeModules,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, Icon, Text } from '@components';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

const BTN_COLOR = '#E8445A';
const { height, width } = Dimensions.get('window');
type Page = {
  id: string;
  type: string;
};
const pages: Page[] = [
  {
    id: '0',
    type: 'SIGN_UP',
  },
  {
    id: '1',
    type: 'SIGN_IN',
  },
];

const SignUpPage = ({
  handleNavigateToLogin,
}: {
  handleNavigateToLogin: () => void;
}) => {
  return (
    <Block style={{ width, flex: 1 }}>
      {/* top section */}
      <Block
        style={{
          padding: 24,
          width: '100%',
          flex: 1,
        }}>
        {/* title */}
        <Block style={{ marginTop: 84 }}>
          <Text color={'black'} fontSize={24} fontWeight={'bold'} center>
            Sign up for TikTok
          </Text>
        </Block>
        {/* desc */}
        <Block style={{ marginTop: 18 }}>
          <Text color={'#504F54'} fontSize={15} fontWeight={'200'} center>
            Create a profile, follow other accounts, make your own videos, and
            more.
          </Text>
        </Block>
        {/* button */}
        <Block style={{ marginTop: 60, width: '100%' }}>
          <Button
            style={{
              backgroundColor: BTN_COLOR,
              paddingVertical: 15,
              width: '100%',
            }}>
            <Text color={'white'} fontSize={15} center>
              Use phone or email
            </Text>
          </Button>
        </Block>
        {/* divider */}
        <Block
          style={{
            marginTop: 30,
            height: 18,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Block
            style={{
              flex: 1,
              paddingRight: 24,
            }}>
            <Block
              style={{
                height: 2,
                width: '100%',
                backgroundColor: '#E1E1E1',
              }}
            />
          </Block>
          <Text color={'#757477'} fontSize={15}>
            Or continue with
          </Text>
          <Block
            style={{
              flex: 1,
              paddingLeft: 24,
            }}>
            <Block
              style={{
                height: 2,
                width: '100%',
                backgroundColor: '#E1E1E1',
              }}
            />
          </Block>
        </Block>
        {/* social btns */}
        <Block
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 12,
          }}>
          <Button
            style={{
              padding: 9,
              borderWidth: 1,
              borderColor: '#E1E1E1',
              borderRadius: 48,
              width: 48,
              height: 48,
              margin: 12,
            }}>
            <Icon icon={'google_logo'} size={27} />
          </Button>
          <Button
            style={{
              padding: 6,
              borderWidth: 1,
              borderColor: '#E1E1E1',
              borderRadius: 48,
              width: 48,
              height: 48,
              margin: 12,
            }}>
            <Icon icon={'facebook_logo'} size={33} />
          </Button>
          <Button
            style={{
              padding: 6,
              borderWidth: 1,
              borderColor: '#E1E1E1',
              borderRadius: 48,
              width: 48,
              height: 48,
              margin: 12,
            }}>
            <Icon icon={'apple_logo'} size={30} />
          </Button>
          <Button
            style={{
              padding: 9,
              borderWidth: 1,
              borderColor: '#E1E1E1',
              borderRadius: 48,
              width: 48,
              height: 48,
              margin: 12,
            }}>
            <Icon icon={'twitter_logo'} size={30} />
          </Button>
        </Block>
      </Block>
      {/* bottom section */}
      <Block
        style={{
          width: '100%',
          height: 240,
          justifyContent: 'flex-end',
        }}>
        <Block style={{ paddingHorizontal: 24, marginBottom: 12 }}>
          <Text
            color={'#504F54'}
            fontSize={11}
            fontWeight={'200'}
            center
            lineHeight={18}>
            By continuing, you agree to our{' '}
            <TouchableOpacity
              onPress={() => {
                dispatch(appActions.onModalClose());
                navigate(APP_SCREEN.TERMS_OF_SERVICE);
              }}
              style={{
                padding: 0,
                marginTop: -1,
              }}>
              <Text fontWeight={'bold'} fontSize={11}>
                Terms of Service{' '}
              </Text>
            </TouchableOpacity>
            and acknowledge that you have read our{' '}
            <TouchableOpacity
              onPress={() => {
                dispatch(appActions.onModalClose());
                navigate(APP_SCREEN.PRIVACY_POLICY);
              }}
              style={{
                padding: 0,
                marginTop: -1,
              }}>
              <Text fontWeight={'bold'} fontSize={11}>
                Privacy Policy{' '}
              </Text>
            </TouchableOpacity>
            to learn how we collect, use, and share your data.
          </Text>
        </Block>
        <Block style={{ height: 120, backgroundColor: '#F8F8F8', padding: 24 }}>
          <Block style={{ marginTop: 6 }}>
            <Text fontSize={15} center>
              Already have an account?{' '}
              <TouchableOpacity
                onPress={handleNavigateToLogin}
                style={{
                  padding: 0,
                }}>
                <Text fontWeight={'bold'} color={BTN_COLOR}>
                  Log in
                </Text>
              </TouchableOpacity>
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const SignInPage = ({
  handleNavigateToSignup,
}: {
  handleNavigateToSignup: () => void;
}) => {
  return (
    <Block style={{ width, flex: 1 }}>
      {/* top section */}
      <Block
        style={{
          padding: 24,
          width: '100%',
          flex: 1,
        }}>
        {/* title */}
        <Block style={{ marginTop: 84 }}>
          <Text color={'black'} fontSize={24} fontWeight={'bold'} center>
            Log in to TikTok
          </Text>
        </Block>
        {/* desc */}
        <Block style={{ marginTop: 18 }}>
          <Text color={'#504F54'} fontSize={15} fontWeight={'200'} center>
            Manage your account, check notifications, comment on videos, and
            more.
          </Text>
        </Block>
        {/* button */}
        <Block
          style={{
            marginTop: 42,
            width: '100%',
          }}>
          <Button
            style={{
              height: 45,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: '#E5E5E5',
            }}>
            <Block style={{ flexDirection: 'row', flex: 1 }}>
              <Block
                style={{
                  justifyContent: 'center',
                }}>
                <VectorIcon icon={'bx_user'} size={24} />
              </Block>
              <Block
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text>Use phone / email / username</Text>
              </Block>
            </Block>
          </Button>
          <Button
            style={{
              marginTop: 12,
              height: 45,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: '#E5E5E5',
            }}>
            <Block style={{ flexDirection: 'row', flex: 1 }}>
              <Block
                style={{
                  justifyContent: 'center',
                }}>
                <Icon icon={'facebook_logo'} size={24} />
              </Block>
              <Block
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text>Continue with Facebook</Text>
              </Block>
            </Block>
          </Button>
          <Button
            style={{
              marginTop: 12,
              height: 45,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: '#E5E5E5',
            }}>
            <Block style={{ flexDirection: 'row', flex: 1 }}>
              <Block
                style={{
                  justifyContent: 'center',
                }}>
                <Icon icon={'apple_logo'} size={22} />
              </Block>
              <Block
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text>Continue with Apple</Text>
              </Block>
            </Block>
          </Button>
          <Button
            style={{
              marginTop: 12,
              height: 45,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: '#E5E5E5',
            }}>
            <Block style={{ flexDirection: 'row', flex: 1 }}>
              <Block
                style={{
                  justifyContent: 'center',
                }}>
                <Icon icon={'google_logo'} size={20} />
              </Block>
              <Block
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text>Continue with Google</Text>
              </Block>
            </Block>
          </Button>
          <Button
            style={{
              marginTop: 12,
              height: 45,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: '#E5E5E5',
            }}>
            <Block style={{ flexDirection: 'row', flex: 1 }}>
              <Block
                style={{
                  justifyContent: 'center',
                }}>
                <Icon icon={'twitter_logo'} size={22} />
              </Block>
              <Block
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text>Continue with Twitter</Text>
              </Block>
            </Block>
          </Button>
          <Button
            style={{
              marginTop: 12,
              height: 45,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: '#E5E5E5',
            }}>
            <Block style={{ flexDirection: 'row', flex: 1 }}>
              <Block
                style={{
                  justifyContent: 'center',
                }}>
                <Icon icon={'instagram_logo'} size={21} />
              </Block>
              <Block
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text>Continue with Instagram</Text>
              </Block>
            </Block>
          </Button>
        </Block>
      </Block>
      {/* bottom section */}
      <Block
        style={{
          width: '100%',
          height: 240,
          justifyContent: 'flex-end',
        }}>
        <Block style={{ height: 120, backgroundColor: '#F8F8F8', padding: 24 }}>
          <Block style={{ marginTop: 6 }}>
            <Text fontSize={15} center>
              Don't have an account?{' '}
              <TouchableOpacity
                onPress={handleNavigateToSignup}
                style={{
                  padding: 0,
                }}>
                <Text fontWeight={'bold'} color={BTN_COLOR}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const RegisterComponent = () => {
  const _refRoot = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: Page }) => {
    if (item.type === 'SIGN_UP') {
      return (
        <SignUpPage
          handleNavigateToLogin={() => {
            if (_refRoot.current) {
              _refRoot.current?.scrollToIndex({
                animated: true,
                index: 1,
              });
            }
          }}
        />
      );
    } else if (item.type === 'SIGN_IN') {
      return (
        <SignInPage
          handleNavigateToSignup={() => {
            if (_refRoot.current) {
              _refRoot.current?.scrollToIndex({
                animated: true,
                index: 0,
              });
            }
          }}
        />
      );
    }
    return null;
  };

  return (
    <Block
      block
      style={{
        alignItems: 'center',
        position: 'relative',
      }}>
      {/* top left btn */}
      <Block
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          width: 30,
          height: 30,
          zIndex: 1,
        }}>
        <Button>
          <Icon icon={'close'} size={30} />
        </Button>
      </Block>
      {/* top right btn */}
      <Block
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          width: 30,
          height: 30,
          zIndex: 1,
        }}>
        <Button
          onPress={() => {
            dispatch(appActions.onModalClose());
            navigate(APP_SCREEN.INFO);
          }}>
          <VectorIcon icon={'bx_info_circle1'} size={30} />
        </Button>
      </Block>
      <FlatList
        ref={_refRoot}
        data={pages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        scrollEnabled={false}
        style={{
          width,
          height: height - statusBarHeight,
        }}
        scrollEventThrottle={width}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </Block>
  );
};

export const Register = memo(RegisterComponent, isEqual);
