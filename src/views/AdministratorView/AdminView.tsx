import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { SyntheticEvent, useState } from "react";
import { RequestList } from "../../components/ComponentTemplate/RequestList/RequestList";
import { users } from "../../components/ComponentTemplate/constants";
import { User } from "../../types/userType";
import { classes } from "./styles";

export const AdminView = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [selectedUser, setSelectedUser] = useState<User>();

  return (
    <Stack sx={classes.adminContainer} direction="row">
      <Stack sx={classes.requestsList} direction="column">
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              justifyContent: "center",
              direction: "rtl",
            }}
          >
            <TabList onChange={handleChange}>
              <Tab label="בקשות פעילות" value="1" />
              <Tab label="היסטורית בקשות" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <RequestList requests={users} isFiltered {...{ setSelectedUser }} />
          </TabPanel>
          <TabPanel value="2">
            <RequestList requests={users} {...{ setSelectedUser }} />
          </TabPanel>
        </TabContext>
      </Stack>

      {!selectedUser ? (
        <Stack sx={classes.adminSidebar} direction="column">
          בחרו בקשה כדי לראות את פרטי המשתמש
        </Stack>
      ) : (
        <Box>{selectedUser.firstName}</Box>
      )}
    </Stack>
  );
};
