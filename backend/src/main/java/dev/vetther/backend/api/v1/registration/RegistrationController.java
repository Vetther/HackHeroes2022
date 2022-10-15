package dev.vetther.backend.api.v1.registration;

import dev.vetther.backend.api.v1.request.RegistrationRequest;
import dev.vetther.backend.api.v1.response.Response;
import dev.vetther.backend.role.RoleService;
import dev.vetther.backend.user.User;
import dev.vetther.backend.user.UserService;
import dev.vetther.backend.utils.RegistrationUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static dev.vetther.backend.api.v1.response.ResponseError.*;

@RestController
@RequestMapping(path = "register")
@AllArgsConstructor
public class RegistrationController {

    private final BCryptPasswordEncoder encoder;
    private final UserService userService;
    private final RoleService roleService;

    @PostMapping()
    public ResponseEntity<Response> register(@RequestBody RegistrationRequest request) {

        if (request.getUsername() == null) {
            Response response = new Response(false, USERNAME_IS_NULL, null);
            return ResponseEntity.badRequest().body(response);
        }

        if (request.getEmail() == null) {
            Response response = new Response(false, EMAIL_IS_NULL, null);
            return ResponseEntity.badRequest().body(response);
        }

        if (request.getPassword() == null) {
            Response response = new Response(false, PASSWORD_IS_NULL, null);
            return ResponseEntity.badRequest().body(response);
        }

        if (!RegistrationUtils.isUsername(request.getUsername())) {
            Response response = new Response(false, INVALID_USERNAME, null);
            return ResponseEntity.badRequest().body(response);
        }

        if (!RegistrationUtils.isEmail(request.getEmail())) {
            Response response = new Response(false, INVALID_EMAIL, null);
            return ResponseEntity.badRequest().body(response);
        }

        if (!RegistrationUtils.isPassword(request.getPassword())) {
            Response response = new Response(false, INVALID_PASSWORD, null);
            return ResponseEntity.badRequest().body(response);
        }

        if (this.userService.getUser(request.getUsername()).isPresent()) {
            Response response = new Response(false, USERNAME_EXISTS, null);
            return ResponseEntity.badRequest().body(response);
        }

        if (this.userService.getUser(request.getEmail()).isPresent()) {
            Response response = new Response(false, EMAIL_EXISTS, null);
            return ResponseEntity.badRequest().body(response);
        }

        User user = this.userService.createUser(
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                List.of(this.roleService.getRole("USER")
                        .orElseThrow(() -> new NullPointerException("Role not found")))
        );

        return ResponseEntity.ok().build();
    }
}
