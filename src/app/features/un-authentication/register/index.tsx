import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Button, Screen, Text, Wallpaper } from '@components';
import { goBack } from '@navigation/navigation-service';

import { useRegisterStyle } from './style';

const RegisterComponent = () => {
  const style = useRegisterStyle();
  console.log('style: ', style.text.color);

  // render
  return (
    <Block block>
      <Wallpaper />
      <Screen>
        <Block block justifyContent={'center'} middle>
          <Button
            onPress={() => {
              goBack();
            }}>
            <Text color={'red'}>Back</Text>
          </Button>
        </Block>
      </Screen>
    </Block>
  );
};
export const Register = memo(RegisterComponent, isEqual);

// const theme = useTheme();
// const drawerSx = {
//     '& .MuiDrawer-paper': {
//         background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//     },
// };
// return (
//     <Drawer sx={drawerSx} variant="permanent">
//       ...
//     </Drawer>
// );
