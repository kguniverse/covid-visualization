"use client"
import { Stack, Button, Box, Divider, InputLabel, MenuItem, SelectChangeEvent, Slider } from "@mui/material";
import { FormControl, FormGroup, Select, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';

//us_states
const state_county_index: { [key: string]: string[] } = {
    "Washington": ["King", "Pierce", "Snohomish"],
    "California": ["Los Angeles", "San Francisco", "Santa Clara"],
    "New York": ["New York", "Kings", "Queens"],
    "Texas": ["Harris", "Dallas", "Tarrant"],
    "Florida": ["Miami-Dade", "Broward", "Palm Beach"],
    "Illinois": ["Cook", "DuPage", "Lake"],
    "Pennsylvania": ["Philadelphia", "Allegheny", "Montgomery"],
    "Ohio": ["Cuyahoga", "Franklin", "Hamilton"],
    "Georgia": ["Fulton", "Gwinnett", "Cobb"],
    "North Carolina": ["Mecklenburg", "Wake", "Guilford"],
    "Michigan": ["Wayne", "Oakland", "Macomb"],
    "New Jersey": ["Bergen", "Middlesex", "Essex"],
    "Virginia": ["Fairfax", "Prince William", "Loudoun"],
    "Arizona": ["Maricopa", "Pima", "Pinal"],
    "Massachusetts": ["Middlesex", "Worcester", "Suffolk"],
    "Tennessee": ["Shelby", "Davidson", "Knox"],
    "Indiana": ["Marion", "Lake", "Allen"],
    "Missouri": ["St. Louis", "Jackson", "St. Charles"],
    "Maryland": ["Montgomery", "Prince George's", "Baltimore"],
    "Wisconsin": ["Milwaukee", "Waukesha", "Dane"],
    "Minnesota": ["Hennepin", "Ramsey", "Dakota"],
    "Colorado": ["Denver", "El Paso", "Arapahoe"],
    "Alabama": ["Jefferson", "Mobile", "Madison"],
    "South Carolina": ["Greenville", "Richland", "Charleston"],
    "Louisiana": ["Orleans", "Jefferson", "East Baton Rouge"],
    "Kentucky": ["Jefferson", "Fayette", "Kenton"],
    "Oregon": ["Multnomah", "Washington", "Clackamas"],
    "Oklahoma": ["Oklahoma", "Tulsa", "Cleveland"],
    "Connecticut": ["Fairfield", "Hartford", "New Haven"],
    "Iowa": ["Polk", "Linn", "Scott"],
    "Mississippi": ["Hinds", "Harrison", "DeSoto"],
    "Arkansas": ["Pulaski", "Benton", "Washington"],
    "Kansas": ["Johnson", "Sedgwick", "Shawnee"],
    "Utah": ["Salt Lake", "Utah", "Davis"],
    "Nevada": ["Clark", "Washoe", "Carson City"],
    "New Mexico": ["Bernalillo", "Dona Ana", "Santa Fe"],
    "Nebraska": ["Douglas", "Lancaster", "Sarpy"],
    "West Virginia": ["Kanawha", "Berkeley", "Monongalia"],
    "Idaho": ["Ada", "Canyon", "Kootenai"],
    "Hawaii": ["Honolulu", "Hawaii", "Maui"],
    "Maine": ["Cumberland", "York", "Penobscot"],
    "New Hampshire": ["Hillsborough", "Rockingham", "Merrimack"],
    "Rhode Island": ["Providence", "Kent", "Washington"],
    "Montana": ["Yellowstone", "Missoula", "Gallatin"],
    "Delaware": ["New Castle", "Sussex", "Kent"],
    "South Dakota": ["Minnehaha", "Pennington", "Lincoln"],
    "North Dakota": ["Cass", "Burleigh", "Grand Forks"],
    "Alaska": ["Anchorage", "Matanuska-Susitna", "Fairbanks North Star"],
    "District of Columbia": ["District of Columbia"],
    "Vermont": ["Chittenden", "Rutland", "Washington"],
    "Wyoming": ["Laramie", "Natrona", "Campbell"],
    "Puerto Rico": ["San Juan", "Bayamón", "Carolina"],
    "Guam": ["Guam"],
    "Virgin Islands": ["St. Croix", "St. Thomas", "St. John"],
    "Northern Mariana Islands": ["Saipan", "Tinian", "Rota"],
};

const CountyQueriesPanel = () => {
    const [state, setState] = useState("All");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box minWidth={240} mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="state-select-state-label">State</InputLabel>
                        <Select
                            labelId="state-select-state"
                            label="Select State"
                            value={state}
                            onChange={(event) => setState(event.target.value as string)}
                        >
                            <MenuItem value="All">All</MenuItem>
                            {Object.keys(state_county_index).map((state, index) => {
                                return <MenuItem key={index} value={state}>{state}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box minWidth={240} mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="county-select-county-label">County</InputLabel>
                        <Select
                            labelId="county-select-county"
                            label="Select County"
                            defaultValue={"All"}
                        >
                            <MenuItem value="All">All</MenuItem>
                            {state === "All" ? null :
                                state_county_index[state].map((county, index) => {
                                    return <MenuItem key={index} value={county}>{county}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
        </Grid>
    );
}

const StateQueriesPanel = () => {
    const [state, setState] = useState("All");
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box minWidth={240} mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="state-select-state-label">State</InputLabel>
                        <Select
                            labelId="state-select-state"
                            label="Select State"
                            value={state}
                            onChange={(event: SelectChangeEvent) => setState(event.target.value as string)}
                        >
                            <MenuItem value="All">All</MenuItem>
                            {Object.keys(state_county_index).map((state, index) => {
                                return <MenuItem key={index} value={state}>{state}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
        </Grid>
    );
}

const TimeQueriesPanel = () => {
    const dateBegin: dayjs.Dayjs = dayjs("2020-01-01");
    const dateEnd: dayjs.Dayjs = dayjs("2023-12-31");
    const totalDays: number = dateEnd.diff(dateBegin, 'day');
    const [valueRange, setValueRange] = useState<number[]>([0, totalDays]);

    function valueToDate(value: number): dayjs.Dayjs {
        return dateBegin.add(value, 'day');
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <h2>Time Range</h2>
                <Grid item xs={12}>
                    <DatePicker
                        label={"From"}
                        value={valueToDate(valueRange[0])}
                        onChange={
                            (date: Dayjs | null) => {
                                if (date) {
                                    setValueRange([date.diff(dateBegin, 'day'), valueRange[1]]);
                                }
                            }
                        } />
                    <DatePicker
                        label={"To"}
                        value={valueToDate(valueRange[1])}
                        onChange={(date: Dayjs | null) => {
                            if (date) {
                                setValueRange([valueRange[0], date.diff(dateBegin, 'day')]);
                            }
                        }}
                    />
                </Grid>
                <Grid>
                    <Slider
                        min={0}
                        max={totalDays}
                        value={valueRange}
                        step={1}
                        onChange={(event, newValue) => { setValueRange(newValue as number[]) }} />
                </Grid>
            </Grid >
        </Grid >
    );
}


export default function Query() {
    const [table, setTable] = useState("none");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h1>Query</h1>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box sx={{ minWidth: 240 }} mb={2}>
                    <FormControl fullWidth>
                        <InputLabel>Choose Table</InputLabel>
                        <Select
                            onChange={(event) => { setTable(event.target.value as string) }}>
                            <MenuItem value="county">County</MenuItem>
                            <MenuItem value="state">State</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <TimeQueriesPanel />
            </Grid>
            <Grid item xs={12}>
                {table === "county" && <CountyQueriesPanel />}
                {table === "state" && <StateQueriesPanel />}
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary">Submit</Button>
            </Grid>
        </Grid>
    );
}