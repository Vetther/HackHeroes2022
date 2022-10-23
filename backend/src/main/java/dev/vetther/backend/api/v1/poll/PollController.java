package dev.vetther.backend.api.v1.poll;

import dev.vetther.backend.api.v1.request.EventRequest;
import dev.vetther.backend.api.v1.request.PollRequest;
import dev.vetther.backend.api.v1.response.Response;
import dev.vetther.backend.event.Event;
import dev.vetther.backend.poll.Poll;
import dev.vetther.backend.poll.PollChoice;
import dev.vetther.backend.poll.PollServiceImpl;
import dev.vetther.backend.user.User;
import dev.vetther.backend.user.UserService;
import dev.vetther.backend.utils.PollUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

import static dev.vetther.backend.api.v1.response.ResponseError.*;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1")
public class PollController {

    private final PollServiceImpl pollService;
    private final UserService userService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/poll/create")
    public ResponseEntity<Response> createPoll(@RequestBody PollRequest pollRequest, Principal principal) {

        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }

        Optional<User> user = this.userService.getUser(principal.getName());

        if (user.isEmpty()) {
            return ResponseEntity.ok(new Response(false, USER_NOT_FOUND, null));
        }

        if (!PollUtils.isDesc(pollRequest.getDescription())) {
            return ResponseEntity.ok(new Response(false, INVALID_POLL_DESCRIPTION, null));
        }

        if (!PollUtils.isTitle(pollRequest.getTitle())) {
            return ResponseEntity.ok(new Response(false, INVALID_POLL_TITLE, null));
        }

        for (String choice : pollRequest.getChoices()) {
            if (!PollUtils.isChoiceName(choice)) {
                return ResponseEntity.ok(new Response(false, INVALID_POLL_CHOICE_NAME, null));
            }
        }

        if (pollRequest.getChoices().length > 5) {
            return ResponseEntity.ok(new Response(false, POLL_LIMIT_CHOICES, null));
        }

        Poll poll = this.pollService.createPoll(user.get(), pollRequest.getTitle(), pollRequest.getDescription(), new HashSet<>(List.of(pollRequest.getChoices())));

