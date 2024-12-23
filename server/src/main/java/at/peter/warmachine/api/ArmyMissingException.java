package at.peter.warmachine.api;

public class ArmyMissingException extends Exception{
    private final Long armyId;

    public ArmyMissingException(Long armyId){
        this.armyId = armyId;
    }

    public Long getArmyId() {
        return armyId;
    }
}
