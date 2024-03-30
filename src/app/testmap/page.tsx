'use client';
import { Box } from "@mui/material";
import TimeQueriesPanel from "./components/TimeQueriesPanel";
import USmap from "./components/USmap";
import Container from '@mui/material/Container';
import dayjs from "dayjs";
import { useState } from "react";

export default function TestmapHome() {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs("2020-01-01"));
    const [dataByDate, setDataByDate] = useState<any>(null);

    return (
        <Container maxWidth="lg">
            <TimeQueriesPanel
                dateBegin={dayjs("2020-01-21")}
                dateEnd={dayjs("2023-3-23")}
                setDate={setSelectedDate}
            />
            <Box sx={{ my: 4 }}>
                <USmap date={selectedDate} />
            </Box>
        </Container>
    );
}