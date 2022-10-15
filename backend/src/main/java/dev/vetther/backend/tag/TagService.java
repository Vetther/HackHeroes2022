package dev.vetther.backend.tag;

import java.util.Optional;
import java.util.Set;

public interface TagService {

    Tag createTag(String name, String hex);
    Set<Tag> getTags();
    Optional<Tag> getTag(long id);
    void removeTag(long id);
}
