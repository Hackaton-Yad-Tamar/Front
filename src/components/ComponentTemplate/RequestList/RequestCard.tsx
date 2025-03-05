import { Avatar, Paper } from "@mui/material";
import { FC } from "react";
import { User } from "../../../types/userType";

export interface RequestCardProps {
  request: User;
}

export const RequestCard: FC<RequestCardProps> = ({ request }) => {
  return (
    <Paper sx={{ padding: "20px", mb: "20px", backgroundColor: "#00AEEE" }}>
      <Avatar src={request.profilePicture} />
      {`${request.firstName} ${request.lastName}`}
    </Paper>
  );
};
