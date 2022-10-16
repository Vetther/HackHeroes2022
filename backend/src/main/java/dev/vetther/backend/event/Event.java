package dev.vetther.backend.event;

import dev.vetther.backend.image.Image;
import dev.vetther.backend.tag.Tag;
import dev.vetther.backend.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.Set;

@Entity @AllArgsConstructor @NoArgsConstructor @Getter @Setter(AccessLevel.PACKAGE)
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    private String title;

    private String address;

    private String shortDescription;

    private String longDescription;

    private Instant publicationDate;

    private Instant eventDate;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @ManyToMany
    @JoinTable(name = "event_interested")
    private Set<User> interested;

    @ManyToMany
    @JoinTable(name = "event_tags")
    private Set<Tag> tags;
}
