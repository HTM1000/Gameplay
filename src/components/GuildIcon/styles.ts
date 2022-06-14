import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  image: {
    width: 63,
    height: 67,
  },
  container: {
    width: 63,
    height: 67,
    borderRadius: 8,
    backgroundColor: theme.colors.discord,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }
});