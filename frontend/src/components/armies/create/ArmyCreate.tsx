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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const createArmy = async (
  name: string,
  expFactor: string,
  trainFactor: string,
  eqpFactor: string,
  stFactor: string,
  mntFactor: string,
  misFactor: string,
  magFactor: string,
  spellFactor: string,
  flyFactor: string,
  speedFactor: boolean,
  description: string
) => {
  const body = {
    name,
    experienceFactor: Number(expFactor),
    trainingFactor: Number(trainFactor),
    equipmentFactor: Number(eqpFactor),
    specialTroopFactor: Number(stFactor),
    mountedFactor: Number(mntFactor),
    missileFactor: Number(misFactor),
    magicalFactor: Number(magFactor),
    spellFactor: Number(spellFactor),
    flyingFactor: Number(flyFactor),
    speedFactor,
    description,
  };
  const response = await fetch(`/api/armies`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error(`Failed to create Army`);
};

const ArmyCreateComponent = () => {
  const [name, setName] = useState("");
  const [expFactor, setExpFactor] = useState("");
  const [trainFactor, setTrainFactor] = useState("");
  const [eqpFactor, setEqpFactor] = useState("5");
  const [stFactor, setStFactor] = useState("");
  const [mntFactor, setMntFactor] = useState("");
  const [misFactor, setMisFactor] = useState("");
  const [magFactor, setMagFactor] = useState("");
  const [spellFactor, setSpellFactor] = useState("");
  const [flyFactor, setFlyFactor] = useState("");
  const [spdFactor, setSpdFactor] = useState(false);
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ to: "/armies" });
  };
  const { mutate } = useMutation({
    mutationKey: ["armies", "create"],
    mutationFn: async () =>
      await createArmy(
        name,
        expFactor,
        trainFactor,
        eqpFactor,
        stFactor,
        mntFactor,
        misFactor,
        magFactor,
        spellFactor,
        flyFactor,
        spdFactor,
        description
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["armies"] });
      handleClose();
    },
  });

  return (
    <Box sx={{ "& > div": { m: 1, width: "25ch" }, display: "flex" }}>
      <Stack spacing={1}>
        <TextField
          required
          label="Army Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          required
          label="Experience Factor"
          value={expFactor}
          onChange={(event) => setExpFactor(event.target.value)}
        />

        <TextField
          required
          label="Training Factor"
          value={trainFactor}
          onChange={(event) => setTrainFactor(event.target.value)}
        />

        <InputLabel>Quality of Equipment</InputLabel>
        <Select
          required
          value={eqpFactor}
          onChange={(event) => setEqpFactor(event.target.value)}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>

        <TextField
          required
          label="Special Troop Factor"
          value={stFactor}
          onChange={(event) => setStFactor(event.target.value)}
        />

        <InputLabel>% of Troops with Mounts</InputLabel>
        <Select
          fullWidth
          required
          value={mntFactor}
          onChange={(event) => setMntFactor(event.target.value)}>
          <MenuItem value={0}>0 to 19%</MenuItem>
          <MenuItem value={0.2}>20 to 49%</MenuItem>
          <MenuItem value={0.5}>50 to 100%</MenuItem>
        </Select>

        <InputLabel>% of Troops with Missile Weapons</InputLabel>
        <Select
          fullWidth
          required
          value={misFactor}
          onChange={(event) => setMisFactor(event.target.value)}>
          <MenuItem value={0}>0 to 19%</MenuItem>
          <MenuItem value={0.2}>20 to 49%</MenuItem>
          <MenuItem value={0.5}>50 to 100%</MenuItem>
        </Select>
      </Stack>
      <Stack>
        <InputLabel>% of Troops with Magical Abilities</InputLabel>
        <Select
          fullWidth
          required
          label="% of Troops with Magical Abilities"
          value={magFactor}
          onChange={(event) => setMagFactor(event.target.value)}>
          <MenuItem value={0}>0%</MenuItem>
          <MenuItem value={0.01}>1 to 19%</MenuItem>
          <MenuItem value={0.2}>20 to 99%</MenuItem>
          <MenuItem value={1}>100%</MenuItem>
        </Select>

        <InputLabel>% of Troops with Spellcasting</InputLabel>
        <Select
          fullWidth
          required
          value={spellFactor}
          onChange={(event) => setSpellFactor(event.target.value)}>
          <MenuItem value={0}>0% to 4%</MenuItem>
          <MenuItem value={0.05}>5% to 29%</MenuItem>
          <MenuItem value={0.3}>30% to 100%</MenuItem>
        </Select>

        <InputLabel>% of Troops with Flying</InputLabel>
        <Select
          fullWidth
          required
          value={flyFactor}
          onChange={(event) => setFlyFactor(event.target.value)}>
          <MenuItem value={0}>0%</MenuItem>
          <MenuItem value={0.01}>1% to 19%</MenuItem>
          <MenuItem value={0.2}>20% to 100%</MenuItem>
        </Select>

        <FormControlLabel
          control={
            <Checkbox
              checked={spdFactor}
              onChange={(event) => setSpdFactor(event.target.checked)}
            />
          }
          label="Movespeed over 12"
        />

        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <Button
          sx={{ m: 1 }}
          variant="outlined"
          onClick={() => {
            mutate();
          }}>
          Create Army
        </Button>
      </Stack>
    </Box>
  );
};

export default ArmyCreateComponent;
