import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { SyntheticEvent, useState } from "react";
import { RequestList } from "../../components/ComponentTemplate/RequestList/RequestList";
import { users } from "../../components/ComponentTemplate/constants";

const classes = {
  adminContainer: {
    padding: "50px",
    display: "flex",
    flexDirection: "row",
  },
  adminSidebar: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
  },
  requestsList: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
  },
};

export const AdminView = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
            <RequestList requests={users} isFiltered />
          </TabPanel>
          <TabPanel value="2">
            <RequestList requests={users} />
          </TabPanel>
        </TabContext>
      </Stack>
      <Stack sx={classes.adminSidebar} direction="column">
        פה יפתח פרופיל ליוזר
      </Stack>
    </Stack>
  );
};
