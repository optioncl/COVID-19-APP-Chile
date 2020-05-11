# Welcome to covid-19-app 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/optioncl/COVID-19-APP-Chile#README)
[![License: MIT](https://img.shields.io/badge/License-Apache-yellow.svg)](https://opensource.org/licenses/Apache-2.0)

# Requirements
- Service Account Firebase ([Console Firebase](https://console.firebase.google.com/)) 
- Api key Google Maps for Android / IOS. ([Get API Key](https://developers.google.com/maps/documentation/embed/get-api-key))
- Api key for citysense (request api key, send mail to [contacto@option.cl](mailto:contacto@option.cl))
- Api key Google Places. ([Get API Key](https://developers.google.com/maps/premium/apikey/places-apikey) or use Api Key Google Maps with multiple products. [IOS/Android/Place])
- Keystores for Android Release ([Read Documentation](https://coderwall.com/p/r09hoq/android-generate-release-debug-keystores))

# Steps

## Install modules.
```sh
npm install
```
---

## Configure services account and firebase.

### Firebase
### **Android**.
- Add google-services.json in android/app path (./android/app)
### IOS.
- Add GoogleService-Info.plist in ios root path (./ios)

---

### Google Maps
#### Android.
- Edit value **com.google.android.geo.API_KEY** of AndroidManifest.xml on /android/app/src/main
#### IOS.
- Edit value **[GMSServices provideAPIKey:** of AppDelegate.m on /ios/Covid19App

---

### Google Places
- Edit value **API_KEY_PLACE** of .env on root project path.
### API Key CitySense
- Edit value **AUTHORIZATION_TOKEN_DATMOB** of .env on root project path.

---

## Install pod (only ios)
```sh
pod install --project-directory=ios
```
---

## Run Project!
### IOS
```sh
npm run ios
```
### Android
```sh
npm run android
```

# Releases
## Android
### Configure environment variables.
```sh
# Covid19 android config
export COVID19_ANDROID_KEYSTORE_ALIAS=alias_keystore # Alias keystore
export COVID19_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD=private_key_keystore # Private key of keystore.
export COVID19_ANDROID_KEYSTORE_PASSWORD=password_keystore # Password of keystore.
```

### Create folder for keystore release.
- Create folder **keystores** on **home folder**
- Add file **covid19-upload-key.keystore** into **keystore** folder.