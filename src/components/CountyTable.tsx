import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const countyColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'county', headerName: 'County', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'fips', headerName: 'FIPS', width: 150 },
    { field: 'cases', headerName: 'Cases', width: 150 },
    { field: 'deaths', headerName: 'Deaths', width: 150 },
];

export default function CountyTable() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch("http://172.17.0.3/api/county/")
            .then(response => response.json())
            .then(data => {
                setTableData(data);
            });
    }, []);
    return (
        <div>
            <DataGrid
                rows={tableData}
                columns={countyColumns}
                autoPageSize />
        </div>
    )
}