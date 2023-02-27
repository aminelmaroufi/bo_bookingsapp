import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet-async";
import { mainListItems, secondaryListItems } from "./ListItems";
import Chart from "./data/Chart";
import Deposits from "./data/Deposits";
import Orders from "./data/Orders";
import Footer from "src/components/Footer";
import StatisticCard from "src/components/dashboard/StatisticCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";
import { getStatistics } from "src/redux/actions";
import TextIncrease from "@mui/icons-material/TextIncrease";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { bookings, hotels, rooms, customers, orders, totalAmount, chartData } =
    useSelector((state: RootState) => state.dash);

  React.useEffect(() => {
    dispatch(getStatistics());
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={6} xl={3}>
            <StatisticCard
              title={{ text: "Total hotels" }}
              count={hotels.total}
              increase={hotels.percentOfIncrease >= 0 ? true : 0}
              percentage={{
                color: hotels.percentOfIncrease >= 0 ? "success" : "error",
                text: `${hotels.percentOfIncrease >= 0 ? "+" : ""}${
                  hotels.percentOfIncrease
                }%`,
              }}
              icon={{ color: "info", component: "hotel" }}
              type="hotels-card"
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <StatisticCard
              title={{ text: "Total rooms" }}
              count={rooms.total}
              increase={rooms.percentOfIncrease >= 0 ? true : false}
              percentage={{
                color: rooms.percentOfIncrease >= 0 ? "success" : "error",
                text: `${rooms.percentOfIncrease >= 0 ? "+" : ""}${
                  rooms.percentOfIncrease
                }%`,
              }}
              icon={{ color: "info", component: "bed" }}
              type="rooms-card"
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <StatisticCard
              title={{ text: "Totals customers" }}
              count={customers.total}
              increase={customers.percentOfIncrease >= 0 ? true : false}
              percentage={{
                color: customers.percentOfIncrease >= 0 ? "success" : "error",
                text: `${customers.percentOfIncrease >= 0 ? "+" : ""}${
                  customers.percentOfIncrease
                }%`,
              }}
              icon={{ color: "info", component: "group" }}
              type="customers-card"
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <StatisticCard
              title={{ text: "Total bookings" }}
              count={orders.total}
              increase={orders.percentOfIncrease >= 0 ? true : false}
              percentage={{
                color: orders.percentOfIncrease >= 0 ? "success" : "error",
                text: `${orders.percentOfIncrease >= 0 ? "+" : ""}${
                  orders.percentOfIncrease
                }%`,
              }}
              icon={{ color: "info", component: "list_alt" }}
              type="orders-card"
            />
          </Grid>
        </Grid>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Chart chartData={chartData} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Deposits totalAmount={totalAmount} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Orders orders={bookings} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Dashboard;
