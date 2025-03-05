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
import CardList from "./Card";

const RequestsList: React.FC<RequestsListProps> = ({ requests: requests }) => {
  const [selectedEmergency, setSelectedEmergency] = React.useState<Request | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleRowClick = (emergency: Request) => {
    setSelectedEmergency(emergency);
    setDialogOpen(true);
  };
  const cardsData = [
    {
      title: "אינסטלציה",
      subtitle: "נדרש רכב",
      description: "ישראל ישראלי",
      location: "רחובות"
    },
    {
        title: "אינסטלציה",
        subtitle: "נדרש רכב",
        description: "ישראל ישראלי",
        location: "רחובות"
      },
      {
        title: "אינסטלציה",
        subtitle: "נדרש רכב",
        description: "ישראל ישראלי",
        location: "רחובות"
      },
    // Add more cards as needed
  ];

  return (
    <div>
      <CardList cardsData={cardsData} />
    </div>
  )
};

export default RequestsList;
