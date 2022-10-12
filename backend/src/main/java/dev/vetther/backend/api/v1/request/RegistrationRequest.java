package dev.vetther.backend.api.v1.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
public class RegistrationRequest implements Serializable {

    private final String username;
    private final String email;
    private final String password;
}
