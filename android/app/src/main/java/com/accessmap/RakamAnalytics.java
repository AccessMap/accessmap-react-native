// RakamAnalytics is the tool we are using to track "events", or user activity within the app.
// This data allows us to analyze how users choose their routes, interact with the map... etc
package com.accessmap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import org.json.JSONObject;
import org.json.JSONException;

import android.util.Log;
import io.rakam.api.Rakam;

public class RakamAnalytics extends ReactContextBaseJavaModule {
	private boolean trackEvents;

	// constructor
	public RakamAnalytics(ReactApplicationContext reactContext) {
		super(reactContext);
		this.trackEvents = false;
	}

	@Override
	public String getName() {
		return "Rakam";
	}

	@ReactMethod
	public void toggleTracking() {
		this.trackEvents = !this.trackEvents;
	}

	@ReactMethod
	public void trackEvent(String event, ReadableArray props) {
		if (!this.trackEvents) {
			Log.v("ReactNative", "Not logging!");
			return;
		}

		JSONObject eventProperties = new JSONObject();
		try {
			for (int i = 0; i < props.size(); i += 2) {
				eventProperties.put(props.getString(i), props.getString(i + 1));
			}
		} catch (JSONException exception) {
		}

		Log.v("ReactNative", "Logging event!");
		Rakam.getInstance().logEvent(event, eventProperties);
		Rakam.getInstance().uploadEvents();
	}
}
