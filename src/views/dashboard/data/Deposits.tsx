import * as React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Moment from "moment";
import numeral from "numeral";
import Title from "../Title";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

const Deposits = (props) => {
  return (
    <React.Fragment>
      <Title>Monthly total amount</Title>
      <Typography component="p" variant="h4" cy-data="data-amount-currMonth">
        {numeral(props.totalAmount.totalAmountOfMonth).format(`$0,0.00`)}{" "}
        {props.totalAmount.percentOfIncrease >= 0 ? (
          <>
            <TrendingUp
              style={{ position: "relative", top: 7, fontSize: 23 }}
            />{" "}
            +
          </>
        ) : (
          <>
            <TrendingUp
              style={{ position: "relative", top: 7, fontSize: 23 }}
            />{" "}
            -
          </>
        )}
        {props.totalAmount.percentOfIncrease}%
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        for {Moment(new Date()).format("MMM YYYY")}
      </Typography>
      <div>
        <Link color="primary" to="/bookings" cy-data="deposit-view-viewDetails">
          View details
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Deposits;
