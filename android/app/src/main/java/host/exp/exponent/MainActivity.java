package host.exp.exponent;

import android.os.Bundle;
import android.support.annotation.Nullable;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactPackage;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import java.util.List;

import expo.core.interfaces.Package;
import host.exp.exponent.generated.DetachBuildConstants;
import host.exp.exponent.experience.DetachActivity;

public class MainActivity extends DetachActivity {

  /**
   * Gets the published URL for production
   *
   * @return string value of published URL
   */
  @Override
  public String publishedUrl() {
    return "exp://exp.host/@harrisonturley/test";
  }

  /**
   * Gets the development URL
   * @return string value of development URL
   */
  @Override
  public String developmentUrl() {
    return DetachBuildConstants.DEVELOPMENT_URL;
  }

  /**
   * Gets all react packages in use
   *
   * @return list of all react packages
   */
  @Override
  public List<ReactPackage> reactPackages() {
    return ((MainApplication) getApplication()).getPackages();
  }

  /**
   * Gets all expo packages in use
   *
   * @return list of expo packages in use
   */
  @Override
  public List<Package> expoPackages() {
    return ((MainApplication) getApplication()).getExpoPackages();
  }

  /**
   * Gets whether in debug mode or not
   *
   * @return boolean for debug mode
   */
  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  /**
   * Sets initial props
   *
   * @param expBundle current bundle of props
   * @return finalized bundle of props
   */
  @Override
  public Bundle initialProps(Bundle expBundle) {
    // Add extra initialProps here
    return expBundle;
  }
}
