import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RequestDialog from "./requestDialog";
import { Request, RequestsListProps } from "../../types/request.types";

const RequestsList: React.FC<RequestsListProps> = ({ requests: requests }) => {
  const [selectedEmergency, setSelectedEmergency] = React.useState<Request | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleRowClick = (emergency: Request) => {
    setSelectedEmergency(emergency);
    setDialogOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ direction: "rtl" }}>
        <Table aria-label="collapsible emergency table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>שם</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>סוג חירום</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>מקום</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>זמן שירות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((row: Request) => (
              <TableRow
                key={row.name}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "lightgray" },
                }}
                onClick={() => handleRowClick(row)}
              >
                <TableCell sx={{ textAlign: "right" }}>{row.name}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{row.emergencyType}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{row.location}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{row.severity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <RequestDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        emergency={selectedEmergency}
      />
    </>
  );
};

export default RequestsList;
