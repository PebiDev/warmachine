package at.peter.warmachine.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Leader {
    private Long id;
    private String name;
    private Integer intAdjustment;
    private Integer wisAdjustment;
    private Integer chaAdjustment;
    private Float leaderLevel;


    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getIntAdjustment() {
        return intAdjustment;
    }

    public void setIntAdjustment(Integer intAdjustment) {
        this.intAdjustment = intAdjustment;
    }

    public Integer getWisAdjustment() {
        return wisAdjustment;
    }

    public void setWisAdjustment(Integer wisAdjustment) {
        this.wisAdjustment = wisAdjustment;
    }

    public Integer getChaAdjustment() {
        return chaAdjustment;
    }

    public void setChaAdjustment(Integer chaAdjustment) {
        this.chaAdjustment = chaAdjustment;
    }

    public Float getLeaderLevel() {
        return leaderLevel;
    }

    public void setLeaderLevel(Float leaderLevel) {
        this.leaderLevel = leaderLevel;
    }
}
