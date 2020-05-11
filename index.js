/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { STORYBOOK } from 'react-native-dotenv';
import { name as appName } from './app.json';
import Storybook from './storybook';

if (STORYBOOK === true) {
  AppRegistry.registerComponent(appName, () => Storybook);
} else {
  AppRegistry.registerComponent(appName, () => App);
}
