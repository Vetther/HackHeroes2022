package dev.vetther.backend.api.v1.response;

import lombok.Data;

@Data
public class Response {

    private final boolean success;
    private final ResponseError error;
    private final Object data;
}
