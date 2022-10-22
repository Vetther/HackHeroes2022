package dev.vetther.backend.api.v1.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
public class PollRequest implements Serializable {

    private final String title;
    private final String description;
    private final String[] choices;
}