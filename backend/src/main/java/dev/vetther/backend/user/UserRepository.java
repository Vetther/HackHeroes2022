package dev.vetther.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public
interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    @Query("select u from User u where upper(u.name) = upper(?1) or upper(u.email) = upper(?2)")
    Optional<User> findByNameOrEmail(String name, String email);



}
