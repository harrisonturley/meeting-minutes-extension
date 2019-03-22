package host.exp.exponent;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    /**
     * Constructor for the toast module
     *
     * @param reactContext
     */
    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /**
     * Gets the name of the module
     *
     * @return the name of the module, ToastModule
     */
    @Override
    public String getName() {
        return "ToastModule";
    }

    /**
     * Function to pull any constants needed in the react-native code
     *
     * @return a map of the constants to their values
     */
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    /**
     * Function that can be called from react-native, shows a message as a toast
     *
     * @param message to be shown
     * @param duration for the message to be shown
     */
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
}