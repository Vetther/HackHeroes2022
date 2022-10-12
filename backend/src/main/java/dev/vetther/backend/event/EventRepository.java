package dev.vetther.backend.event;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.scheduling.annotation.Async;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select e from Event e where e.creator.id = ?1")
    Set<Event> findByCreator_Id(long id);

    @Query("""
            select e from Event e
            where upper(e.title) like upper(concat('%', ?1, '%')) or upper(e.shortDescription) like upper(concat('%', ?2, '%')) or upper(e.creator.name) like upper(concat('%', ?3, '%'))""")
    @Async
    CompletableFuture<List<Event>> getEvents(String title, String shortDescription, String name, Pageable pageable);


}
