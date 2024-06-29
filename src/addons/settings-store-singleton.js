import SettingsStore from './settings-store';

const settingStore = new SettingsStore();
//const urlParameters = new URLSearchParams(location.search);
//if (urlParameters.has('addons')) {
//    settingStore.parseUrlParameter(urlParameters.get('addons'));
//} else {
    settingStore.readLocalStorage();
//}
//从url加载扩展
export default settingStore;
