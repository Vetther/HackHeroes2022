package dev.vetther.backend.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class EventUtils {

    public static final String ALPHANUMERATIC_REGEX = "/^[a-zA-Z0-9 ]*$/";

    public boolean isTitle(String title) {
        return title.length() >= 6 && title.length() <= 60 && title.matches(ALPHANUMERATIC_REGEX);
    }

    public boolean isShortDesc(String shortDescription) {
        return shortDescription != null && shortDescription.length() >= 6 && shortDescription.length() <= 100 &&
                !shortDescription.isBlank();
    }

    public boolean isLongDesc(String longDescription) {
        return longDescription != null && longDescription.length() >= 16 && longDescription.length() <= 326 &&
                !longDescription.isBlank();
    }
}
