import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  
  interface DataTableProps {
    data: { id: number; name: string; price: number; city: string; category: string; value: number }[];
  }
  
  export const DataTable = ({ data }: DataTableProps) => {
    const columns: ColumnDef<{ id: number; name: string; price: number; city: string; category: string; value: number }>[] = [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "value", header: "Value" },
    ];
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <div className="bg-white shadow-lg rounded-xl p-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">Products</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} className="border p-2">
                    {flexRender(column.column.columnDef.header, column.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  