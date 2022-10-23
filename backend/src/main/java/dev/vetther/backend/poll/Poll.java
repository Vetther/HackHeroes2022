package dev.vetther.backend.poll;

import dev.vetther.backend.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter(AccessLevel.PACKAGE)
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Instant publicationDate;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "poll_choises")
    private Set<PollChoice> choices;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "creator_id")
    private User creator;
}
