package com.accessmap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.AppendValuesResponse;
import com.google.api.services.sheets.v4.model.ValueRange;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.auth.http.HttpCredentialsAdapter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class SheetsManager extends ReactContextBaseJavaModule {
	private static final String APPLICATION_NAME = "AccessMap";
	private static final JsonFactory JSON_FACTORY =
			JacksonFactory.getDefaultInstance();
	private static final List<String> SCOPES =
			Collections.singletonList(SheetsScopes.SPREADSHEETS);

	public SheetsManager(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	public String getName() {
		return "SheetsManager";
	}

	@ReactMethod
	public void sayHello() {
		Log.v("ReactNative", "Sheets says hello!");
	}

	private HttpRequestInitializer initRequest(String accountId,
		String accountName, String key, String keyId) throws IOException {
		ServiceAccountCredentials sac = ServiceAccountCredentials.fromPkcs8(
			accountId, accountName, key, keyId, SCOPES
		);
		return new HttpCredentialsAdapter(sac);
	}

	@ReactMethod
	public void sendData(String accountId, String accountName,
			String key, String keyId, String spreadsheetId, String sheetName,
			String data) throws IOException{
		String[] rowValues = data.split("\t");
		final NetHttpTransport HTTP_TRANSPORT = new NetHttpTransport();
		HttpRequestInitializer credentials =
			initRequest(accountId, accountName, key, keyId);
		final String range = sheetName + "!A2:B5";
		Sheets service = new Sheets.Builder(HTTP_TRANSPORT,
					JSON_FACTORY, credentials)
				.setApplicationName(APPLICATION_NAME).build();
		List<List<Object>> values = Arrays.asList(
			Arrays.asList(rowValues)
		);
		ValueRange body = new ValueRange().setValues(values);
		AppendValuesResponse result =
				service.spreadsheets().values().append(spreadsheetId, range, body)
						.setValueInputOption("USER_ENTERED").execute();
		Log.v("ReactNative", "Cells appended");
		/*ValueRange response = service.spreadsheets().values()
				.get(spreadsheetId, range).execute();
		List<List<Object>> values = response.getValues();
		if (values == null || values.isEmpty()) {
			Log.v("ReactNative", "No data found.");
		} else {
			for (List row : values) {
				//Print columns A and B, corresponding to indices 0 and 1
				Log.v("ReactNative", row.get(0) + ", " + row.get(1));
			}
		}*/
	}
}
