package dev.vetther.backend.poll;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

interface PollRepository extends JpaRepository<Poll, Long> {

//    @Query("select p from Poll p inner join p.choices choices where choices.id = ?1")
//    Optional<Poll> findByPollChoiceId(Long id);

    Optional<Poll> findByChoices_Id(Long id);

}
