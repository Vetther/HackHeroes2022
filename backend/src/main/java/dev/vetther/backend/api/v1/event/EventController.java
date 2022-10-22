package dev.vetther.backend.api.v1.event;

import dev.vetther.backend.api.v1.request.EventRequest;
import dev.vetther.backend.api.v1.request.SearchbarRequest;
import dev.vetther.backend.api.v1.response.Response;
import dev.vetther.backend.event.Event;
import dev.vetther.backend.event.EventServiceImpl;
import dev.vetther.backend.tag.Tag;
import dev.vetther.backend.tag.TagService;
import dev.vetther.backend.user.User;
import dev.vetther.backend.user.UserService;
import dev.vetther.backend.utils.EventUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ExecutionException;

import static dev.vetther.backend.api.v1.response.ResponseError.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1")
public class EventController {

    private final EventServiceImpl eventService;
    private final UserService userService;
    private final TagService tagService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/event/create")
    public ResponseEntity<Response> createEvent(@RequestBody EventRequest event, Principal principal) {

        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }

        if (!EventUtils.isLongDesc(event.getLongDescription())) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_LONG_DESCRIPTION, null));
        }

        if (!EventUtils.isShortDesc(event.getShortDescription())) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_SHORT_DESCRIPTION, null));
        }

        if (event.getImageUrl() == null) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_IMAGE, null));
        }

        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }

        Optional<User> user = this.userService.getUser(principal.getName());

        if (user.isEmpty()) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_CREATOR, null));
        }

        if (event.getEventTime() == null || Instant.ofEpochSecond(event.getEventTime()).isBefore(Instant.now())) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_TIME, null));
        }

        if (event.getAddress() == null) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_ADDRESS, null));
        }

        if (event.getTagId() == null || event.getTagId().length == 0) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_TAG, null));
        }

        Set<Tag> tags = new HashSet<>();
        for (Long tagId : event.getTagId()) {
            Optional<Tag> tagOpt = tagService.getTag(tagId);
            if (tagOpt.isEmpty()) {
                return ResponseEntity.ok(new Response(false, INVALID_EVENT_TAG, null));
            }
            tags.add(tagOpt.get());
        }

        Instant publicationDate = Instant.now();

        Event e = this.eventService.createEvent(user.get(), event.getImageUrl(), event.getTitle(), event.getAddress(), Instant.ofEpochSecond(event.getEventTime()), publicationDate, event.getShortDescription(), event.getLongDescription(), tags);

        return ResponseEntity.ok(new Response(true, null, e));
    }

    @GetMapping("/event/{id}")
    public ResponseEntity<Response> getEvent(@PathVariable long id) {

        Optional<Event> eventOpt = this.eventService.getEvent(id);

        if (eventOpt.isEmpty()) {
            return ResponseEntity.ok(new Response(false, EVENT_NOT_FOUND, null));
        }

        return ResponseEntity.ok(new Response(true, null, eventOpt.get()));
    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<Response> deleteEvent(@PathVariable long id, Principal principal) {

        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }

        System.out.println(principal.getName());
        User user = this.userService.getUser(principal.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Optional<Event> eventOpt = this.eventService.getEvent(id);

        if (eventOpt.isEmpty()) {
            return ResponseEntity.ok(new Response(false, EVENT_NOT_FOUND, null));
        }

        if (!Objects.equals(eventOpt.get().getCreator().getId(), user.getId())) {
            return ResponseEntity.ok().body(new Response(false, ACCESS_DENIED, null));
        }

        this.eventService.removeEvent(eventOpt.get().getId());

        return ResponseEntity.ok(new Response(true, null, null));
    }

    @GetMapping("/event/{id}/join")
    public ResponseEntity<Response> joinEvent(@PathVariable long id, Principal principal) {

        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }

        Optional<User> userOpt = this.userService.getUser(principal.getName());
        if (userOpt.isEmpty()) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }
        User user = userOpt.get();

        Optional<Event> eventOpt = this.eventService.getEvent(id);

        if (eventOpt.isEmpty()) {
            return ResponseEntity.ok(new Response(false, EVENT_NOT_FOUND, null));
        }

        if (Objects.equals(eventOpt.get().getCreator().getId(), user.getId())) {
            return ResponseEntity.ok().body(new Response(false, EVENT_CREATOR_ERROR, null));
        }

        if (eventOpt.get().getInterested()
                .stream()
                .map(User::getName)
                .anyMatch(userName -> userName.equalsIgnoreCase(user.getName()))) {
            return ResponseEntity.ok().body(new Response(false, EVENT_ALREADY_INTERESTED, null));
        }

        this.eventService.joinEvent(id, user);

        return ResponseEntity.ok(new Response(true, null, null));
    }

    @GetMapping("/event/{id}/quit")
    public ResponseEntity<Response> quitEvent(@PathVariable long id, Principal principal) {

        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }

        Optional<User> userOpt = this.userService.getUser(principal.getName());
        if (userOpt.isEmpty()) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }
        User user = userOpt.get();

        Optional<Event> eventOpt = this.eventService.getEvent(id);

        if (eventOpt.isEmpty()) {
            return ResponseEntity.ok(new Response(false, EVENT_NOT_FOUND, null));
        }

        if (Objects.equals(eventOpt.get().getCreator().getId(), user.getId())) {
            return ResponseEntity.ok().body(new Response(false, EVENT_CREATOR_ERROR, null));
        }

        if (eventOpt.get().getInterested()
                .stream()
                .map(User::getName)
                .noneMatch(userName -> userName.equalsIgnoreCase(user.getName()))) {

            return ResponseEntity.ok().body(new Response(false, EVENT_NOT_INTERESTED, null));
        }

        this.eventService.quitEvent(id, user);

        return ResponseEntity.ok(new Response(true, null, null));
    }

    @PostMapping("/event")
    public ResponseEntity<Response> getEvent(@RequestBody String searchbar) throws ExecutionException, InterruptedException {

        List<Event> events = this.eventService.findEvent(searchbar);

        System.out.println(searchbar);

        return ResponseEntity.ok(new Response(true, null, events));
    }

    @GetMapping("/events")
    public ResponseEntity<Response> getEvent() {

        return ResponseEntity.ok(new Response(true, null, this.eventService.getEvents()));
    }
}
