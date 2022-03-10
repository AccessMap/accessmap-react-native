# Publishing to the Android Play Store

1. First, open the `android` folder of the app in Android Studio and let the app finish building
2. Build -> Build Bundle(s) / APK -> Build APK
3. Clean Project or do ./gradlew clean and let the APK finish building
4. Build -> Generate Signed Bundle/APK
5. Request the upload-keystore file from AccessMap devs, as well as the passwords, and set those as the keystore
   1. The keystore passwords can be found on the Accessmap Google Drive.
6. Go to Google Play Console and sign in with
7. Click next, submit, and let the signed APK finish building
8. The result can be found in `/android/app/release/`.