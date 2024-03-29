import React, { useState, useEffect } from 'react';
import { FormControl, FormGroup, Select, Grid, Slider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';

const TimeQueriesPanel = ({ dateBegin, dateEnd, setDateRange }:
    {
        dateBegin: dayjs.Dayjs,
        dateEnd: dayjs.Dayjs,
        setDateRange: React.Dispatch<React.SetStateAction<dayjs.Dayjs[]>>
    }) => {
    // const dateBegin: dayjs.Dayjs = dayjs("2020-01-01");
    // const dateEnd: dayjs.Dayjs = dayjs("2023-3-23");
    const totalDays: number = dateEnd.diff(dateBegin, 'day');
    const [valueRange, setValueRange] = useState<number[]>([0, totalDays]);

    function valueToDate(value: number): dayjs.Dayjs {
        return dateBegin.add(value, 'day');
    }

    useEffect(() => {
        setDateRange(valueRange.map((value) => dateBegin.add(value, 'day')));
    }, [valueRange]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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

export default TimeQueriesPanel;