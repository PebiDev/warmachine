package at.peter.warmachine.api;

import at.peter.warmachine.model.Army;
import at.peter.warmachine.model.ArmyRepository;
import at.peter.warmachine.model.Leader;
import at.peter.warmachine.model.LeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("armies")
public class ArmyService {

    @ExceptionHandler(ArmyMissingException.class)
    public ResponseEntity<String> handleArmyMissingException(ArmyMissingException e) {
        return ResponseEntity.status(404).body(String.format("Army %d not found", e.getArmyId()));
    }

    @Autowired
    private ArmyRepository armyRepo;

    @Autowired
    private LeaderRepository leaderRepo;

    @GetMapping
    public List<Army> getArmies() {
        return armyRepo.findByOrderById();
    }

    @GetMapping("/{armyId}")
    public Army getArmy(@PathVariable("armyId") Long armyId) throws ArmyMissingException {
        return armyRepo.findById(armyId).orElseThrow(() -> new ArmyMissingException(armyId));
    }

    @PatchMapping("/{armyId}")
    public Army patchArmy(@PathVariable("armyId") Long armyId, @RequestBody Army army) throws ArmyMissingException {
        Army byId = armyRepo.findById(armyId).orElseThrow(() -> new ArmyMissingException(armyId));

        Optional<Leader> leader =  Optional.empty();
        if(army.getLeader() != null)
            leader = leaderRepo.findById(army.getLeader().getId());

        Optional.ofNullable(army.getName()).ifPresent(byId::setName);
        leader.ifPresent(byId::setLeader);
        Optional.ofNullable(army.getExperienceFactor()).ifPresent(byId::setExperienceFactor);
        Optional.ofNullable(army.getTrainingFactor()).ifPresent(byId::setTrainingFactor);
        Optional.ofNullable(army.getEquipmentFactor()).ifPresent(byId::setEquipmentFactor);
        Optional.ofNullable(army.getSpecialTroopFactor()).ifPresent(byId::setSpecialTroopFactor);
        Optional.ofNullable(army.getMountedFactor()).ifPresent(byId::setMountedFactor);
        Optional.ofNullable(army.getMissileFactor()).ifPresent(byId::setMissileFactor);
        Optional.ofNullable(army.getMagicalFactor()).ifPresent(byId::setMagicalFactor);
        Optional.ofNullable(army.getSpellFactor()).ifPresent(byId::setSpellFactor);
        Optional.ofNullable(army.getFlyingFactor()).ifPresent(byId::setFlyingFactor);
        Optional.ofNullable(army.getSpeedFactor()).ifPresent(byId::setSpeedFactor);

        return armyRepo.save(byId);
    }


    @PutMapping
    public Army putArmy(@RequestBody Army army) {
        Optional<Leader> leader =  Optional.empty();
        if(army.getLeader() != null)
            leader = leaderRepo.findById(army.getLeader().getId());
        leader.ifPresent(army::setLeader);
        return armyRepo.save(army);
    }

    @DeleteMapping(path = "/{armyId}")
    public void deleteArmy(@PathVariable("armyId") Long armyId) {
        armyRepo.deleteById(armyId);
    }
}
