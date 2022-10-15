package dev.vetther.backend.tag;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service @AllArgsConstructor
class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public Tag createTag(String name, String hex) {
        return this.tagRepository.save(new Tag(null, name, hex));
    }

    @Override
    public Set<Tag> getTags() {
        return new HashSet<>(this.tagRepository.findAll());
    }

    @Override
    public Optional<Tag> getTag(long id) {
        return this.tagRepository.findById(id);
    }

    @Override
    public void removeTag(long id) {
        Tag image = this.tagRepository.findById(id).orElseThrow(() -> new NullPointerException("Tag not found"));
        this.tagRepository.delete(image);
    }
}
