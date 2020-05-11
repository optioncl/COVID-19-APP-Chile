package com.option.coronatestchile;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity; // ← For RN <= 0.59

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}
