import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ILeader } from "../../types/dto";
import { useState } from "react";
import { range } from "lodash";

const createAdjustmentMenuItems = () => {
  return [
    <MenuItem value={-3}>-3</MenuItem>,
    <MenuItem value={-2}>-2</MenuItem>,
    <MenuItem value={-1}>-1</MenuItem>,
    <MenuItem value={0}>0</MenuItem>,
    <MenuItem value={1}>1</MenuItem>,
    <MenuItem value={2}>2</MenuItem>,
    <MenuItem value={3}>3</MenuItem>,
    <MenuItem value={4}>4</MenuItem>,
    <MenuItem value={5}>5</MenuItem>,
  ];
};

const createLevelItem = (actualLevel: number, displayedLevel: number) => (
  <MenuItem value={actualLevel} key={actualLevel}>
    {displayedLevel}
  </MenuItem>
);

interface LeaderFormProps {
  existingLeader?: ILeader;
  onSubmit: (newLeader: ILeader) => void;
}
export const LeaderForm = ({ existingLeader, onSubmit }: LeaderFormProps) => {
  const [newStyleLevels, setNewStyleLevels] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ILeader>({
    mode: "all",
    values: existingLeader,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ "& > div": { m: 1, width: "25ch" }, display: "flex" }}>
        <Stack spacing={1}>
          <TextField
            required
            label="Leader Name"
            {...register("name", { required: true })}
          />

          <InputLabel>Intelligence Bonus</InputLabel>
          <Select
            required
            {...register("intAdjustment", {
              required: true,
              valueAsNumber: true,
            })}>
            {createAdjustmentMenuItems()}
          </Select>

          <InputLabel>Wisdom Bonus</InputLabel>
          <Select
            required
            {...register("wisAdjustment", {
              required: true,
              valueAsNumber: true,
            })}>
            {createAdjustmentMenuItems()}
          </Select>

          <InputLabel>Charisma Bonus</InputLabel>
          <Select
            required
            {...register("chaAdjustment", {
              required: true,
              valueAsNumber: true,
            })}>
            {createAdjustmentMenuItems()}
          </Select>

          <FormControlLabel
            control={
              <Switch
                checked={newStyleLevels}
                onChange={(evt) => setNewStyleLevels(evt.target.checked)}
              />
            }
            label="D&D 1st / AD&D and upward"
          />
          <InputLabel>Leader Level</InputLabel>
          <Select
            required
            {...register("leaderLevel", {
              required: true,
              valueAsNumber: true,
            })}>
            {!newStyleLevels
              ? range(1, 37, 1).map((val, index) =>
                  createLevelItem(val, index + 1)
                )
              : range(1.8, 37, 1.8).map((val, index) =>
                  createLevelItem(val, index + 1)
                )}
          </Select>
        </Stack>
      </Box>
      <Button sx={{ float: "right" }} type="submit" disabled={!isValid}>
        OK
      </Button>
    </Box>
  );
};
