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
import {
  FieldValues,
  Path,
  useController,
  UseControllerReturn,
  useForm,
} from "react-hook-form";
import { ILeader } from "../../types/dto";
import { useState } from "react";
import { range } from "lodash";

const createAdjustmentMenuItems = () => {
  return [
    <MenuItem key={-3} value={-3}>
      -3
    </MenuItem>,
    <MenuItem key={-2} value={-2}>
      -2
    </MenuItem>,
    <MenuItem key={-1} value={-1}>
      -1
    </MenuItem>,
    <MenuItem key={0} value={0}>
      0
    </MenuItem>,
    <MenuItem key={1} value={1}>
      1
    </MenuItem>,
    <MenuItem key={2} value={2}>
      2
    </MenuItem>,
    <MenuItem key={3} value={3}>
      3
    </MenuItem>,
    <MenuItem key={4} value={4}>
      4
    </MenuItem>,
    <MenuItem key={5} value={5}>
      5
    </MenuItem>,
  ];
};

const createLevelItem = (actualLevel: number, displayedLevel: number) => (
  <MenuItem value={actualLevel} key={actualLevel}>
    {displayedLevel}
  </MenuItem>
);

// UseControllerReturn<ILeader, "intAdjustment">

const toFieldProps = <T extends FieldValues>({
  field: { value, onChange, onBlur, name, ref, disabled },
}: UseControllerReturn<T, Path<T>>) => ({
  value,
  onChange,
  onBlur,
  name,
  inputRef: ref,
  disabled,
});

interface LeaderFormProps {
  existingLeader?: ILeader;
  onSubmit: (newLeader: ILeader) => void;
}
export const LeaderForm = ({ existingLeader, onSubmit }: LeaderFormProps) => {
  const [newStyleLevels, setNewStyleLevels] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<ILeader>({
    mode: "all",
    values: existingLeader,
  });

  const intAdjustmentControl = toFieldProps(
    useController({
      name: "intAdjustment",
      control,
      rules: { required: true },
    })
  );

  const wisAdjustmentControl = toFieldProps(
    useController({
      name: "wisAdjustment",
      control,
      rules: { required: true },
    })
  );

  const chaAdjustmentControl = toFieldProps(
    useController({
      name: "chaAdjustment",
      control,
      rules: { required: true },
    })
  );

  const leaderLevelControl = toFieldProps(
    useController({
      name: "leaderLevel",
      control,
      rules: { required: true },
    })
  );

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
          <Select required {...intAdjustmentControl}>
            {createAdjustmentMenuItems()}
          </Select>

          <InputLabel>Wisdom Bonus</InputLabel>
          <Select required {...wisAdjustmentControl}>
            {createAdjustmentMenuItems()}
          </Select>

          <InputLabel>Charisma Bonus</InputLabel>
          <Select required {...chaAdjustmentControl}>
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
          <Select required {...leaderLevelControl}>
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
