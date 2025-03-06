import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

interface CustomBarChartProps {
    data: { category: string; value: number }[];
}

export const CustomBarChart: React.FC<CustomBarChartProps> = ({data}) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="category"/>
                <YAxis/>
                <Tooltip/>
                {/* <Legend /> */}
                <Bar dataKey="value" fill="#8884d8"/>
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
        </ResponsiveContainer>
    );
};