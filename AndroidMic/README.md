
# react-native-android-mic

## Getting started

`$ npm install react-native-android-mic --save`

### Mostly automatic installation

`$ react-native link react-native-android-mic`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-android-mic` and add `RNAndroidMic.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAndroidMic.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNAndroidMicPackage;` to the imports at the top of the file
  - Add `new RNAndroidMicPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-android-mic'
  	project(':react-native-android-mic').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-android-mic/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-android-mic')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNAndroidMic.sln` in `node_modules/react-native-android-mic/windows/RNAndroidMic.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Android.Mic.RNAndroidMic;` to the usings at the top of the file
  - Add `new RNAndroidMicPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNAndroidMic from 'react-native-android-mic';

// TODO: What to do with the module?
RNAndroidMic;
```
  