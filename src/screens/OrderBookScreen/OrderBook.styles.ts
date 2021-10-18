import {StyleSheet} from 'react-native';
import theme from '@app/theme';

const {colors} = theme;

export default StyleSheet.create({
  container: {height: '100%', backgroundColor: colors.black},
  headerContainer: {
    height: '10%',
    borderBottomWidth: 1,
    borderColor: colors.grey,
    marginBottom: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  orderBookText: {color: colors.white, fontSize: 20},
  sectionHeader: {
    height: '4%',
    marginBottom: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  columnContainer: {
    width: '33%',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
  },
  progressContainer: {
    height: '100%',
    position: 'absolute',
    right: 0,
  },
  itemText: {color: colors.grey, textAlign: 'right', width: '70%'},
  contentContainer: {
    height: '74%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {height: '45%'},
  buttonsContainer: {
    height: '8%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 100,
    borderRadius: 15,
  },
  buttonToggle: {backgroundColor: colors.violet},
  buttonKill: {backgroundColor: colors.lightRed},
  buttonText: {color: colors.white},
  errorText: {color: colors.white, fontSize: 40},
  separatorContainer: {height: '10%'},
});
