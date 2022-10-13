package dev.vetther.backend.api.v1.event;

import dev.vetther.backend.api.v1.request.EventRequest;
import dev.vetther.backend.api.v1.request.SearchbarRequest;
import dev.vetther.backend.api.v1.response.Response;
import dev.vetther.backend.event.Event;
import dev.vetther.backend.event.EventServiceImpl;
import dev.vetther.backend.user.User;
import dev.vetther.backend.user.UserService;
import dev.vetther.backend.utils.EventUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import static dev.vetther.backend.api.v1.response.ResponseError.*;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1")
public class EventController {

    private final EventServiceImpl eventService;
    private final UserService userService;
    private final EventUtils eventUtils;

    @PostMapping("/event/create")
    public ResponseEntity<Response> createEvent(@RequestBody EventRequest event) {

        if (!eventUtils.isLongDesc(event.getLongDescription())) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_LONG_DESCRIPTION, null));
        }

        if (!eventUtils.isShortDesc(event.getShortDescription())) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_SHORT_DESCRIPTION, null));
        }

        if (event.getImage() == null) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_IMAGE, null));
        }

        if (event.getCreatorId() == null) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_CREATOR, null));
        }

        Optional<User> creator = userService.getUser(event.getCreatorId());

        if (creator.isEmpty()) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_CREATOR, null));
        }

        if (event.getEventTime() == null || Instant.ofEpochSecond(event.getEventTime()).isBefore(Instant.now())) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_TIME, null));
        }

        if (event.getAddress() == null) {
            return ResponseEntity.ok(new Response(false, INVALID_EVENT_ADDRESS, null));
        }

        Instant publicationDate = Instant.now();

        Event e = this.eventService.createEvent(creator.get(), event.getImage(), event.getTitle(), event.getAddress(), Instant.ofEpochSecond(event.getEventTime()), publicationDate, event.getShortDescription(), event.getLongDescription());

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
