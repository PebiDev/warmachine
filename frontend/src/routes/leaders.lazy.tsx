import { useQuery } from "@tanstack/react-query";
import {
  createLazyFileRoute,
  Outlet,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-router";
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
import LeaderComponent from "../components/leaders/LeaderDisplay";
import { loadLeaders } from "../components/leaders/loadLeaders";

const LeaderList = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["leaders"],
    queryFn: loadLeaders,
  });
  if (isLoading) return "...";
  if (isError) return " Uahh!";
  if (data)
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Leader ID</TableCell>
              <TableCell align="right">Leader Name</TableCell>
              <TableCell align="right">Leader Factor</TableCell>
              <TableCell align="right">Intelligence Bonus</TableCell>
              <TableCell align="right">Wisdom Bonus</TableCell>
              <TableCell align="right">Charisma Bonus</TableCell>
              <TableCell align="right">Leader Level</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((leader) => {
              //table here>
              return <LeaderComponent leader={leader} />;
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
    navigate({ to: "/leaders" });
  };
  return (
    <Modal open={!match({ to: "/leaders" })} onClose={handleClose}>
      <RouteOutletPaper>
        <Outlet />
      </RouteOutletPaper>
    </Modal>
  );
};

const RouteComponent = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate({ to: "/leaders/create" });
  };
  return (
    <div>
      <h3>List of all Leaders</h3>
      <Button onClick={handleOnClick}>Create New Leader</Button>
      <LeaderList />
      <RouteOutlet></RouteOutlet>
    </div>
  );
};

export const Route = createLazyFileRoute("/leaders")({
  component: RouteComponent,
});
