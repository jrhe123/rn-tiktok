import React, { memo } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, Button, Icon, Text } from '@components';

const BTN_COLOR = '#E8445A';
const { width } = Dimensions.get('window');

const SignInPageComponent = ({
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

export const SignInPage = memo(SignInPageComponent, isEqual);
