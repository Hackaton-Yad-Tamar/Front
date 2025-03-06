import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { FC, SyntheticEvent, useState } from "react";
import { UseGetRequests } from "../../components/ComponentTemplate/RequestList/hooks";
import { RequestList } from "../../components/ComponentTemplate/RequestList/RequestList";
import { User } from "../../types/userType";
import { ProfileCard } from "../ProfileView/ProfileCard";
import { classes } from "./styles";

export const AdminView: FC = () => {
  const [value, setValue] = useState("1");
  const { data: requests = [] } = UseGetRequests();
  const [selectedRequest, setSelectedRequest] = useState<User>();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
            <RequestList isFiltered {...{ setSelectedRequest, requests }} />
          </TabPanel>
          <TabPanel value="2">
            <RequestList {...{ setSelectedRequest, requests }} />
          </TabPanel>
        </TabContext>
      </Stack>

      <Stack
        sx={classes.requestDetailsContainer}
        direction="column"
        alignItems="center"
      >
        {!selectedRequest ? (
          <Typography>כדאי לבחור בקשה כדי לראות עוד פרטים מעניינים</Typography>
        ) : (
          <ProfileCard user={selectedRequest} />
        )}
      </Stack>
    </Stack>
  );
};
