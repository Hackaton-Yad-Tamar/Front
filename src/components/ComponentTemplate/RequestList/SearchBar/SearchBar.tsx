import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { User } from "../../../../types/userType";
import { CITIES, USER_TYPES } from "./constants";

export interface SearchBarProps {
  setFilteredRequests: Dispatch<SetStateAction<User[]>>;
  requests: User[];
  isFiltered: boolean;
}

export const SearchBar: FC<SearchBarProps> = ({
  setFilteredRequests,
  requests,
  isFiltered,
}) => {
  const [city, setCity] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

  const handleUserTypeChange = (event: SelectChangeEvent) => {
    setUserType(event.target.value);
  };

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const filteredRequests = requests
      .filter(({ status }) =>
        isFiltered ? status === "PENDING" : status !== "PENDING"
      )
      .filter(
        ({
          city: requestCity,
          firstName,
          lastName,
          userType: requestUserType,
        }) => {
          const matchesCity = city ? requestCity === city : true;
          const matchesUserType = userType
            ? requestUserType === userType
            : true;
          const matchesSearchText =
            firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            lastName.toLowerCase().includes(searchText.toLowerCase());

          return matchesCity && matchesUserType && matchesSearchText;
        }
      );

    setFilteredRequests(filteredRequests);
  }, [requests, isFiltered, city, userType, searchText]);

  return (
    <Stack
      direction="row"
      alignItems="flex-end"
      justifyContent="space-around"
      marginBottom="10px"
    >
      <Stack direction="row">
        <TextField
          variant="standard"
          sx={{ mb: "10px" }}
          onChange={handleSearchTextChange}
          placeholder="חיפוש..."
        />
        <SearchIcon />
      </Stack>
      <FormControl sx={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">סינון לפי</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="עיר מגורים"
          onChange={handleCityChange}
        >
          <MenuItem value="">{""}</MenuItem>
          {CITIES.map((city) => (
            <MenuItem value={city} key={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">מבקש להיות</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userType}
          label="מבקש להיות"
          onChange={handleUserTypeChange}
        >
          <MenuItem value="">{""}</MenuItem>
          {USER_TYPES.map((type) => (
            <MenuItem value={type} key={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};
