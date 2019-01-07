/**
Workaround to use app with subdirectories with cordova
**/
if (typeof cordova != "undefined") {
  __webpack_public_path__ = cordova.file.applicationDirectory + "www/";
}
