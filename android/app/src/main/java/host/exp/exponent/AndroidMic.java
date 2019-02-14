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

    @Override
    public String getName() {
        return "AndroidMic";
    }

    private MicrophoneStream createMicrophoneStream() {
        if (microphoneStream != null) {
            microphoneStream.close();
            microphoneStream = null;
        }

        microphoneStream = new MicrophoneStream();
        return microphoneStream;
    }

    @ReactMethod
    public void getAudio() {
        Log.e("TestText", "getAudio was called!");
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

            Log.e("TestLog", "Starting setup of microphone");
            reco.recognizing.addEventListener((o, speechRecognitionResultEventArgs) -> {
                Log.e("TestLog", "Recognizing started");
                WritableMap params = Arguments.createMap();
                final String s = speechRecognitionResultEventArgs.getResult().getText();
                temporaryContent.add(s);
                params.putString("updatedText", TextUtils.join(" ", temporaryContent));
                sendEvent(reactContext, "updateText", params);
                temporaryContent.remove(temporaryContent.size() - 1);
                Log.e("TestLog", "Recognizing finished");
            });

            reco.recognized.addEventListener((o, speechRecognitionResultEventArgs) -> {
                Log.e("TestLog", "Recognized started");
                WritableMap params = Arguments.createMap();
                final String s = speechRecognitionResultEventArgs.getResult().getText();
                completedContent.add(s);
                params.putString("completedText", TextUtils.join(" ", completedContent));
                sendEvent(reactContext, "completedText", params);
                completedContent.clear();
                Log.e("TestLog", "Recognized finished");
            });

            final Future<Void> task = reco.startContinuousRecognitionAsync();
            setOnTaskCompletedListener(task, result -> {
                continuousListeningStarted = true;
            });

            Log.e("TestLog", "Completed setup of microphone");
        } catch (Exception ex) {
            Log.e("AndroidMic", "Failed in getting audio");
        }
    }

    @ReactMethod
    public void cancelSpeechToText() {
        Log.e("TestLog", "Speech to text cancelled");
        reco.stopContinuousRecognitionAsync();
        continuousListeningStarted = false;
    }

    private <T> void setOnTaskCompletedListener(Future<T> task, OnTaskCompletedListener<T> listener) {
        s_executorService.submit(() -> {
            T result = task.get();
            listener.onCompleted(result);
            return null;
        });
    }

    private interface OnTaskCompletedListener<T> {
        void onCompleted(T taskResult);
    }

    private static ExecutorService s_executorService;
    static {
        s_executorService = Executors.newCachedThreadPool();
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        Log.e("TestLog", "Sending event!");
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
