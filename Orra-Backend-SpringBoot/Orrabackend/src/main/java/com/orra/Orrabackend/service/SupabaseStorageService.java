package com.orra.Orrabackend.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.UUID;

@Service
public class SupabaseStorageService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.bucket}")
    private String bucketName;

    @Value("${supabase.secret}")
    private String secretKey;

    private final RestTemplate restTemplate;

    @Autowired
    public SupabaseStorageService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @PostConstruct
    public void checkConfig() {
        System.out.println("================================");
        System.out.println("URL = " + supabaseUrl);
        System.out.println("Bucket = " + bucketName);
        System.out.println("Secret = " + secretKey);
        System.out.println("================================");
    }
    public String uploadBase64Image(String base64Image) {

        String imageData = base64Image;

        if (base64Image.contains(",")) {
            imageData = base64Image.split(",")[1];
        }

        byte[] imageBytes = Base64.getDecoder().decode(imageData);

        String extension = ".png";

        if (base64Image.startsWith("data:image/jpeg")) {
            extension = ".jpg";
        } else if (base64Image.startsWith("data:image/jpg")) {
            extension = ".jpg";
        } else if (base64Image.startsWith("data:image/webp")) {
            extension = ".webp";
        }

        String fileName = UUID.randomUUID() + extension;

        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", "Bearer " + secretKey);
        headers.set("apikey", secretKey);

        String mimeType = "image/png";

        if (base64Image.startsWith("data:image/jpeg")) {
            mimeType = "image/jpeg";
        } else if (base64Image.startsWith("data:image/jpg")) {
            mimeType = "image/jpeg";
        } else if (base64Image.startsWith("data:image/webp")) {
            mimeType = "image/webp";
        }

        headers.setContentType(MediaType.parseMediaType(mimeType));

        headers.setContentLength(imageBytes.length);
        headers.add("x-upsert", "true");
        HttpEntity<byte[]> requestEntity = new HttpEntity<>(imageBytes, headers);

        String uploadUrl = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + fileName;

        try {
            System.out.println("Upload URL = " + uploadUrl);
            System.out.println("Authorization = Bearer " + secretKey);
            System.out.println("apikey = " + secretKey);
            System.out.println("Content-Type = " + headers.getContentType());
            System.out.println("Image Bytes = " + imageBytes.length);
            ResponseEntity<String> response = restTemplate.exchange(uploadUrl, HttpMethod.POST, requestEntity, String.class);
            System.out.println("Uploading to: " + uploadUrl);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            if (response.getStatusCode().is2xxSuccessful()) {

                return supabaseUrl + "/storage/v1/object/public/" + bucketName + "/" + fileName;
            }

            throw new RuntimeException("Failed to upload image.");

        } catch (Exception e) {
            throw new RuntimeException("Supabase Upload Error: " + e.getMessage(), e);
        }
    }
}