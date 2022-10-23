package dev.vetther.backend.poll;

import org.springframework.data.jpa.repository.JpaRepository;

interface PollChoiceRepository extends JpaRepository<PollChoice, Long> {
}
