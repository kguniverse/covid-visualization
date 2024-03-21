'use client';
import { Slider } from "@mui/material";

function sliderChange(event: Event, value: number | number[]) {
    console.log(value);
}

export default function DashBoard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Slider defaultValue={30} onChange={sliderChange} />
        </div>
    );
}