package host.exp.exponent;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.uimanager.ViewManager;

import java.util.*;

public class AndroidPackage implements ReactPackage {

    /**
     * Creates the view managers for the android mic package
     *
     * @param reactContext
     * @return list of view managers
     */
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    /**
     * Creates the native android module
     *
     * @param reactContext
     * @return list of native modules, consisting of the android mic module
     */
    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new AndroidMic(reactContext));

        return modules;
    }
}
