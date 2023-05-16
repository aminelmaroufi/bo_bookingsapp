import { FC, useState, useEffect } from "react";
import Moment from "moment";
import {
  Tooltip,
  Grid,
  Pagination,
  Button,
  TextField,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CryptoOrder, CryptoOrderStatus } from "src/models/crypto_order";
import { RemoveRedEyeRounded } from "@mui/icons-material";
import { DownloadTwoTone } from "@mui/icons-material";
import { SearchTwoTone } from "@mui/icons-material";
import { IBooking } from "src/models";
import numeral from "numeral";

interface BookingsTableProps {
  className?: string;
  bookings: Array<IBooking>;
  handlePagechange: (params: object) => void;
  exportBookings: (params: object) => void;
  total: number;
  pages: number;
  activePage: number;
  term: string;
  offset: number;
}

const applyPagination = (
  cryptoOrders: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const HotelsTable: FC<BookingsTableProps> = ({
  bookings,
  handlePagechange,
  exportBookings,
  total,
  pages,
  activePage,
  term,
  offset,
}) => {
  const [q, setTerm] = useState(term);
  const [firstRender, setFirstRender] = useState(true);
  const theme = useTheme();

  const onChange = (value) => {
    setTerm(value);
  };

  useEffect(() => {
    if ((!firstRender && q.length === 0) || q.length > 2) {
      const timeoutId = setTimeout(() => {
        const params = {
          q,
          page: 1,
        };
        handlePagechange(params);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [q]);

  useEffect(() => {
    setFirstRender(false);
  }, [bookings]);

  const handlePageChange = (event: any, newPage: number): void => {
    const params = {
      q: q,
      page: newPage,
    };
    handlePagechange(params);
  };

  return (
    <Card>
      <Box style={{ flex: 1, flexDirection: "row" }}>
        <TextField
          value={q}
          fullWidth
          variant="outlined"
          placeholder="Search by customer firstname, customer lastname, customer email, hotel name, hotel address, hotel short address, room title, room advantage..."
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" aria-label="search">
                <SearchTwoTone style={{ fill: "blue" }} />
              </IconButton>
            ),
          }}
        />
      </Box>
      {bookings.length ? (
        <Grid>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Details</TableCell>
                  <TableCell>Hotel</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Number of nights</TableCell>
                  <TableCell>Amout</TableCell>
                  <TableCell>Check in date</TableCell>
                  <TableCell>Check out date</TableCell>
                  <TableCell>Create at</TableCell>
                  <TableCell>Last update</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => {
                  return (
                    <TableRow hover key={booking._id}>
                      <TableCell>
                        <Link to={`/customers/${booking.user._id}/bookings`}>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {booking.user.firstname} {booking.user.lastname}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/hotels/${booking.hotel._id}/rooms`}>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {booking.hotel.name}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {booking.room.title}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {booking.night_numbers}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {numeral(booking.price).format(`$0,0.00`)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {Moment(booking.check_in_date).format("ll")}
                      </TableCell>
                      <TableCell>
                        {Moment(booking.check_out_date).format("ll")}
                      </TableCell>
                      <TableCell>
                        {Moment(booking.created_at).format("ll")}
                      </TableCell>
                      <TableCell>
                        {Moment(booking.updated_at).format("ll")}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details" arrow>
                          <IconButton
                            sx={{
                              "&:hover": {
                                background: theme.colors.info.lighter,
                              },
                              color: theme.palette.info.main,
                            }}
                            color="inherit"
                            size="small"
                          >
                            <RemoveRedEyeRounded fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              style={{
                flex: 1,
                padding: 10,
              }}
            >
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={<DownloadTwoTone fontSize="small" />}
                onClick={() => exportBookings({ q })}
              >
                Export bookings
              </Button>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              spacing={3}
              style={{
                flex: 1,
                marginTop: 5,
              }}
            >
              <Pagination
                count={pages}
                page={activePage}
                color="primary"
                showFirstButton
                showLastButton
                onChange={handlePageChange}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 30, padding: 10 }}
        >
          <Typography variant="subtitle2">No bookings found</Typography>
        </Grid>
      )}
    </Card>
  );
};

export default HotelsTable;
