package dev.vetther.backend.api.v1.tag;

import dev.vetther.backend.api.v1.response.Response;
import dev.vetther.backend.tag.TagService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1")
public class TagController {

    private final TagService tagService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/tags")
    public ResponseEntity<Response> getTags() {
        return ResponseEntity.ok().body(new Response(true, null, this.tagService.getTags()));
    }
}
