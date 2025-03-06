import { useEffect, useState } from "react";

//componants
import { PieChartComponent } from "../../components/Dashboard/PieChart";
import { BasicDatePicker } from "../../components/Dashboard/DateContainer";
import { CustomBarChart } from "../../components/Dashboard/BarChart";
import { DataTable } from "../../components/Dashboard/DataTable";

//data
import { fetchPieData, PieData, PieParameters , fetcheTableData} from "../../data/Dashboard/DataFatch"; // Assuming data is in TestData
import { Typography, Box } from "@mui/material";

export const Dashboard = () => {
  const [filters, setFilters] = useState<PieData>({
    start_date: new Date(2021, 0, 1),
    end_date: new Date(),
  });

  const [statusData, setStatusData] = useState<{ category: string; value: number }[]>([]);
  const [cityData, setCityData] = useState<{ category: string; value: number }[]>([]);
  const [typeData, setTypeData] = useState<{ category: string; value: number }[]>([]);
  const [tableData, setTableData] = useState<{ category: string; value: number}[]>([]);
  // update data using the filters
  useEffect(() => {
    const fetchData = async () => {
      const statusData = await fetchPieData("status-count", filters);
      setStatusData(statusData);
      const cityData = await fetchPieData("city-count", filters);
      setCityData(cityData);
      const typeData = await fetchPieData("type-count", filters);
      setTypeData(typeData);
      const tableData = await fetcheTableData("filtered-table", filters);
      setTableData(tableData);
    };
    fetchData();
  }, [filters]);
  
  const handleFilter = (filterType: keyof PieData, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? undefined : value,
    }));
  };


  console.log("filters:", filters); // Add log to check data
  console.log("Filtered Status Data:", statusData); // Add log to check data
  console.log("Filtered City Data:", cityData); // Add log to check data
  console.log("Filtered Type Data:", typeData); // Add log to check data
  console.log("tableData:", tableData); // Add log to check data

  return (
    <div dir="ltr">
    <Box p={6} bgcolor="grey.100" minHeight="100vh">
      <Typography variant="h4" fontWeight="bold" mb={4} align="center">
        📊 Management Dashboard
      </Typography>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
      <BasicDatePicker
            name="From"
            
            onDateChange={(start_date) => handleFilter("start_date", start_date)}
          />
          <Box width={40} />
          <BasicDatePicker
            name="To"
            onDateChange={(end_date) => handleFilter("end_date", end_date)}
          />
      </Box>
      <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(1fr, 3)" }} gap={6} pt={3}>
        

        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
          <Box width={{ xs: "100%", sm: "45%", md: "30%" }} minWidth={300}>
            <PieChartComponent
            name="Status"
              data={statusData}
              onPieClick={(status) => handleFilter("status", status)}
            />
          </Box>
          <Box width={{ xs: "100%", sm: "45%", md: "30%" }} minWidth={300}>
            <PieChartComponent
            name="City"
              data={cityData}
              onPieClick={(city) => handleFilter("city", city)}
            />
          </Box>
          <Box width={{ xs: "100%", sm: "45%", md: "30%" }} minWidth={300}>
            <PieChartComponent
            name="Type"
              data={typeData}
              onPieClick={(request_type) => handleFilter("request_type", request_type)}
            />
          </Box>
        </Box>
      </Box>
      
      <Box display="flex" justifyContent="space-around" flexWrap="wrap" pt={5} padding={5}>
        <DataTable data={tableData} />
      </Box>
    </Box>
    </div>
  );
};