import { useMemo } from "react";
import { IArmy } from "../../types/dto"
import classes from "./armyDisplay.module.css";

const calculateLeaderFactor = ({leader} : IArmy) => {
    if (!leader) return 0
    const result = leader.intAdjustment + 
        leader.wisAdjustment +
        leader.chaAdjustment + 
        leader.leaderLevel;

    return result
}

const calculateBasicForceFactor = (army : IArmy) => {
    const basicForceFactor = calculateLeaderFactor(army) + 
        army.experienceFactor + 
        army.trainingFactor +
        army.equipmentFactor +
        army.specialTroopFactor * 20
    return basicForceFactor
}

const calculateBattleRating = (army : IArmy) => {
    const basicForceFactorFraction = Math.ceil(calculateBasicForceFactor(army)/10)
    let battleRating = calculateBasicForceFactor(army)
    if (army.mountedFactor >= 0.2) battleRating += basicForceFactorFraction
    if (army.mountedFactor >= 0.5) battleRating += basicForceFactorFraction
    if (army.missileFactor >= 0.2) battleRating += basicForceFactorFraction
    if (army.missileFactor >= 0.5) battleRating += basicForceFactorFraction
    if (army.magicalFactor >= 0.01) battleRating += basicForceFactorFraction
    if (army.magicalFactor >= 0.2) battleRating += basicForceFactorFraction
    if (army.magicalFactor >= 1) battleRating += basicForceFactorFraction
    if (army.spellFactor >= 0.05) battleRating += basicForceFactorFraction
    if (army.spellFactor >= 0.3) battleRating += basicForceFactorFraction
    if (army.flyingFactor >= 0.01) battleRating += basicForceFactorFraction
    if (army.flyingFactor >= 0.2) battleRating += basicForceFactorFraction
    if (army.speedFactor) battleRating += basicForceFactorFraction

    return battleRating
}

interface ArmyComponentProps{army : IArmy}
const ArmyComponent = ({army} : ArmyComponentProps) => {
    const [basicForceFactor, battleRating] = useMemo(()=>[calculateBasicForceFactor(army), calculateBattleRating(army)], [army])  
    
        
    return <div>
    <h3 className={classes.armyName}>{army.name}  {army.leader && `led by ${army.leader.name}`}</h3>
    <p>id: {army.id}</p>
    <h3>Battle Rating : {battleRating}</h3>
    <h4>Basic Force Factor : {basicForceFactor}</h4>
    <p>{JSON.stringify(army)}</p>
    <hr />
    </div>
}



export default ArmyComponent

