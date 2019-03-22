package host.exp.exponent;


import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import expo.core.interfaces.Package;
import expo.loaders.provider.interfaces.AppLoaderPackagesProviderInterface;
import expo.modules.ads.admob.AdMobPackage;
import expo.modules.analytics.segment.SegmentPackage;
import expo.modules.appauth.AppAuthPackage;
import expo.modules.backgroundfetch.BackgroundFetchPackage;
import expo.modules.barcodescanner.BarCodeScannerPackage;
import expo.modules.camera.CameraPackage;
import expo.modules.constants.ConstantsPackage;
import expo.modules.contacts.ContactsPackage;
import expo.modules.facedetector.FaceDetectorPackage;
import expo.modules.filesystem.FileSystemPackage;
import expo.modules.font.FontLoaderPackage;
import expo.modules.gl.GLPackage;
import expo.modules.google.signin.GoogleSignInPackage;
import expo.modules.localauthentication.LocalAuthenticationPackage;
import expo.modules.localization.LocalizationPackage;
import expo.modules.location.LocationPackage;
import expo.modules.medialibrary.MediaLibraryPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.print.PrintPackage;
import expo.modules.sensors.SensorsPackage;
import expo.modules.sms.SMSPackage;
import expo.modules.taskManager.TaskManagerPackage;
import expolib_v1.okhttp3.OkHttpClient;
// Needed for `react-native link`
// import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.chirag.RNMail.*;

public class MainApplication extends ExpoApplication implements AppLoaderPackagesProviderInterface<ReactPackage> {

  /**
   * Returns whether app is in debug mode or not
   *
   * @return the current debug status
   */
  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  /**
   * Gets a list of all the react-native packages
   *
   * @return a list of react-native packages
   */
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // new MainReactPackage(),
            new RNFSPackage(),
            new BackgroundTimerPackage(),
            new ToastPackage(),
            new RNMail(),
            new AndroidPackage()
    );
  }

  /**
   * Gets a list of the expo packages in use
   *
   * @return a list of expo packages
   */
  public List<Package> getExpoPackages() {
    return Arrays.<Package>asList(
        new CameraPackage(),
        new ConstantsPackage(),
        new SensorsPackage(),
        new FileSystemPackage(),
        new FaceDetectorPackage(),
        new GLPackage(),
        new GoogleSignInPackage(),
        new PermissionsPackage(),
        new SMSPackage(),
        new PrintPackage(),
        new ConstantsPackage(),
        new MediaLibraryPackage(),
        new SegmentPackage(),
        new FontLoaderPackage(),
        new LocationPackage(),
        new ContactsPackage(),
        new BarCodeScannerPackage(),
        new AdMobPackage(),
        new LocalAuthenticationPackage(),
        new LocalizationPackage(),
        new AppAuthPackage(),
        new TaskManagerPackage(),
        new BackgroundFetchPackage()
    );
  }

  /**
   * Gets gcm sender ID
   *
   * @return string value of gcm sender id
   */
  @Override
  public String gcmSenderId() {
    return getString(R.string.gcm_defaultSenderId);
  }

  /**
   * Gets the set value on whether to use internet kernel
   *
   * @return boolean for internet kernel
   */
  @Override
  public boolean shouldUseInternetKernel() {
    return BuildVariantConstants.USE_INTERNET_KERNEL;
  }

  /**
   * Builds the okHttp client
   * @param builder for okHttp
   * @return the finalized builder
   */
  public static OkHttpClient.Builder okHttpClientBuilder(OkHttpClient.Builder builder) {
    // Customize/override OkHttp client here
    return builder;
  }
}
