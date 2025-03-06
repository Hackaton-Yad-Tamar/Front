import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const DataTable = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/data") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Extract column names dynamically from first row
          const dynamicColumns = Object.keys(data[0]).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
            width: 150,
          }));
          setColumns(dynamicColumns);
        }
        setRows(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} getRowId={(row: any) => row.id || row.id || Object.values(row).join("")} pageSizeOptions={[5, 10, 20]} />
    </div>
  );
};

export default DataTable;