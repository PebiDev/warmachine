package at.peter.warmachine.api;

public class LeaderMissingException extends Exception {
    private final Long leaderId;

    public LeaderMissingException(Long leaderId){

        this.leaderId = leaderId;
    }

    public Long getLeaderId() {
        return leaderId;
    }
}
