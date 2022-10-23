package dev.vetther.backend;

import dev.vetther.backend.image.ImageService;
import dev.vetther.backend.poll.Poll;
import dev.vetther.backend.poll.PollChoice;
import dev.vetther.backend.poll.PollServiceImpl;
import dev.vetther.backend.role.RoleService;
import dev.vetther.backend.tag.TagService;
import dev.vetther.backend.user.User;
import dev.vetther.backend.user.UserService;
import dev.vetther.backend.utils.EventUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*@Bean
    CommandLineRunner run(UserService userService, PollServiceImpl pollService) {
        return args -> {

            for (Poll poll : pollService.getPolls()) {
                pollService.deletePoll(poll.getId());
            }

            User user = userService.getUser("vetther").get();
            Poll poll = pollService.createPoll(user, "tytul", "opis polla", Set.of("opcja 1", "opcja 2"));

            PollChoice pollChoice = pollService.createPollChoice("opcja 3 (nowa)");

            pollService.addPollChoice(poll.getId(), pollChoice);
            pollService.addPollChoice(poll.getId(), pollService.createPollChoice("opcja 4 (nowa)"));

            pollService.deletePollChoice(pollChoice.getId());

            pollService.deletePoll(poll.getId());

        };
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
            userService.createUser("Vetther", "misterek11", "mail", new HashSet<>());
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
     */

}
