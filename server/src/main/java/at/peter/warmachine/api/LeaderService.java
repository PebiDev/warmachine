package at.peter.warmachine.api;

import at.peter.warmachine.model.Leader;
import at.peter.warmachine.model.LeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("leaders")
public class LeaderService {

    @ExceptionHandler(LeaderMissingException.class)
    public ResponseEntity<String> handleLeaderMissingException(LeaderMissingException e) {
        return ResponseEntity.status(404).body(String.format("Leader %d not found", e.getLeaderId()));
    }

    @Autowired
    private LeaderRepository leaderRepo;

    @GetMapping
    public List<Leader> getLeaders() {
        return StreamSupport.stream(leaderRepo.findAll().spliterator(), false).toList();
    }

    @GetMapping("/{leaderId}")
    public Leader getLeader(@PathVariable("leaderId") Long leaderId) throws LeaderMissingException {
        return leaderRepo.findById(leaderId).orElseThrow(() -> new LeaderMissingException(leaderId));
    }

    @PutMapping
    public Leader putLeader(@RequestBody Leader leader) {
        return leaderRepo.save(leader);
    }

    @DeleteMapping
    public void deleteLeader(@PathVariable("leaderId") Long leaderId) throws LeaderMissingException {
        Leader leader = leaderRepo.findById(leaderId).orElseThrow(() -> new LeaderMissingException(leaderId));
        leaderRepo.delete(leader);
    }

    @PatchMapping("/{leaderId}")
    public Leader patchLeader(@PathVariable("leaderId") Long leaderId, @RequestBody Leader leader) throws LeaderMissingException {

        Leader byId = leaderRepo.findById(leaderId).orElseThrow(() -> new LeaderMissingException(leaderId));

        Optional.ofNullable(leader.getName()).ifPresent((byId::setName));
        Optional.ofNullable(leader.getLeaderLevel()).ifPresent((byId::setLeaderLevel));
        Optional.ofNullable(leader.getIntAdjustment()).ifPresent((byId::setIntAdjustment));
        Optional.ofNullable(leader.getWisAdjustment()).ifPresent((byId::setWisAdjustment));
        Optional.ofNullable(leader.getChaAdjustment()).ifPresent((byId::setChaAdjustment));

        return leaderRepo.save(byId);

    }
}
