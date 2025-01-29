import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IArmy } from "../../types/dto";
import { calculateBattleRating } from "../armies/calculateBasicForceFactor";

interface SelectForceProps {
  label: string;
  armies: IArmy[];
  selectedArmy?: IArmy;
  onChange: (selectedArmy?: IArmy) => void;
}

const findIndex = (armies: IArmy[], army?: IArmy) => {
  if (!army) return null;
  const index = armies.findIndex((cur) => army.id == cur.id);
  if (index >= 0) return index;
  return null;
};

const SelectForce = ({
  label,
  armies,
  selectedArmy,
  onChange,
}: SelectForceProps) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        value={findIndex(armies, selectedArmy)}
        onChange={(event) => {
          onChange(
            event.target.value != null
              ? armies[Number(event.target.value)]
              : undefined
          );
        }}>
        {armies.map((army, index) => (
          <MenuItem key={army.id} value={index}>
            {army.name} ({calculateBattleRating(army)})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectForce;
