package dev.vetther.backend.utils;

public class EventUtils {

    public static final String ALPHANUMERATIC_REGEX = "/^[a-zA-Z0-9 ]*$/";

    public boolean isTitle(String title) {
        return title.length() >= 6 && title.length() <= 60 && title.matches(ALPHANUMERATIC_REGEX);
    }

    public boolean isShortDesc(String shortDescription) {
        return shortDescription.length() >= 6 && shortDescription.length() <= 100;
    }

    public boolean isLongDesc(String longDescription) {
        return longDescription.length() >= 16 && longDescription.length() <= 326;
    }
}
