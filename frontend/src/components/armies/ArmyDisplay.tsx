import { useMemo } from "react";
import { IArmy } from "../../types/dto";
import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import {
  calculateBasicForceFactor,
  calculateBattleRating,
} from "./calculateBasicForceFactor";

interface ArmyComponentProps {
  army: IArmy;
}
const ArmyComponent = ({ army }: ArmyComponentProps) => {
  const [basicForceFactor, battleRating] = useMemo(
    () => [calculateBasicForceFactor(army), calculateBattleRating(army)],
    [army]
  );

  // delete navigation
  const navigate = useNavigate();
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate({ to: "/armies/delete/$id", params: { id: `${army.id}` } });
  };
  const handleUpdate = () => {
    navigate({ to: "/armies/update/$id", params: { id: `${army.id}` } });
  };

  return (
    <TableRow hover onClick={handleUpdate}>
      <TableCell>{army.id}</TableCell>
      <TableCell align="right">{army.name}</TableCell>
      <TableCell align="right">{battleRating}</TableCell>
      <TableCell align="right">{basicForceFactor}</TableCell>
      <TableCell align="right">
        <Button variant="text" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ArmyComponent;
