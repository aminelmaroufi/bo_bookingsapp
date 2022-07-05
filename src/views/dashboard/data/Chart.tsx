import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "../Title";
import { getYear } from "date-fns";

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Chart = (props) => {
  const theme = useTheme();

  let dataC = [];

  if (props.chartData.length) {
    dataC = props.chartData.map((item) =>
      createData(months[item._id - 1], item.total)
    );
    dataC.push(createData(months[props.chartData.length], undefined));
  }

  return (
    <React.Fragment>
      <Title>This year ({new Date().getFullYear()})</Title>
      <ResponsiveContainer>
        <LineChart
          data={dataC}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Bookings ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default Chart;
