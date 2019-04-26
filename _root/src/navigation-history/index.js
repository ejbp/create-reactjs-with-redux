import { createBrowserHistory } from 'history';

let browserHistory = undefined;

if (typeof cordova !== 'undefined') {
  const basename = `${cordova.file.applicationDirectory}www/`.replace('file://', ''); 
  
  browserHistory = createBrowserHistory({
    basename: basename
  });

}else {
  browserHistory = createBrowserHistory();
}

export default browserHistory;
