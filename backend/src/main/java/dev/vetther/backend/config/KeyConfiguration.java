package dev.vetther.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeyConfiguration {

    @Value("${secret_key}")
    public String secret_key;
}
