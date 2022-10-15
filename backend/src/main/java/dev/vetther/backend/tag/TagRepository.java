package dev.vetther.backend.tag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findById(Long id);
}
