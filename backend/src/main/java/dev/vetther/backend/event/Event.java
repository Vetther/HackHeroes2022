package dev.vetther.backend.event;

import dev.vetther.backend.image.Image;
import dev.vetther.backend.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity @AllArgsConstructor @NoArgsConstructor @Getter @Setter(AccessLevel.PACKAGE)
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Image image;

    private String title;

    private String shortDescription;

    private String longDescription;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @ManyToMany
    @JoinTable(name = "event_interested")
    private Set<User> interested;
}
