import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { IArmy } from "../../types/dto";

export interface ArmyFormType {
  name: string;
  expFactor: string;
  trainFactor: string;
  eqpFactor: string;
  stFactor: string;
  mntFactor: string;
  misFactor: string;
  magFactor: string;
  spellFactor: string;
  flyFactor: string;
  speedFactor: boolean;
  description?: string;
}

interface ArmyFormsProps {
  existingArmy?: IArmy;
  onSubmit: (newArmy: IArmy) => void;
}

export const ArmyForms = ({ existingArmy, onSubmit }: ArmyFormsProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors, validatingFields },
  } = useForm<IArmy>({
    mode: "all",
    values: existingArmy,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ "& > div": { m: 1, width: "25ch" }, display: "flex" }}>
        <Stack spacing={1}>
          <TextField
            required
            label="Army Name"
            {...register("name", { required: true })}
          />
          <TextField
            required
            type="number"
            label="Experience Factor"
            {...register("experienceFactor", {
              required: true,
              valueAsNumber: true,
            })}
          />
          <TextField
            required
            type="number"
            label="Training Factor"
            {...register("trainingFactor", {
              required: true,
              valueAsNumber: true,
            })}
          />
          <InputLabel>Quality of Equipment</InputLabel>
          <Select
            required
            {...register("equipmentFactor", {
              required: true,
              valueAsNumber: true,
            })}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
          <TextField
            required
            label="% of Troops with Mounts"
            error={!!errors.mountedFactor}
            helperText={errors.mountedFactor?.message}
            {...register("mountedFactor", {
              required: true,
              valueAsNumber: true,
              validate: (v) => (v >= 0 && v <= 100) || "Not Percentage",
            })}
          />
          <TextField
            required
            label="% of Troops with Special Abilities"
            error={!!errors.specialTroopFactor}
            helperText={errors.specialTroopFactor?.message}
            {...register("specialTroopFactor", {
              required: true,
              valueAsNumber: true,
              validate: (v) => (v >= 0 && v <= 100) || "Not Percentage",
            })}
          />
        </Stack>

        <Stack spacing={1}>
          <TextField
            required
            label="% of Troops with Missile Weapons"
            error={!!errors.missileFactor}
            helperText={errors.missileFactor?.message}
            {...register("missileFactor", {
              required: true,
              valueAsNumber: true,
              validate: (v) => (v >= 0 && v <= 100) || "Not Percentage",
            })}
          />
          <TextField
            required
            label="% of Troops with Magical Abilities"
            error={!!errors.magicalFactor}
            helperText={errors.magicalFactor?.message}
            {...register("magicalFactor", {
              required: true,
              valueAsNumber: true,
              validate: (v) => (v >= 0 && v <= 100) || "Not Percentage",
            })}
          />
          <TextField
            required
            label="% of Troops with Spell casting"
            error={!!errors.spellFactor}
            helperText={errors.spellFactor?.message}
            {...register("spellFactor", {
              required: true,
              valueAsNumber: true,
              validate: (v) => (v >= 0 && v <= 100) || "Not Percentage",
            })}
          />
          <TextField
            required
            label="% of Troops with Flying"
            error={!!errors.flyingFactor}
            helperText={errors.flyingFactor?.message}
            {...register("flyingFactor", {
              required: true,
              valueAsNumber: true,
              validate: (v) => (v >= 0 && v <= 100) || "Not Percentage",
            })}
          />
          <FormControlLabel
            control={<Checkbox {...register("speedFactor")} />}
            label="Movespeed over 12"
          />
          <TextField
            label="Description (optional)"
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register("description")}
          />
        </Stack>
      </Box>
      <Button sx={{ float: "right" }} type="submit" disabled={!isValid}>
        OK
      </Button>
    </Box>
  );
};
