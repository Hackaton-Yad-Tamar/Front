import {DataGrid, GridColDef} from '@mui/x-data-grid';

interface TableProps<T extends object> {
    data: T[];
    columns?: Array<GridColDef>;
}

export const DataTable = <T extends object, >({data, columns}: TableProps<T>) => {
    // Generate columns from data keys if columns are not provided
    const generatedColumns: GridColDef[] =
        columns ||
        (data.length > 0
            ? (Object.keys(data[0] as object) as Array<keyof T>).map((key) => ({
                field: key as string,
                headerName: key.toString(),
                flex: 1,
            }))
            : []);

    return (

        <DataGrid
            rows={data.map((row, index) => ({id: index, ...row}))}
            columns={generatedColumns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{pagination: {paginationModel: {pageSize: 10}}}}
        />

    );
};
