package at.peter.warmachine.model;

import jakarta.persistence.*;

@Entity
public class Army {
    private Long id;
    private String name;
    private Leader leader;
    private Integer experienceFactor;
    private Integer trainingFactor;
    private Integer equipmentFactor;
    private Float specialTroopFactor;
    private Float mountedFactor;
    private Float missileFactor;
    private Float magicalFactor;
    private Float spellFactor;
    private Float flyingFactor;
    private Boolean speedFactor;
    private String description;

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

    @ManyToOne
    @JoinColumn(name = "leader_id")
    public Leader getLeader() {
        return leader;
    }

    public void setLeader(Leader leader) {
        this.leader = leader;
    }

    public Integer getExperienceFactor() {
        return experienceFactor;
    }

    public void setExperienceFactor(Integer experienceFactor) {
        this.experienceFactor = experienceFactor;
    }

    public Integer getTrainingFactor() {
        return trainingFactor;
    }

    public void setTrainingFactor(Integer trainingFactor) {
        this.trainingFactor = trainingFactor;
    }

    public Integer getEquipmentFactor() {
        return equipmentFactor;
    }

    public void setEquipmentFactor(Integer equipmentFactor) {
        this.equipmentFactor = equipmentFactor;
    }

    public Float getSpecialTroopFactor() {
        return specialTroopFactor;
    }

    public void setSpecialTroopFactor(Float specialTroopFactor) {
        this.specialTroopFactor = specialTroopFactor;
    }

    public Float getMountedFactor() {
        return mountedFactor;
    }

    public void setMountedFactor(Float mountedFactor) {
        this.mountedFactor = mountedFactor;
    }

    public Float getMissileFactor() {
        return missileFactor;
    }

    public void setMissileFactor(Float missileFactor) {
        this.missileFactor = missileFactor;
    }

    public Float getMagicalFactor() {
        return magicalFactor;
    }

    public void setMagicalFactor(Float magicalFactor) {
        this.magicalFactor = magicalFactor;
    }

    public Float getSpellFactor() {
        return spellFactor;
    }

    public void setSpellFactor(Float spellFactor) {
        this.spellFactor = spellFactor;
    }

    public Float getFlyingFactor() {
        return flyingFactor;
    }

    public void setFlyingFactor(Float flyingFactor) {
        this.flyingFactor = flyingFactor;
    }

    public Boolean getSpeedFactor() {
        return speedFactor;
    }

    public void setSpeedFactor(Boolean speedFactor) {
        this.speedFactor = speedFactor;
    }

    @Lob
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
