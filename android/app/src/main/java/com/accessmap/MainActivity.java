package com.accessmap;

import com.facebook.react.ReactActivity;
import android.util.Log;

import io.rakam.api.Rakam;
import io.rakam.api.RakamClient;
import io.rakam.api.RakamLog;
import java.net.URL;
import android.os.Bundle;
import java.net.MalformedURLException;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AccessMap";
    }

		@Override
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			try {
				Log.v("ReactNative", "hello");
				RakamClient instance = Rakam.getInstance();
				instance.initialize(this, new URL("https://www.accessmap.io/analytics"), INSERT_WRITE_KEY_HERE).enableForegroundTracking(getApplication());
				// instance.enableForegroundTracking(getApplication()).trackSessionEvents(true);
				instance.setLogLevel(Log.VERBOSE);
				instance.setEventUploadPeriodMillis(1);
				Log.v("ReactNative", "session: " + Long.toString(Rakam.getInstance().getSessionId()));
				if (instance == null) {
					Log.v("ReactNative", "Instance is null");
				}
				Log.v("ReactNative", instance.getApiUrl());
				instance.logEvent("INIT", null, true);
			} catch (Exception e) {
				Log.v("ReactNative", e.getMessage());
				Log.v("ReactNative", "Another exception occured");
			}
		}
}
