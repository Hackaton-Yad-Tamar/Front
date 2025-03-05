import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { FC, SyntheticEvent, useState } from "react";
import { RequestList } from "../../components/ComponentTemplate/RequestList/RequestList";
import { users } from "../../components/ComponentTemplate/constants";
import { User } from "../../types/userType";
import { classes } from "./styles";

type ProfileViewProps = {
  user: User;
};

export const AdminView: FC<ProfileViewProps> = ({ user }) => {
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [selectedRequest, setSelectedRequest] = useState<User>();

  const handleApprove = (isApproved: boolean) => {
    // set is approved to true and record approvedBy and approved at columns
  };

  return (
    <Stack sx={classes.adminContainer} direction="row" gap={5}>
      <Stack sx={classes.requestsList} direction="column">
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              justifyContent: "center",
              direction: "rtl",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TabList onChange={handleChange}>
              <Tab label="בקשות פעילות" value="1" />
              <Tab label="היסטורית בקשות" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <RequestList
              requests={users}
              isFiltered
              {...{ setSelectedRequest }}
            />
          </TabPanel>
          <TabPanel value="2">
            <RequestList requests={users} {...{ setSelectedRequest }} />
          </TabPanel>
        </TabContext>
      </Stack>

      <Stack
        sx={classes.requestDetailsContainer}
        direction="column"
        alignItems="center"
      >
        <Typography sx={{ mb: "10px" }}>פירוט הבקשה</Typography>
        {!selectedRequest ? (
          <Typography>כדאי לבחור בקשה כדי לראות עוד פרטים מעניינים</Typography>
        ) : (
          <Typography>{selectedRequest.firstName}</Typography>
        )}
        <Stack direction="row">
          <Button
            onClick={() => handleApprove(false)}
            variant="outlined"
            sx={{ borderColor: "red", color: "red" }}
          >
            <Typography sx={{ ml: "5px" }}>דחה</Typography>
            <CloseIcon />
          </Button>
          <Button
            onClick={() => handleApprove(true)}
            variant="contained"
            sx={{ color: "white", backgroundColor: "green", mr: "15px" }}
          >
            <Typography sx={{ ml: "5px" }}>אשר</Typography>
            <CheckIcon />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
