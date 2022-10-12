package dev.vetther.backend.api.v1.event;

import dev.vetther.backend.api.v1.request.SearchbarRequest;
import dev.vetther.backend.api.v1.response.Response;
import dev.vetther.backend.event.Event;
import dev.vetther.backend.event.EventServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import static dev.vetther.backend.api.v1.response.ResponseError.*;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1")
public class EventController {

    private final EventServiceImpl eventService;

    @PostMapping("/event/create")
    public ResponseEntity<Response> createEvent(@RequestBody Event event) {

        if (event.getTitle().isEmpty() || event.getTitle().isBlank() || event.getTitle().length() < 3 || event.getTitle().length() > 24 ||
                event.getImage() == null ||
                event.getShortDescription().isEmpty() || event.getShortDescription().isBlank() || event.getShortDescription().length() < 6 || event.getShortDescription().length() > 32 ||
                event.getLongDescription().isEmpty() || event.getLongDescription().isBlank() || event.getLongDescription().length() < 6 || event.getLongDescription().length() > 128) {

            return ResponseEntity.ok(new Response(false, INVALID_EVENT, null));
        }

        Event e = this.eventService.createEvent(event.getCreator(), event.getImage(), event.getTitle(), event.getShortDescription(), event.getLongDescription());

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
