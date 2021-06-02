import {AppFirestoreStorage} from './FirebaseStorage';
import {AppLocalStorage} from './LocalStorage'
import {config, storageType} from '../config';

let AppStorage: typeof AppFirestoreStorage | typeof AppLocalStorage;

switch (config.storageType) {
    case storageType.AppFirestoreStorage:
        AppStorage = AppFirestoreStorage; break;
    case storageType.AppLocalStorage:
        AppStorage = AppLocalStorage; break;
    default:
        AppStorage = AppLocalStorage;
}

export default AppStorage;
