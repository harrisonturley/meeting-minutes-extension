
package com.reactlibrary;

import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
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

public class RNAndroidMicModule extends ReactContextBaseJavaModule {

  private static final String SpeechSubscriptionKey = "7163114bb43342f1b4e7e4d87a04d01d";
    private static final String SpeechRegion = "westus";

    private MicrophoneStream microphoneStream;
    SpeechConfig speechConfig;

    private final String logTag = "reco";
    private boolean continuousListeningStarted = false;
    private SpeechRecognizer reco = null;
    private AudioConfig audioInput = null;
    private String buttonText = "";
    private ArrayList<String> content = new ArrayList<>();
    private ReactContext reactContext;

    private WritableMap params = Arguments.createMap();

    public AndroidMic(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        try {
            speechConfig = SpeechConfig.fromSubscription(SpeechSubscriptionKey, SpeechRegion);
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
    public void streamToText() {

    }

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
            content.clear();

            audioInput = AudioConfig.fromStreamInput(createMicrophoneStream());
            reco = new SpeechRecognizer(speechConfig, audioInput);

            reco.recognizing.addEventListener((o, speechRecognitionResultEventArgs) -> {
                final String s = speechRecognitionResultEventArgs.getResult().getText();
                content.add(s);
                params.putString("text", TextUtils.join(" ", content));
                sendEvent(reactContext, "updateText", params);
                content.remove(content.size() - 1);
            });

            reco.recognized.addEventListener((o, speechRecognitionResultEventArgs) -> {
                final String s = speechRecognitionResultEventArgs.getResult().getText();
                content.add(s);
                params.putString("text", TextUtils.join(" ", content));
                sendEvent(reactContext, "updateText", params);
            });

            final Future<Void> task = reco.startContinuousRecognitionAsync();
            setOnTaskCompletedListener(task, result -> {
                continuousListeningStarted = true;
            });
        } catch (Exception ex) {
            Log.e("AndroidMic", "Failed in getting audio");
        }
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
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}