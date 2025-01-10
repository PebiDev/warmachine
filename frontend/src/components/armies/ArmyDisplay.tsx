import { ReactElement, useMemo, useState } from "react";
import { IArmy } from "../../types/dto"
import classes from "./armyDisplay.module.css";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

const deleteArmy = async (armyId : number)=> {
    const response = await fetch(`/api/armies/${armyId}`, {method : "DELETE"})
        if (!response.ok) throw new Error(`Failed to delete ${armyId}`)
    
    }

type DeleteDialogProps = ArmyComponentProps&{open: boolean, onClose : ()=> void}
const DeleteDialog = ({army, open, onClose} : DeleteDialogProps) => {
const queryClient = useQueryClient()

    const {mutate} = useMutation({mutationKey: ["armies", "delete", army.id], mutationFn: deleteArmy, onSuccess: ()=> {queryClient.invalidateQueries({queryKey :["armies"]}); onClose()}})

    return <Dialog open={open} onClose = {onClose}>
        <DialogTitle>Delete Army {army.name}?</DialogTitle>
        <DialogActions>
            <Button onClick={onClose}>No</Button>
            <Button onClick={()=>mutate(army.id)} color="warning">Yes</Button>
        </DialogActions>
    </Dialog>
}






interface ArmyComponentProps{army : IArmy}
const ArmyComponent = ({army} : ArmyComponentProps) => {
    const [basicForceFactor, battleRating] = useMemo(()=>[calculateBasicForceFactor(army), calculateBattleRating(army)], [army])  
    const [open, setOpen] = useState(false) 
    // table row & cells    
    return <div>
    <h3 className={classes.armyName}>{army.name}  {army.leader && `led by ${army.leader.name}`}</h3>
    <p>id: {army.id}</p>
    <h3>Battle Rating : {battleRating}</h3>
    <h4>Basic Force Factor : {basicForceFactor}</h4>
    <div><Button variant="outlined" onClick={()=> setOpen(true)}>Delete</Button></div>
    <p>{JSON.stringify(army)}</p>
    <hr />
    <DeleteDialog army={army} open={open} onClose={() => setOpen(false)} />
    </div>
}



export default ArmyComponent

