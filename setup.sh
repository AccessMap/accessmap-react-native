# Run this script in the project home directory. 
# You should already have npm and react-native-cli installed.
# You might need to already have your android device or emulator open before you run this.

# Fresh-install project dependencies
rm -rf node_modules;
npm i;
npx jetify;

# Modify android folder and build project
chmod 755 ./android/gradlew;
alias changeToAndroidFolder='cd ./android'
changeToAndroidFolder;
./gradlew clean;

# Run the project on an Android device or emulator
# If this task fails, try uninstalling the app if it already exists on the phone.
npm run android;

# To run on IOS default device,
# npm run ios;

# To run on a physical device of your choice
# react-native run-ios --device="Jay's iPhone"