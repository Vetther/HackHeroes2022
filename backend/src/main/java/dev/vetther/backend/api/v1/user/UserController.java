package dev.vetther.backend.api.v1.user;

import dev.vetther.backend.api.v1.response.Response;
import dev.vetther.backend.user.User;
import dev.vetther.backend.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static dev.vetther.backend.api.v1.response.ResponseError.USER_NOT_FOUND;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1")
public class UserController {

    private final UserService userService;

    @GetMapping("/user/{name}")
    public ResponseEntity<Response> getUser(@PathVariable String name) {

        Optional<User> userOpt = this.userService.getUser(name);

        if (userOpt.isEmpty()) {
            return ResponseEntity.ok(new Response(false, USER_NOT_FOUND, null));
        }

        return ResponseEntity.ok(new Response(true, null, userOpt.get()));
    }
}
