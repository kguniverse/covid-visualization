'use client'
import { useState } from 'react';
import { Grid, Slider } from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';

const TimeQueriesPanel = () => {
    const dateBegin: dayjs.Dayjs = dayjs("2020-01-01");
    const dateEnd: dayjs.Dayjs = dayjs("2023-3-23");
    const totalDays: number = dateEnd.diff(dateBegin, 'day');
    const [valueDate, setValueDate] = useState<number>(0);

    function valueToDate(value: number): dayjs.Dayjs {
        return dateBegin.add(value, 'day');
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <h2>Time Range</h2>
                <Grid item xs={12}>
                    <DatePicker
                        label={"Date"}
                        value={valueToDate(valueDate)}
                        onChange={
                            (date: Dayjs | null) => {
                                if (date) {
                                    setValueDate(date.diff(dateBegin, 'day'));
                                }
                            }} />
                </Grid>
                <Grid>
                    <Slider
                        min={0}
                        max={totalDays}
                        value={valueDate}
                        step={1}
                        onChange={(event, newValue) => { setValueDate(newValue as number) }} />
                </Grid>
            </Grid >
        </Grid >
    );
}

export default TimeQueriesPanel;