import * as React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Moment from "moment";
import numeral from "numeral";
import Title from "../Title";

const Orders = (props) => {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Hotel</TableCell>
            <TableCell>Room</TableCell>
            <TableCell>Total nights</TableCell>
            <TableCell>Total paid</TableCell>
            <TableCell>Check in date</TableCell>
            <TableCell>Check out date</TableCell>
            <TableCell>Create at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody cy-data="last-orders-table">
          {props.orders.map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                {row.user.firstname + " " + row.user.lastname}
              </TableCell>
              <TableCell>{row.hotel.name}</TableCell>
              <TableCell>{row.room.title}</TableCell>
              <TableCell>{row.night_numbers}</TableCell>
              <TableCell align="right">
                {numeral(row.price).format(`$0,0.00`)}
              </TableCell>
              <TableCell>
                {Moment(row.check_in_date).format("dd MMM YYYY")}
              </TableCell>
              <TableCell>
                {Moment(row.check_out_date).format("dd MMM YYYY")}
              </TableCell>
              <TableCell>
                {Moment(row.created_at).format("dd MMM YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" to="/bookings" cy-data="orders-details-link">
        See more orders
      </Link>
    </React.Fragment>
  );
};

export default Orders;
