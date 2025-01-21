import { useMemo } from "react";
import { IArmy, ILeader } from "../../types/dto";
import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

const calculateLeaderFactor = (leader: ILeader) => {
  if (!leader) return 0;
  const result =
    leader.intAdjustment +
    leader.wisAdjustment +
    leader.chaAdjustment +
    leader.leaderLevel;

  return result;
};

interface LeaderComponentProps {
  leader: ILeader;
}
const LeaderComponent = ({ leader }: LeaderComponentProps) => {
  const leaderFactor = useMemo(() => calculateLeaderFactor(leader), [leader]);

  // delete navigation
  const navigate = useNavigate();
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate({ to: "/leaders/delete/$id", params: { id: `${leader.id}` } });
  };
  const handleUpdate = () => {
    navigate({ to: "/leaders/update/$id", params: { id: `${leader.id}` } });
  };

  return (
    <TableRow hover onClick={handleUpdate}>
      <TableCell>{leader.id}</TableCell>
      <TableCell align="right">{leader.name}</TableCell>
      <TableCell align="right">{leaderFactor}</TableCell>
      <TableCell align="right">{leader.intAdjustment}</TableCell>
      <TableCell align="right">{leader.wisAdjustment}</TableCell>
      <TableCell align="right">{leader.chaAdjustment}</TableCell>
      <TableCell align="right">{leader.leaderLevel}</TableCell>
      <TableCell align="right">
        <Button variant="text" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default LeaderComponent;
