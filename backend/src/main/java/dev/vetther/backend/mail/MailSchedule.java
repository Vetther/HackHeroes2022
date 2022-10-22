package dev.vetther.backend.mail;

import dev.vetther.backend.event.Event;
import dev.vetther.backend.event.EventServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.Duration;
import java.time.Instant;

@Configuration
@EnableScheduling
@AllArgsConstructor
@Slf4j
public class MailSchedule {

    private final EventServiceImpl eventService;
    private static final int MINUTES = 5;

    @Scheduled(fixedDelay = 1000 * 60)
    public void scheduleFixedDelayTask() {
        for (Event event : this.eventService.getEvents()) {
            Duration duration = Duration.between(event.getEventDate(), Instant.now());

            if (duration.toMinutes() <= MINUTES && duration.toMinutes() >= -MINUTES) {

                if (event.getEventDate().isAfter(Instant.now()) && event.getMailReminderStage() == 0) {
                    this.eventService.sendReminder(event.getId(), 0);
                    log.info("Wysłano przypomnienie o zbliżającym się wydarzeniu (id: " + event.getId() + ")");
                    return;
                }

                if (event.getEventDate().isBefore(Instant.now()) && event.getMailReminderStage() == 1) {
                    this.eventService.sendReminder(event.getId(), 1);
                    log.info("Wysłano przypomnienie o trwającym wydarzeniu (id: " + event.getId() + ")");
                }
            }
        }
    }
}
