package dev.vetther.backend.api.v1.response;

public enum ResponseError {

    /** Registration Controller **/
    USERNAME_IS_NULL,
    EMAIL_IS_NULL,
    PASSWORD_IS_NULL,
    INVALID_EMAIL,
    INVALID_USERNAME,
    INVALID_PASSWORD,

    /** Event Controller **/
    EVENT_NOT_FOUND,
    INVALID_EVENT,
    INVALID_EVENT_CREATOR
}
