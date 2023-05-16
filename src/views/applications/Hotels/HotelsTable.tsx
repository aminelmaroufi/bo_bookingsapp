import { FC, ChangeEvent, useState, useEffect } from "react";
import Moment from "moment";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Grid,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  Pagination,
  Stack,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Rating,
  TextField,
  Button,
} from "@mui/material";
import { DownloadTwoTone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { CryptoOrder, CryptoOrderStatus } from "src/models/crypto_order";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useDispatch } from "react-redux";
import { IHotel } from "src/models";
import { selectHotel } from "src/redux/actions";
import { SearchTwoTone } from "@mui/icons-material";

interface HotelsTableProps {
  className?: string;
  openConfirmationDialog: (hotel: IHotel) => void;
  getHotels: (params: object) => void;
  hotels: Array<IHotel>;
  _selectHotel: (hotel: IHotel) => void;
  handlePagechange: (params: object) => void;
  exportHotels: (params: object) => void;
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

const HotelsTable: FC<HotelsTableProps> = ({
  hotels,
  openConfirmationDialog,
  _selectHotel,
  getHotels,
  handlePagechange,
  exportHotels,
  total,
  pages,
  activePage,
  term,
  offset,
}) => {
  const dispatch = useDispatch();
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
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [q]);

  useEffect(() => {
    setFirstRender(false);
  }, [hotels]);

  const handlePageChange = (event: any, newPage: number): void => {
    const params = {
      q: q,
      page: newPage,
    };
    handlePagechange(params);
  };

  const select_hotel = (hotel: IHotel) => {
    dispatch(selectHotel(hotel));
    // navigate(`${hotel._id}/rooms`);
  };

  return (
    <Card>
      <Box style={{ flex: 1, flexDirection: "row" }}>
        <TextField
          value={q}
          fullWidth
          variant="outlined"
          placeholder="Search by hotel name, short address, address ..."
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" aria-label="search">
                <SearchTwoTone style={{ fill: "blue" }} />
              </IconButton>
            ),
          }}
          cy-data="hotels-search-box"
        />
      </Box>
      {hotels.length ? (
        <Grid>
          <TableContainer data-testid="hotels-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Hotel Details</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell align="right">Number of rooms</TableCell>
                  <TableCell>Create at</TableCell>
                  <TableCell>Last update</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hotels.map((hotel) => {
                  return (
                    <TableRow
                      hover
                      key={hotel._id}
                      onClick={() => select_hotel(hotel)}
                    >
                      <TableCell>
                        <Link to={`${hotel._id}/rooms`}>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {hotel.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {hotel.address}
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
                          {hotel.city}
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
                          {hotel.country}
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
                          {hotel.location}
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
                          {hotel.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Rating
                          name="read-only"
                          value={hotel.rating}
                          readOnly
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {hotel.rooms.length}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {Moment(hotel.created_at).format("ll")}
                      </TableCell>
                      <TableCell>
                        {Moment(hotel.updated_at).format("ll")}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Edit Hotel" arrow>
                          <IconButton
                            sx={{
                              "&:hover": {
                                background: theme.colors.primary.lighter,
                              },
                              color: theme.palette.primary.main,
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => _selectHotel(hotel)}
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Hotel" arrow>
                          <IconButton
                            sx={{
                              "&:hover": {
                                background: theme.colors.error.lighter,
                              },
                              color: theme.palette.error.main,
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => openConfirmationDialog(hotel)}
                          >
                            <DeleteTwoToneIcon fontSize="small" />
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
                cy-data="export-hotels-btn"
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={<DownloadTwoTone fontSize="small" />}
                onClick={() => exportHotels({ q, activePage })}
              >
                Export hotels
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
          <Typography variant="subtitle2">No hotels found</Typography>
        </Grid>
      )}
    </Card>
  );
};

export default HotelsTable;
