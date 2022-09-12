import { StyleSheet } from 'react-native';

// import { ColorDefault } from '@theme/color';
const DIMENSIONS = { width: 16, height: 16 };
export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  outline: {
    ...DIMENSIONS,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    borderRadius: 1,
  },
  fill: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
    backgroundColor: '#E7445A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    paddingLeft: 8,
  },
});
