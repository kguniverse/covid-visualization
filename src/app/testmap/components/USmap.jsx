'use client';
import * as d3 from "d3";
import React, { useEffect, useState, useRef } from "react";
import * as topojson from 'topojson-client';


export default function USmap({ date }) {
    const [us, setUs] = useState({});
    const [cases, setCases] = useState({});
    const [maxCases, setMaxCases] = useState(0);
    const ref = useRef();

    useEffect(() => {
        fetch("https://d3js.org/us-10m.v1.json")
            .then((response) => response.json())
            .then((us) => {
                setUs(us);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:8000/api/statesNested")
            .then((response) => response.json())
            .then((data) => {
                setCases(data);
                let max = 0;
                for (const date in data) {
                    for (const state in data[date]) {
                        max = Math.max(max, data[date][state].cases);
                    }
                }
                setMaxCases(max);
            });
    }, []);


    useEffect(() => {
        console.log(maxCases);
        if (us.objects && us.objects.states) {
            const svg = d3.select(ref.current);
            const path = d3.geoPath();

            const colorScale = d3.scaleQuantize()
                .domain([0, maxCases])
                .range(d3.schemeBlues[9]);
            svg.append('g')
                .selectAll('path')
                .data(topojson.feature(us, us.objects.states).features)
                .join('path')
                .attr('d', path)
                .attr('fill', (d) => {
                    const id = Number(d.id);
                    const date_states = cases[date.format('YYYY-MM-DD')];
                    if (!date_states) {
                        return colorScale(0);
                    }
                    const state = date_states[id.toString()];
                    if (state) {
                        return colorScale(state.cases);
                    } else {
                        return colorScale(0);
                    }
                })
                .attr('stroke', 'black')
                .attr('stroke-linejoin', 'round')

            svg.append('path')
                .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-linejoin', 'round')
                .attr('d', path);
        }
    }, [us, cases, date, maxCases]);

    return (
        <svg ref={ref} style={{ width: '100%', height: '600px' }} />
    );
}