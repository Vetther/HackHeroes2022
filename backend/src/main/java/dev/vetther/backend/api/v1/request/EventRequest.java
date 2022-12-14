package dev.vetther.backend.api.v1.request;

import dev.vetther.backend.image.Image;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
public class EventRequest implements Serializable {

    private final String imageUrl;
    private final String title;
    private final String shortDescription;
    private final String longDescription;
    private final String address;
    private final Long[] tagId;
    private final Long eventTime;
}
