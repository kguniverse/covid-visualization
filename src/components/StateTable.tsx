import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import TimeQueriesPanel from "./TimeQueryPanel";

interface StateTableProps {
    id: number;
    date: dayjs.Dayjs;
    state: string;
    fips: string;
    cases: number;
    deaths: number;
}

const countyColumns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'fips', headerName: 'FIPS', flex: 1 },
    { field: 'cases', headerName: 'Cases', flex: 1 },
    { field: 'deaths', headerName: 'Deaths', flex: 1 },
];

export default function StateTable() {

    const [tableData, setTableData] = useState([]);

    const [dateRange, setdateRange] = useState([dayjs("2020-01-01"), dayjs("2023-03-23")]);

    useEffect(() => {
        // fetch("http://172.17.0.3:8000/api/states/")
        fetch("http://localhost:8000/api/states")
            .then(response => response.json())
            .then(data => {
                // transform the data.date to dayjs object
                data.forEach((element: StateTableProps) => {
                    element.date = dayjs(element.date);
                });
                setTableData(data);
            });
    }, []);
    console.log(tableData);

    return (
        <Box
            sx=
            {{
                height: 1000,
            }}
        >
            <Box>
                <TimeQueriesPanel
                    dateBegin={dayjs("2020-01-01")}
                    dateEnd={dayjs("2023-03-23")}
                    setDateRange={setdateRange}
                />
            </Box>
            <DataGrid
                rows={tableData.filter((element: StateTableProps) => {
                    return element.date.isAfter(dateRange[0]) && element.date.isBefore(dateRange[1]);
                }).map((element: StateTableProps, index: number) => {
                    return {
                        id: index,
                        date: element.date.format("YYYY-MM-DD"),
                        state: element.state,
                        fips: element.fips,
                        cases: element.cases,
                        deaths: element.deaths,
                    };
                })}
                columns={countyColumns}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                autoPageSize />
        </Box >


    )
}