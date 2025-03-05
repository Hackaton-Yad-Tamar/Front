import { useEffect, useState } from "react";
import { PieChartComponent } from "../../components/Dashboard/PieChart";
import { BasicDatePicker } from "../../components/Dashboard/DateContainer";


import { fetchPieData, PieData, PieParameters } from "../../data/Dashboard/DataFatch"; // Assuming data is in TestData

export const Dashboard = () => {
  const [filters, setFilters] = useState<PieData>({
    start_date: new Date(2021, 0, 1),
    end_date: new Date(),
  });

  const [statusData, setStatusData] = useState<{ category: string; value: number }[]>([]);
  const [cityData, setCityData] = useState<{ category: string; value: number }[]>([]);
  const [typeData, setTypeData] = useState<{ category: string; value: number }[]>([]);

  // update data using the filters
  useEffect(() => {
    const fetchData = async () => {
      const statusData = await fetchPieData("status-count", filters);
      setStatusData(statusData);
      const cityData = await fetchPieData("city-count", filters);
      setCityData(cityData);
      const typeData = await fetchPieData("type-count", filters);
      setTypeData(typeData);
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">📊 Interactive Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-200 p-4">
          <BasicDatePicker
              name="start_date"
              onDateChange={(start_date) => handleFilter("start_date", start_date)}
            />
        </div>
        <div className="bg-gray-200 p-4">
          <BasicDatePicker
              name="end_date"
              onDateChange={(end_date) => handleFilter("end_date", end_date)}
            />
        </div>
        <div className="bg-gray-200 p-4">
          <PieChartComponent
            data={statusData}
            onPieClick={(status) => handleFilter("status", status)}
          />
        </div>
        <div className="bg-gray-200 p-4">
          <PieChartComponent
            data={cityData}
            onPieClick={(city) => handleFilter("city", city)}
          />
        </div>
        <div className="bg-gray-200 p-4">
          <PieChartComponent
            data={typeData}
            onPieClick={(request_type) => handleFilter("request_type", request_type)}
          />
        </div>
      </div>
      {/* <DataTable data={filteredTableData} /> */}
    </div>
  );
};