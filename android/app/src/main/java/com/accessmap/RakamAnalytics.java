package com.accessmap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import org.json.JSONObject;
import org.json.JSONException;

import io.rakam.api.Rakam;

public class RakamAnalytics extends ReactContextBaseJavaModule {
	// constructor
	public RakamAnalytics(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	public String getName() {
		return "Rakam";
	}

	@ReactMethod
	public void trackEvent(String event, ReadableArray props) {
		JSONObject eventProperties = new JSONObject();
		try {
			for (int i = 0; i < props.size(); i += 2) {
				eventProperties.put(props.getString(i), props.getString(i + 1));
			}
		} catch (JSONException exception) {
		}

		Rakam.getInstance().logEvent(event, eventProperties);
		Rakam.getInstance().uploadEvents();
	}
}
