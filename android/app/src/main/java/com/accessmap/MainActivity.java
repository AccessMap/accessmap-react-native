package com.accessmap;

import com.facebook.react.ReactActivity;

import io.rakam.api.Rakam;
import io.rakam.api.RakamClient;
import java.net.URL;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AccessMap";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    try {
      RakamClient instance = Rakam.getInstance();
      instance.initialize(this, new URL("https://www.accessmap.io/analytics"), "t1o7d8qvroq71g7se1qb25hr0fn2n3cmo4h3fh1l0ncgain5slo3jgk92ej1aiec").enableForegroundTracking(getApplication());
      instance.setEventUploadPeriodMillis(1);
      instance.logEvent("INIT", null, true);
    } catch (Exception e) {

    }
  }
}
