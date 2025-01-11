import { useQuery } from "@tanstack/react-query";
import {
  createLazyFileRoute,
  Outlet,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-router";
import { IArmy } from "../types/dto";
import ArmyComponent from "../components/armies/ArmyDisplay";
import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RouteOutletPaper } from "../components/armies/armies.styles";

const loadArmies = async (): Promise<IArmy[]> => {
  const response = await fetch("/api/armies");
  const armies = await response.json();
  return armies;
};

const ArmyList = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["armies"],
    queryFn: loadArmies,
  });
  if (isLoading) return "...";
  if (isError) return " Uahh!";
  if (data)
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Army ID</TableCell>
              <TableCell align="right">Army Name</TableCell>
              <TableCell align="right">Battle Rating</TableCell>
              <TableCell align="right">Basic Force Rating</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((army) => {
              //table here>
              return <ArmyComponent army={army} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
};

const RouteOutlet = () => {
  const match = useMatchRoute();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ to: "/armies" });
  };
  return (
    <Modal open={!match({ to: "/armies" })} onClose={handleClose}>
      <RouteOutletPaper>
        <Outlet />
      </RouteOutletPaper>
    </Modal>
  );
};

const RouteComponent = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate({ to: "/armies/create" });
  };
  return (
    <div>
      <h3>List of all Armies</h3>
      <Button onClick={handleOnClick}>Create New Army</Button>
      <ArmyList />
      <RouteOutlet></RouteOutlet>
    </div>
  );
};

export const Route = createLazyFileRoute("/armies")({
  component: RouteComponent,
});
