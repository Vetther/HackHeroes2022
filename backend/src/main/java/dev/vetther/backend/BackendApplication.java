package dev.vetther.backend;

import dev.vetther.backend.image.ImageService;
import dev.vetther.backend.role.RoleService;
import dev.vetther.backend.tag.TagService;
import dev.vetther.backend.user.UserService;
import dev.vetther.backend.utils.EventUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(RoleService roleService) {
        return args -> {
            roleService.createRole("USER");
        };
    }

    @Bean
    CommandLineRunner run2(UserService userService) {
        return args -> {
            userService.createUser("Vetther", "pass", "mail", new HashSet<>());
        };
    }

    @Bean
    CommandLineRunner run3(TagService tagService) {
        return args -> {
            tagService.createTag("TEST", "TEST");
        };
    }

    @Bean
    CommandLineRunner run4(ImageService imageService) {
        return args -> {
            imageService.createImage("IMG", null);
        };
    }

}
