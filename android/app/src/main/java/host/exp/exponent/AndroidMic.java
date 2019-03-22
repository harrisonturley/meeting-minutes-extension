package host.exp.exponent;

import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.*;

import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import com.reactlibrary.MicrophoneStream;

public class AndroidMic extends ReactContextBaseJavaModule {

    private static final String SpeechRegion = "westus";
    private MicrophoneStream microphoneStream;
    SpeechConfig speechConfig;

    private boolean continuousListeningStarted = false;
    private SpeechRecognizer reco = null;
    private AudioConfig audioInput = null;
    private ArrayList<String> temporaryContent = new ArrayList<>();
    private ArrayList<String> completedContent = new ArrayList<>();
    private ReactContext reactContext;

    /**
     * Constructs the android mic object
     *
     * @param reactContext
     */
    public AndroidMic(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        String apiKey = reactContext.getString(R.string.azure_speech_to_text_api_key);

        try {
            speechConfig = SpeechConfig.fromSubscription(apiKey, SpeechRegion);
        } catch (Exception e) {
            System.out.println(e);
            return;
        }
    }

    /**
     * Gets the module name
     *
     * @return the string value of the module name, AndroidMic
     */
    @Override
    public String getName() {
        return "AndroidMic";
    }

    /**
     * Sets up the microphone stream
     *
     * @return the set up microphone stream object
     */
    private MicrophoneStream createMicrophoneStream() {
        if (microphoneStream != null) {
            microphoneStream.close();
            microphoneStream = null;
        }

        microphoneStream = new MicrophoneStream();
        return microphoneStream;
    }

    /**
     * Function to set up event handlers for audio that has been captured, calling to Azure to handle audio processing.
     */
    @ReactMethod
    public void getAudio() {
        if (continuousListeningStarted) {
            if (reco != null) {
                final Future<Void> task = reco.stopContinuousRecognitionAsync();
                setOnTaskCompletedListener(task, result -> {
                    continuousListeningStarted = false;
                });
            } else {
                continuousListeningStarted = false;
            }
            return;
        }

        try {
            temporaryContent.clear();
            completedContent.clear();

            if (reco != null && audioInput != null) {
                final Future<Void> task = reco.startContinuousRecognitionAsync();
                setOnTaskCompletedListener(task, result -> {
                    continuousListeningStarted = true;
                });

                return;
            }

            audioInput = AudioConfig.fromStreamInput(createMicrophoneStream());
            reco = new SpeechRecognizer(speechConfig, audioInput);

            reco.recognizing.addEventListener((o, speechRecognitionResultEventArgs) -> {
                WritableMap params = Arguments.createMap();
                final String s = speechRecognitionResultEventArgs.getResult().getText();
                temporaryContent.add(s);
                params.putString("updatedText", TextUtils.join(" ", temporaryContent));
                sendEvent(reactContext, "updatedText", params);
                temporaryContent.remove(temporaryContent.size() - 1);
            });

            reco.recognized.addEventListener((o, speechRecognitionResultEventArgs) -> {
                WritableMap params = Arguments.createMap();
                final String s = speechRecognitionResultEventArgs.getResult().getText();
                completedContent.add(s);
                params.putString("completedText", TextUtils.join(" ", completedContent));
                sendEvent(reactContext, "completedText", params);
                completedContent.clear();
            });

            reco.canceled.addEventListener((s, e) -> {
                Log.e("AndroidMic", "Cancelled, reason = " + e.getErrorDetails());
            });

            reco.sessionStopped.addEventListener((s, e) -> {
                Log.e("AndroidMic", "Session stopped");
            });

            final Future<Void> task = reco.startContinuousRecognitionAsync();
            setOnTaskCompletedListener(task, result -> {
                continuousListeningStarted = true;
            });

        } catch (Exception ex) {
            Log.e("AndroidMic", "Failed in getting audio");
        }
    }

    /**
     * Cancels the continuous recognition of audio
     */
    @ReactMethod
    public void cancelSpeechToText() {
        reco.stopContinuousRecognitionAsync();
        continuousListeningStarted = false;
    }

    /**
     * Calls the onComplete function when task is complete
     *
     * @param task
     * @param listener
     * @param <T>
     */
    private <T> void setOnTaskCompletedListener(Future<T> task, OnTaskCompletedListener<T> listener) {
        s_executorService.submit(() -> {
            T result = task.get();
            listener.onCompleted(result);
            return null;
        });
    }

    /**
     * Provides an interface for the completion of a task
     *
     * @param <T>
     */
    private interface OnTaskCompletedListener<T> {
        void onCompleted(T taskResult);
    }

    /**
     * Executor service provided for tasks
     */
    private static ExecutorService s_executorService;
    static {
        s_executorService = Executors.newCachedThreadPool();
    }

    /**
     * Sends a given event to react-native across an async bridge
     *
     * @param reactContext
     * @param eventName
     * @param params
     */
    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
