import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, Button, Icon, Text } from '@components';

const BTN_COLOR = '#E8445A';
const RegisterComponent = () => {
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
        }}>
        <Button>
          <VectorIcon icon={'bx_info_circle1'} size={30} />
        </Button>
      </Block>
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
          <Text color={'#504F54'} fontSize={18} fontWeight={'200'} center>
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

export const Register = memo(RegisterComponent, isEqual);
