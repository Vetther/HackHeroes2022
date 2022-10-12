package dev.vetther.backend.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class RegistrationUtils {

    public static final String USERNAME_REGEX = "^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
    public static final String EMAIL_REGEX = "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";

    public boolean isUsername(String username) {
        return username.matches(USERNAME_REGEX);
    }

    public boolean isPassword(String password) {
        return password.length() >= 6 && password.length() <= 100;
    }

    public boolean isEmail(String email) {
        return email.length() >= 3 && email.length() <= 320 && email.matches(EMAIL_REGEX);
    }
}
