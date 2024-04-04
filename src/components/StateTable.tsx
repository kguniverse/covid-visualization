import { Box } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import TimeQueriesPanel from "./TimeQueryPanel";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridSlots,
    GridToolbar
} from '@mui/x-data-grid';

interface StateTableProps {
    id: number;
    date: dayjs.Dayjs;
    state: string;
    fips: string;
    cases: number;
    deaths: number;
}

const countyColumns = [
    { field: 'date', headerName: 'Date', flex: 1, editable: true, },
    { field: 'state', headerName: 'State', flex: 1, editable: true, },
    { field: 'fips', headerName: 'FIPS', flex: 1, editable: true, },
    { field: 'cases', headerName: 'Cases', flex: 1, editable: true, },
    { field: 'deaths', headerName: 'Deaths', flex: 1, editable: true, },
];

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {

    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );

}

export default function StateTable() {

    const [tableData, setTableData] = useState<GridRowsProp>([]);

    const [dateRange, setdateRange] = useState([dayjs("2020-01-01"), dayjs("2023-03-23")]);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setTableData(tableData.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow: any = tableData.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setTableData(tableData.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setTableData(tableData.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const countyColumns = [
        { field: 'date', headerName: 'Date', flex: 1, editable: true, },
        { field: 'state', headerName: 'State', flex: 1, editable: true, },
        { field: 'fips', headerName: 'FIPS', flex: 1, editable: true, },
        { field: 'cases', headerName: 'Cases', flex: 1, editable: true, },
        { field: 'deaths', headerName: 'Deaths', flex: 1, editable: true, },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 2,
            cellClassName: 'actions',
            getActions: ({ id }: { id: number }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        }
    ];


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