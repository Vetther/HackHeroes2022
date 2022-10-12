package dev.vetther.backend.role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findById(Long aLong);
    Optional<Role> findByName(String name);
}
