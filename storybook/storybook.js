import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { loadStories } from './storyLoader';

configure(() => {
  loadStories();
}, module);

import './rn-addons';

const StorybookUI = getStorybookUI({
  port: 7007,
  host: 'localhost',
  onDeviceUI: true,
  resetStorybook: true,
  asyncStorage: AsyncStorage || require('react-native').AsyncStorage || null,
});

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUI);

export { StorybookUI as default };
