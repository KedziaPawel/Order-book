import {StyleSheet} from 'react-native';
import theme from '@app/theme';

const {colors} = theme;

export default StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 100,
    backgroundColor: colors.darkGrey,
    borderRadius: 15,
  },
  text: {color: colors.white},
});