        return ResponseEntity.ok(new Response(true, null, poll));

    }

    @DeleteMapping("/poll/{id}")
    public ResponseEntity<Response> deletePoll(@PathVariable long id, Principal principal) {

        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }

        Optional<User> user = this.userService.getUser(principal.getName());

        if (user.isEmpty()) {
            return ResponseEntity.ok(new Response(false, USER_NOT_FOUND, null));
        }

        Optional<Poll> pollOpt = this.pollService.getPoll(id);

        if (pollOpt.isEmpty()) {
            return ResponseEntity.ok().body(new Response(false, POLL_NOT_FOUND, null));
        }

        if (!Objects.equals(pollOpt.get().getCreator().getId(), user.get().getId())) {
            return ResponseEntity.ok().body(new Response(false, ACCESS_DENIED, null));
        }

        this.pollService.deletePoll(pollOpt.get().getId());

        return ResponseEntity.ok(new Response(true, null, null));
    }

    @PostMapping("/poll/{id}/addchoice")
    public ResponseEntity<Response> addChoice(@PathVariable long id, @RequestBody PollChoice pollChoice, Principal principal) {

        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }
        Optional<User> user = this.userService.getUser(principal.getName());
        if (user.isEmpty()) {
            return ResponseEntity.ok(new Response(false, USER_NOT_FOUND, null));
        }
        Optional<Poll> pollOpt = this.pollService.getPoll(id);
        if (pollOpt.isEmpty()) {
            return ResponseEntity.ok().body(new Response(false, POLL_NOT_FOUND, null));
        }
        if (!PollUtils.isChoiceName(pollChoice.getName())) {
            return ResponseEntity.ok(new Response(false, INVALID_POLL_CHOICE_NAME, null));
        }

        this.pollService.addPollChoice(id, this.pollService.createPollChoice(pollChoice.getName()));
        return ResponseEntity.ok(new Response(true, null, null));
    }

    @DeleteMapping("/poll/{id}/choice/{choiceId}")
    public ResponseEntity<Response> deleteChoice(@PathVariable long id, @PathVariable long choiceId, Principal principal) {

        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }
        Optional<User> user = this.userService.getUser(principal.getName());
        if (user.isEmpty()) {
            return ResponseEntity.ok(new Response(false, USER_NOT_FOUND, null));
        }
        Optional<Poll> pollOpt = this.pollService.getPoll(id);
        if (pollOpt.isEmpty()) {
            return ResponseEntity.ok().body(new Response(false, POLL_NOT_FOUND, null));
        }
        Optional<PollChoice> choiceOpt = this.pollService.getPollChoice(choiceId);
        if (choiceOpt.isEmpty()) {
            return ResponseEntity.ok().body(new Response(false, POLL_CHOICE_NOT_FOUND, null));
        }

        this.pollService.deletePollChoice(choiceOpt.get().getId());
        return ResponseEntity.ok(new Response(true, null, null));
    }

    @GetMapping("/poll/{id}")
    public ResponseEntity<Response> getPoll(@PathVariable long id) {

        Optional<Poll> pollOpt = this.pollService.getPoll(id);

        if (pollOpt.isEmpty()) {
            return ResponseEntity.ok().body(new Response(false, POLL_NOT_FOUND, null));
        }

        return ResponseEntity.ok(new Response(true, null, pollOpt.get()));
    }

    @GetMapping("/polls")
    public ResponseEntity<Response> getPolls() {
        return ResponseEntity.ok(new Response(true, null, this.pollService.getPolls()));
    }

    @GetMapping("/poll/{id}/choice/{choiceId}/vote")
    public ResponseEntity<Response> vote(@PathVariable long id, @PathVariable long choiceId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }
        Optional<User> user = this.userService.getUser(principal.getName());
        if (user.isEmpty()) {
            return ResponseEntity.ok(new Response(false, USER_NOT_FOUND, null));
        }
        Optional<Poll> pollOpt = this.pollService.getPoll(id);
        if (pollOpt.isEmpty()) {
            return ResponseEntity.ok().body(new Response(false, POLL_NOT_FOUND, null));
        }
        Optional<PollChoice> choiceOpt = this.pollService.getPollChoice(choiceId);
        if (choiceOpt.isEmpty()) {
            return ResponseEntity.ok().body(new Response(false, POLL_CHOICE_NOT_FOUND, null));
        }

        if (this.pollService.hasVoted(user.get(), pollOpt.get().getId())) {
            return ResponseEntity.ok().body(new Response(true, null, null));
        }

        this.pollService.addVote(user.get(), choiceOpt.get().getId());
        log.info("Vote - User: " + user.get().getName() + " | Poll: " + pollOpt.get().getTitle() + " | Choice: " + choiceOpt.get().getName());

        return ResponseEntity.ok().body(new Response(true, null, null));
    }

    @GetMapping("/user/{userId}/votes")
    public ResponseEntity<Response> getVotes(@PathVariable long userId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.ok(new Response(false, ACCESS_DENIED, null));
        }
        Optional<User> userOpt = this.userService.getUser(principal.getName());
        if (userOpt.isEmpty()) {
            return ResponseEntity.ok(new Response(false, USER_NOT_FOUND, null));
        }
        if (!Objects.equals(userOpt.get().getId(), userId)) {
            return ResponseEntity.ok().body(new Response(false, ACCESS_DENIED, null));
        }

        User user = userOpt.get();
        Set<Poll> votedPolls = new HashSet<>();

        for (Poll poll : this.pollService.getPolls()) {
            if (this.pollService.hasVoted(user, poll.getId())) {
                votedPolls.add(poll);
            }
        }

        return ResponseEntity.ok().body(new Response(true, null, votedPolls));
    }
}
