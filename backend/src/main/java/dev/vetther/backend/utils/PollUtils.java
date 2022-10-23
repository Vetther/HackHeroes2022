package dev.vetther.backend.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class PollUtils {

    public static final String ALPHANUMERATIC_REGEX = "^[\\w\\s]+$";

    public boolean isTitle(String title) {
        return title.length() >= 6 && title.length() <= 60 && title.matches(ALPHANUMERATIC_REGEX);
    }

    public boolean isDesc(String description) {
        return description != null && description.length() >= 6 && description.length() <= 100 &&
                !description.isBlank();
    }

    public boolean isChoiceName(String choiceName) {
        return choiceName != null && choiceName.length() >= 3 && choiceName.length() <= 60 &&
                !choiceName.isBlank();
    }
}
