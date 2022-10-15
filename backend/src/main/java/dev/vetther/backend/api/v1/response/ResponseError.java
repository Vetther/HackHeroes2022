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
    INVALID_EVENT_SHORT_DESCRIPTION,
    INVALID_EVENT_LONG_DESCRIPTION,
    INVALID_EVENT_IMAGE,
    INVALID_EVENT_TIME,
    INVALID_EVENT_CREATOR,
    INVALID_EVENT_ADDRESS,
    INVALID_EVENT_TAG,

    /** Auth **/
    AUTH_ERROR,
    ACCESS_DENIED,
}
