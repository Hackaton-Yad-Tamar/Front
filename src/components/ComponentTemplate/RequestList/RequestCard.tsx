import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { User } from "../../../types/userType";
import { classes } from "./styles";
export interface RequestCardProps {
  request: User;
  isEditable?: boolean;
  setSelectedRequest: Dispatch<SetStateAction<User | undefined>>;
}

export const RequestCard: FC<RequestCardProps> = ({
  request,
  isEditable = false,
  setSelectedRequest,
}) => {
  return (
    <Paper sx={classes.paper}>
      <Stack direction="row" alignItems="center" gap={3}>
        <Avatar
          src={request.profilePicture}
          alt={`${request.firstName} ${request.lastName}`}
          sx={{ width: 56, height: 56 }}
        />
        <Stack direction="column">
          <Typography variant="h6">{` ${request.firstName} ${request.lastName}`}</Typography>
        </Stack>
        <Stack direction="column">
          <Typography sx={{ textDecoration: "underline" }}>
            עיר מגורים:
          </Typography>
          <Typography variant="h6">{` ${request.city}`}</Typography>
        </Stack>
        <Stack direction="column">
          <Typography sx={{ textDecoration: "underline" }}>
            מספר טלפון:
          </Typography>
          <Typography variant="h6">{` ${request.phoneNumber}`}</Typography>
        </Stack>
        <Stack direction="column">
          <Typography sx={{ textDecoration: "underline" }}>
            מבקש להיות:
          </Typography>
          <Typography variant="h6">{` ${request.userType}`}</Typography>
        </Stack>
      </Stack>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Typography
          sx={{
            backgroundColor:
              request.status !== "PENDING"
                ? request.status === "APPROVED"
                  ? "green"
                  : "red"
                : "orange",
            padding: "7px",
            borderRadius: "10px",
          }}
        >
          {request.status !== "PENDING"
            ? request.status === "APPROVED"
              ? "מאושרת"
              : "נדחתה"
            : "ממתין"}
        </Typography>
        <Button
          variant="contained"
          sx={classes.viewButton}
          onClick={() => setSelectedRequest(request)}
        >
          צפייה
          <RemoveRedEyeIcon sx={{ mr: 2 }} />
        </Button>
      </Box>
    </Paper>
  );
};
