package dev.vetther.backend.event;

import dev.vetther.backend.image.Image;
import dev.vetther.backend.image.ImageService;
import dev.vetther.backend.mail.MailService;
import dev.vetther.backend.tag.Tag;
import dev.vetther.backend.user.User;
import dev.vetther.backend.user.UserService;
import dev.vetther.backend.utils.EventUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ExecutionException;

@Service
@AllArgsConstructor
public class EventServiceImpl {

    private final EventRepository eventRepository;
    private final MailService mailService;

    public Event createEvent(User creator, String imageUrl, String title, String address, Instant eventDate, Instant publicationDate, String shortDesc, String longDesc, Set<Tag> tags) {
        Event event = new Event(null, imageUrl, title, address, shortDesc, longDesc, publicationDate, eventDate, 0, creator, new HashSet<>(), tags);
        return this.eventRepository.save(event);
    }

    public List<Event> findEvent(String searchbar) throws ExecutionException, InterruptedException {
        return this.eventRepository.getEvents(searchbar, searchbar, searchbar, Pageable.unpaged()).get();
    }

    public Optional<Event> getEvent(long id) {
        return this.eventRepository.findById(id);
    }

    public Set<Event> getUserEvents(long userId) {
        return this.eventRepository.findByCreator_Id(userId);
    }

    public Page<Event> getEvents() {
        return this.eventRepository.findAll(Pageable.unpaged());
    }

    public void removeEvent(long eventId) {
        Event event = this.eventRepository.findById(eventId).orElseThrow(() -> new NullPointerException("Event not found"));
        event.setInterested(new HashSet<>());
        this.eventRepository.save(event);
        this.eventRepository.delete(event);
    }

    public void joinEvent(long eventId, User user) {
        Event event = this.eventRepository.findById(eventId).orElseThrow(() -> new NullPointerException("Event not found"));
        Set<User> interested = event.getInterested();
        interested.add(user);
        event.setInterested(interested);
        this.eventRepository.save(event);
    }

    public void quitEvent(long eventId, User user) {
        Event event = this.eventRepository.findById(eventId).orElseThrow(() -> new NullPointerException("Event not found"));
        Set<User> interested = event.getInterested();
        interested.remove(user);
        event.setInterested(interested);
        this.eventRepository.save(event);
    }

    public void sendReminder(long eventId, int stage) {
        Event event = this.eventRepository.findById(eventId).orElseThrow(() -> new NullPointerException("Event not found"));

        String topic;
        String content;

        if (event.getMailReminderStage() == 0 && stage == 0) {
            event.setMailReminderStage(1);
            topic = "Wkrótce rozpocznie się wydarzenie " + event.getTitle() + "!";
            content = "Wydarzenie na które się zapisałeś rozpocznie się za mniej niż 1 godzinę!" +
                    "<br>Nazwa: <b>" + event.getTitle() + "</b>" +
                    "<br>Nie możesz tego przegapić! Sprawdź wszystkie informacje na naszej witrynie <b>https://citizenshub.pl</b>" +
                    "<br>Pozdrawiamy," +
                    "<br>Zespół CitizensHub.pl";
        }
        else if (event.getMailReminderStage() == 1 && stage == 1) {
            event.setMailReminderStage(2);
            topic = "Rozpoczęło się wydarzenie " + event.getTitle() + "!";
            content = "Wydarzenie na które się zapisałeś właśnie rozpoczęło się!" +
                    "<br>Nazwa: <b>" + event.getTitle() + "</b>" +
                    "<br>Nie możesz tego przegapić! Sprawdź wszystkie informacje na naszej witrynie <b>https://citizenshub.pl</b>" +
                    "<br>Pozdrawiamy," +
                    "<br>Zespół CitizensHub.pl";
        }
        else {
            return;
        }

        event.getInterested()
                .stream()
                .map(User::getEmail)
                .forEach(email -> {
                    try {
                        this.mailService.sendEmail(email, topic, content);
                    } catch (MessagingException e) {
                        throw new RuntimeException(e);
                    }
                });

        this.eventRepository.save(event);
    }

    public void editEvent(long eventId, String title, String shortDescription, String longDescription, String address, String imageUrl) {
        Event event = this.eventRepository.findById(eventId).orElseThrow(() -> new NullPointerException("Event not found"));

        if (title != null && EventUtils.isTitle(title) && !title.isBlank() && !title.isEmpty()) {
            event.setTitle(title);
        }
        if (shortDescription != null && EventUtils.isShortDesc(shortDescription) && !shortDescription.isBlank() && !shortDescription.isEmpty()) {
            event.setShortDescription(shortDescription);
        }
        if (longDescription != null && EventUtils.isLongDesc(longDescription) && !longDescription.isBlank() && !longDescription.isEmpty()) {
            event.setLongDescription(longDescription);
        }
        if (address != null && !address.isBlank() && !address.isEmpty()) {
            event.setAddress(address);
        }
        if (imageUrl != null && !imageUrl.isBlank() && !imageUrl.isEmpty()) {
            event.setImageUrl(imageUrl);
        }

        this.eventRepository.save(event);
    }
}
