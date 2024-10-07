/* Copyright (c) 2022 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

package org.chromium.chrome.browser.settings;

import android.content.SharedPreferences;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffColorFilter;
import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.EditText;
import android.widget.ProgressBar;
import org.chromium.ui.widget.Toast;

import androidx.appcompat.widget.SwitchCompat;
import androidx.core.content.ContextCompat;

import com.airbnb.lottie.LottieAnimationView;
import com.airbnb.lottie.LottieProperty;
import com.airbnb.lottie.model.KeyPath;

import org.chromium.base.BravePreferenceKeys;
import org.chromium.base.ContextUtils;
import org.chromium.base.task.PostTask;
import org.chromium.base.task.TaskTraits;
import org.chromium.brave_news.mojom.BraveNewsController;
import org.chromium.brave_news.mojom.Channel;
import org.chromium.brave_news.mojom.Publisher;
import org.chromium.chrome.R;
import org.chromium.chrome.browser.brave_news.BraveNewsControllerFactory;
import org.chromium.chrome.browser.brave_news.BraveNewsUtils;
import org.chromium.chrome.browser.customtabs.CustomTabActivity;
import org.chromium.chrome.browser.night_mode.GlobalNightModeStateProviderHolder;
import org.chromium.chrome.browser.preferences.BravePrefServiceBridge;
import org.chromium.chrome.browser.preferences.ChromeSharedPreferences;
import org.chromium.chrome.browser.util.BraveConstants;
import org.chromium.chrome.browser.util.BraveTouchUtils;
import org.chromium.components.browser_ui.settings.FragmentSettingsLauncher;
import org.chromium.components.browser_ui.settings.SettingsLauncher;
import org.chromium.mojo.bindings.ConnectionErrorHandler;
import org.chromium.mojo.system.MojoException;

import java.util.List;
import java.util.regex.Pattern;
// networking things
import org.chromium.net.ChromiumNetworkAdapter;
import org.chromium.net.NetworkTrafficAnnotationTag;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import org.chromium.base.ThreadUtils;
import org.chromium.base.task.AsyncTask;

import org.json.JSONException;
import org.json.JSONObject;

import org.chromium.chrome.browser.BraveSyncWorker;
import android.content.SharedPreferences;
import android.content.Context;

public class BraveNewsPreferencesV2 extends BravePreferenceFragment {

    // legacy const have to keep it otherwise everything breaks :(
    public static final String PREF_SHOW_OPTIN = "show_optin";

    private ProgressBar spinner;

    private EditText userEmail;
    private EditText userPassword;

    private Button loginButton;
    private TextView resetPasswordButton;
    private TextView createAccountButton;

    private TextView title;
    private TextView username;
    private TextView secret;

    private LinearLayout createAccountLayout;
    private LinearLayout resetPasswordLayout;
    private LinearLayout loginLayout;
    private LinearLayout dashboardLayout;

    private EditText newEmailEditText;
    private EditText newPasswordEditText;
    private EditText usernameEditText;

    private Button saveAccountButton;

    // private EditText resetEmailEditText;
    // private EditText resetNewPasswordEditText;
    // private Button resetPasswordSubmitButton;

    // Constants
    private static final String SERVER_URL = "http://192.168.107.62:6969";
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.brave_news_settings, container, false);
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        if(getActivity() != null) {
            getActivity().setTitle("Account");
        }

        // Initialize UI elements
        View view = getView();
        if (view != null) {
            usernameEditText = view.findViewById(R.id.usernameEditText);
            // passwordEditText = view.findViewById(R.id.password);

            createAccountButton = view.findViewById(R.id.createAccountButton);
            resetPasswordButton = view.findViewById(R.id.resetPasswordButton);
            username = view.findViewById(R.id.username);
            secret = view.findViewById(R.id.secret);
            title = view.findViewById(R.id.title);

            // login layout components
            userEmail = view.findViewById(R.id.userEmail);
            userPassword = view.findViewById(R.id.userPassword);
            loginButton = view.findViewById(R.id.loginButton);

            createAccountLayout = view.findViewById(R.id.createAccountLayout);
            loginLayout = view.findViewById(R.id.loginLayout);
            resetPasswordLayout = view.findViewById(R.id.resetPasswordLayout);
            dashboardLayout = view.findViewById(R.id.dashboardLayout);

            spinner = view.findViewById(R.id.spinner);

            newEmailEditText = view.findViewById(R.id.newEmailEditText);
            newPasswordEditText = view.findViewById(R.id.newPasswordEditText);
            saveAccountButton = view.findViewById(R.id.saveAccountButton);

            // resetEmailEditText = view.findViewById(R.id.resetEmailEditText);
            // resetNewPasswordEditText = view.findViewById(R.id.resetNewPasswordEditText);
            // resetPasswordSubmitButton = view.findViewById(R.id.resetPasswordSubmitButton);

            // Set click listeners
            loginButton.setOnClickListener(v -> loginUser());
            createAccountButton.setOnClickListener(v -> showCreateAccountForm());
            saveAccountButton.setOnClickListener(v -> createUserAccount());
            resetPasswordButton.setOnClickListener(v -> showResetPasswordForm());
            // resetPasswordSubmitButton.setOnClickListener(v -> resetUserPassword());
        }


        SharedPreferences sharedPreferences = ContextUtils.getAppSharedPreferences();
        String savedEmail = sharedPreferences.getString("email", "");
        String savedPassword = sharedPreferences.getString("password", "");

        if (!savedEmail.isEmpty() && !savedPassword.isEmpty()) {
            loginLayout.setVisibility(View.GONE);
            getUserSecret(savedEmail, savedPassword);
        }
    }

    private void loginUser() {
        String email = userEmail.getText().toString();
        String password = userPassword.getText().toString();

        if (email.isEmpty() || password.isEmpty()) {
            Toast.makeText(getActivity(), "Please enter email and password", Toast.LENGTH_SHORT).show();
            return;
        }
        if (!isValidEmail(email)) {
            Toast.makeText(getActivity(), "Please enter email and password", Toast.LENGTH_SHORT).show();
            return;
        }

        SharedPreferences sharedPreferences = ContextUtils.getAppSharedPreferences();
        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.putString("email", email);  
        editor.putString("password", password);
        editor.apply();  
        showDashboard();
    }
    private void getUserSecret(String email,String password) {
        new AsyncTask<Void>() {
            String status = "";
            String secretStr = "REDACTED";
            String usernameStr = "REDACTED";
            StringBuilder sb = new StringBuilder();

            @Override
            protected Void doInBackground() {
                HttpURLConnection urlConnection = null;
                try {
                    URL url = new URL(SERVER_URL + "/user/login");
                    urlConnection = getUrlConnection("POST", url, NetworkTrafficAnnotationTag.MISSING_TRAFFIC_ANNOTATION);
                    urlConnection.connect();

                    JSONObject jsonParam = new JSONObject();
                    jsonParam.put("email", email);
                    jsonParam.put("password", password);

                    OutputStream os = urlConnection.getOutputStream();
                    os.write(jsonParam.toString().getBytes(StandardCharsets.UTF_8));
                    os.close();

                    int responseCode = urlConnection.getResponseCode();
                    if (responseCode == HttpURLConnection.HTTP_OK) {
                        status = "success";

                        BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), StandardCharsets.UTF_8.name()));
                        String line = null;
                        while ((line = br.readLine()) != null) {
                            sb.append(line + "\n");
                        }
                        br.close();
                        String jsonResponseString = sb.toString();
                        try {
                            JSONObject jsonObject = new JSONObject(jsonResponseString);
                            secretStr = jsonObject.getString("secret");
                            usernameStr = jsonObject.getString("username");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        return null;
                    } else {
                        status = "fail";
                        return null;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }

            @Override
            protected void onPostExecute(Void result) {
                if(status == "success") {
                    username.setText(usernameStr);
                    secret.setText(secretStr);
                    spinner.setVisibility(View.GONE);
                    dashboardLayout.setVisibility(View.VISIBLE);
                } else {
                    spinner.setVisibility(View.GONE);
                    loginLayout.setVisibility(View.VISIBLE);
                    dashboardLayout.setVisibility(View.GONE);
                    createAccountLayout.setVisibility(View.GONE);
                    Toast.makeText(getActivity(), "Wrong Email or Password", Toast.LENGTH_SHORT).show();
                }
            }
        }.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    private void showCreateAccountForm() {
        loginLayout.setVisibility(View.GONE);
        createAccountLayout.setVisibility(View.VISIBLE);
        // spinner.setVisibility(View.VISIBLE);
    }

    private boolean isValidEmail(String email) {
        // Regular expression for validating email
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        
        if (email == null) {
            return false;
        }

        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }
    private String getUserParaphrase() {
        BraveSyncWorker syncWorker =  BraveSyncWorker.get();
        String codePhrase = syncWorker.getPureWords();
        // String timeLimitedWords = syncWorker.getTimeLimitedWordsFromPure(codePhrase);
        return codePhrase;
    }

    private void createUserAccount() {
        String name     = usernameEditText.getText().toString();
        String email    = newEmailEditText.getText().toString();
        String password = newPasswordEditText.getText().toString();

        if (email.isEmpty() || password.isEmpty() || name.isEmpty()) {
            Toast.makeText(getActivity(), "Please fill all required fields", Toast.LENGTH_SHORT).show();
            return;
        }
        if (!isValidEmail(email)) {
            Toast.makeText(getActivity(), "Please enter a valid email address", Toast.LENGTH_SHORT).show();
            return;
        }
        createAccountLayout.setVisibility(View.GONE);
        spinner.setVisibility(View.VISIBLE);
        new AsyncTask<Void>() {
            int status = 0;

            @Override
            protected Void doInBackground() {
                HttpURLConnection urlConnection = null;
                try {
                    URL url = new URL(SERVER_URL + "/user/create");
                    urlConnection = getUrlConnection("POST", url, NetworkTrafficAnnotationTag.MISSING_TRAFFIC_ANNOTATION);
                    urlConnection.connect();

                    JSONObject jsonParam = new JSONObject();
                    jsonParam.put("name", name);
                    jsonParam.put("email", email);
                    jsonParam.put("password", password);
                    jsonParam.put("secret", getUserParaphrase());

                    OutputStream os = urlConnection.getOutputStream();
                    os.write(jsonParam.toString().getBytes(StandardCharsets.UTF_8));
                    os.close();

                    int responseCode = urlConnection.getResponseCode();
                    switch (responseCode) {
                        case HttpURLConnection.HTTP_OK:
                            // successfully created acccout
                            status = 0;
                            break;
                        case HttpURLConnection.HTTP_BAD_REQUEST:
                            // you did some fucky whucky
                            status = 1;
                            break;
                        default:
                            status = 2;
                            break;
                    }
                    return null;
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }

            @Override
            protected void onPostExecute(Void result) {
                spinner.setVisibility(View.GONE);
                if (status == 0) {
                    Toast.makeText(getActivity(), "Account Created Sucessfully :)", Toast.LENGTH_SHORT).show();
                    spinner.setVisibility(View.VISIBLE);
                    loginLayout.setVisibility(View.GONE);
                    getUserSecret(email, password);
                } else {
                    createAccountLayout.setVisibility(View.VISIBLE);
                }
            }
        }.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }
    private void showDashboard() {
        spinner.setVisibility(View.VISIBLE);
        loginLayout.setVisibility(View.GONE);
        String email =   userEmail.getText().toString();
        String password = userPassword.getText().toString();
        getUserSecret(email, password);
    }

    private void showResetPasswordForm() {
        // Hide login form and show reset password form
        loginLayout.setVisibility(View.GONE);
        spinner.setVisibility(View.VISIBLE);
        resetUserPassword();
    }

    private static HttpURLConnection getUrlConnection(String requestMethod, URL url,
            NetworkTrafficAnnotationTag annotation) throws IOException {
        HttpURLConnection urlConnection =
                (HttpURLConnection) ChromiumNetworkAdapter.openConnection(url, annotation);
        urlConnection.setDoOutput(true);
        urlConnection.setRequestMethod(requestMethod);
        urlConnection.setUseCaches(false);
        urlConnection.setRequestProperty("Content-Type", "application/json");
        return urlConnection;
    }
    private void resetUserPassword() {
        SharedPreferences sharedPreferences = ContextUtils.getAppSharedPreferences();
        String email = sharedPreferences.getString("email", "");

        new AsyncTask<Void>() {
            int status = 0;
            @Override
            protected Void doInBackground() {

                HttpURLConnection urlConnection = null;
                try {
                    URL url = new URL(SERVER_URL + "/user/reset");
                    urlConnection = getUrlConnection("POST", url, NetworkTrafficAnnotationTag.MISSING_TRAFFIC_ANNOTATION);
                    urlConnection.connect();

                    JSONObject jsonParam = new JSONObject();
                    jsonParam.put("email", email);

                    OutputStream os = urlConnection.getOutputStream();
                    os.write(jsonParam.toString().getBytes(StandardCharsets.UTF_8));
                    os.close();

                    int responseCode = urlConnection.getResponseCode();
                    if (responseCode != HttpURLConnection.HTTP_OK) {
                        status = 1;
                        return null;
                    } else {
                        status = 0;
                        return null;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }

            @Override
            protected void onPostExecute(Void result) {
                spinner.setVisibility(View.GONE);
                if(status == 0){
                    resetPasswordLayout.setVisibility(View.VISIBLE);
                } else {
                    Toast.makeText(getActivity(), "Error :* the server is not working", Toast.LENGTH_SHORT).show();
                    loginLayout.setVisibility(View.VISIBLE);
                }
            }
        }.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

}
