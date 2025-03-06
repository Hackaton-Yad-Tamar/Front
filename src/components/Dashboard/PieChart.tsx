import {PieChart} from '@mui/x-charts/PieChart';
import {Box, Typography, Paper, Stack} from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface PieChartComponentProps {
    name: string;
    data: { category: string; value: number }[];
    onPieClick: (category: string) => void;
}

export const PieChartComponent = ({name, data, onPieClick}: PieChartComponentProps) => {
    return (
        <Paper elevation={3} sx={{p: 2, borderRadius: 2}}>
            <Stack spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                    {name}
                </Typography>
                <Box>
                    <PieChart
                        series={[{
                            data: data.map((entry, index) => ({
                                id: index.toString(),  // Make sure id is a string
                                value: entry.value,
                                color: COLORS[index % COLORS.length],
                                label: entry.category,
                            })),
                            innerRadius: 30,
                            outerRadius: 140,
                            paddingAngle: 3,
                        }]}
                        height={300}
                        width={500}
                        onItemClick={(_, d) => onPieClick(data[d.dataIndex].category)}
                        slotProps={{
                            legend: {hidden: true, padding: 0}
                        }}
                        margin={{top: 0, right: 0, bottom: 0, left: 0}}

                    />
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center" mt={2} height={80}>
                    {data.map((entry, index) => (
                        <Box key={entry.category} display="flex" alignItems="center" mx={1}>
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    bgcolor: COLORS[index % COLORS.length],
                                    borderRadius: 1,
                                    mr: 1
                                }}
                            />

                            <Typography variant="body2" pr={1}>{entry.category}</Typography>
                        </Box>
                    ))}
                </Box>
            </Stack>
        </Paper>
    );
};
