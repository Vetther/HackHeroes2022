package dev.vetther.backend.image;

import dev.vetther.backend.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findById(Long id);
}
