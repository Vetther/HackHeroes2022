package dev.vetther.backend.event;

import dev.vetther.backend.image.Image;
import dev.vetther.backend.image.ImageService;
import dev.vetther.backend.tag.Tag;
import dev.vetther.backend.user.User;
import dev.vetther.backend.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

    public Event createEvent(User creator, String imageUrl, String title, String address, Instant eventDate, Instant publicationDate, String shortDesc, String longDesc, Set<Tag> tags) {
        Event event = new Event(null, imageUrl, title, address, shortDesc, longDesc, publicationDate, eventDate, creator, new HashSet<>(), tags);
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
}
