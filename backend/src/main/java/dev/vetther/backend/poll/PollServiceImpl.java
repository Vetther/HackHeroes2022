package dev.vetther.backend.poll;

import dev.vetther.backend.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class PollServiceImpl {

    private final PollRepository pollRepository;
    private final PollChoiceRepository pollChoiceRepository;

    public Poll createPoll(User creator, String title, String description, Set<String> choices) {

        Set<PollChoice> pollChoices = new HashSet<>();
        choices.forEach(choiceName -> pollChoices.add(createPollChoice(choiceName)));

        Poll poll = new Poll(null, title, description, Instant.now(), pollChoices, creator);
        return this.pollRepository.save(poll);
    }

    public void deletePoll(Long pollId) {
        Poll poll = this.pollRepository.findById(pollId).orElseThrow(() -> new NullPointerException("Poll not found"));

        poll.getChoices().forEach(choice -> deletePollChoice(choice.getId()));
        poll.setChoices(new HashSet<>());

        this.pollRepository.delete(poll);
    }

    public PollChoice createPollChoice(String name) {
        return this.pollChoiceRepository.save(new PollChoice(null, name, new HashSet<>()));
    }

    public Poll addPollChoice(Long pollId, PollChoice pollChoice) {
        Poll poll = this.pollRepository.findById(pollId).orElseThrow(() -> new NullPointerException("Poll not found"));

        Set<PollChoice> choices = poll.getChoices();
        choices.add(pollChoice);
        poll.setChoices(choices);

        return this.pollRepository.save(poll);
    }

    public void deletePollChoice(Long pollChoiceId) {
        Poll poll = this.pollRepository.findByChoices_Id(pollChoiceId).orElseThrow(() -> new NullPointerException("Poll not found"));
        PollChoice pollChoice = this.pollChoiceRepository.findById(pollChoiceId).orElseThrow(() -> new NullPointerException("PollChoice not found"));

        Set<PollChoice> choices = poll.getChoices();
        choices.remove(pollChoice);
        poll.setChoices(choices);

        this.pollRepository.save(poll);
        this.pollChoiceRepository.delete(pollChoice);
    }

    public void addVote(User user, long pollChoiceId) {
        Poll poll = this.pollRepository.findByChoices_Id(pollChoiceId).orElseThrow(() -> new NullPointerException("Poll not found"));
        PollChoice pollChoice = this.pollChoiceRepository.findById(pollChoiceId).orElseThrow(() -> new NullPointerException("PollChoice not found"));

        if (hasVoted(user, poll.getId())) {
            return;
        }

        Set<User> voters = pollChoice.getVoters();
        voters.add(user);
        pollChoice.setVoters(voters);

        this.pollChoiceRepository.save(pollChoice);
    }

    public List<Poll> getPolls() {
        return this.pollRepository.findAll();
    }

    public Optional<Poll> getPoll(long id) {
        return this.pollRepository.findById(id);
    }

    public Optional<PollChoice> getPollChoice(long id) {
        return this.pollChoiceRepository.findById(id);
    }

    public boolean hasVoted(User user, long pollId) {
        Poll poll = this.pollRepository.findById(pollId).orElseThrow(() -> new NullPointerException("Poll not found"));
        for (PollChoice pollChoice : poll.getChoices()) {
            for (User votedUser : pollChoice.getVoters()) {
                if (user.getName().equalsIgnoreCase(votedUser.getName())) {
                    return true;
                }
            }
        }
        return false;
    }
}
