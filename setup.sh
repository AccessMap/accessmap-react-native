# Run this script in the project home directory. You should have npm installed.

# Install project dependencies
npm i;
npx jetify;

# Modify android folder and build project
chmod 755 ./android/gradlew;
alias changeToAndroidFolder='cd ./android'
changeToAndroidFolder;
./gradlew clean;
./gradlew build;

# Run the project on an Android device or emulator
npx react-native run-android;