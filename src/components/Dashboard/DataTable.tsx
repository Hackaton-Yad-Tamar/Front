import { ColumnDef } from '@tanstack/react-table';

interface TableProps<T extends object> {
  data: T[];
  columns?: Array<ColumnDef<T> & { header: string }>;
}

export const DataTable = <T extends object,>({ data, columns }: TableProps<T>) => {
  // Generate columns from data keys if columns are not provided
  const generatedColumns =
    columns ||
    (data.length > 0
      ? (Object.keys(data[0] as object) as Array<keyof T>).map((key) => ({
          header: key.toString(),
          accessorKey: key as string,
        }))
      : []);

  return (
    <table>
      <thead>
        <tr>
          {generatedColumns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {generatedColumns.map((column, colIndex) => (
              <td key={colIndex}>
                {'accessorKey' in column ? String((row as any)[column.accessorKey]) : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};