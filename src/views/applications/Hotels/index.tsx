import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Container, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import Footer from "src/components/Footer";
import HotelsTable from "./HotelsTable";
import FormDialog from "./FormDialog";
import UpdateHotelDialog from "./UpdateHotelDialog";
import ConfirmationDeleteDialog from "./ConfirmationDeleteDialog";
import { RootState } from "src/redux/reducers";
import {
  getHotels,
  createHotelRequest,
  updateHotelRequest,
  deleteHotelRequest,
  exportHotels,
} from "src/redux/actions";
import { emptyHotel } from "src/redux/reducers/hotel";
import { IHotel } from "src/models";

const Hotels = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hotels, total, pages, page, limit } = useSelector(
    (state: RootState) => state.hotel
  );
  const { success } = useSelector((state: RootState) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(emptyHotel);

  const _openDialog = () => {
    setOpenDialog(true);
  };
  const _handleCloseDialog = () => setOpenDialog(false);

  const _handleCloseUpdateDialog = () => setOpenUpdateDialog(false);

  const _openConfirmationDialog = (hotel: IHotel) => {
    setSelectedHotel(hotel);
    setOpenConfirmationDialog(true);
  };
  const _handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

  const deleteHotel = () => {
    dispatch(deleteHotelRequest(selectedHotel._id));
  };

  const selectHotel = (hotel: IHotel) => {
    setSelectedHotel(hotel);
    setOpenUpdateDialog(true);
  };

  const handlePagechange = (params) => {
    setSearchParams({ q: params.q, page: params.page });
    dispatch(getHotels(params));
  };

  useEffect(() => {
    setSearchParams({ q: "", page: "1" });
    dispatch(getHotels({ q: "", page: 1 }));
  }, []);

  return (
    <>
      <Helmet>
        <title>Applications - Hotels</title>
      </Helmet>
      <PageTitleWrapper maxWidth="xl">
        <PageHeader _openDialog={_openDialog} />
      </PageTitleWrapper>
      {hotels.length === 0 && (
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

      {hotels.length > 0 && (
        <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <HotelsTable
                hotels={hotels}
                openConfirmationDialog={_openConfirmationDialog}
                _selectHotel={selectHotel}
                getHotels={(params) => dispatch(getHotels(params))}
                total={total}
                pages={pages}
                activePage={
                  parseInt(searchParams.get("page"))
                    ? parseInt(searchParams.get("page"))
                    : page
                }
                term={searchParams.get("q") || ""}
                offset={limit}
                handlePagechange={(params) => handlePagechange(params)}
                exportHotels={(params) => dispatch(exportHotels(params))}
              />
            </Grid>
          </Grid>
        </Container>
      )}
      <Footer />
      <FormDialog
        open={openDialog}
        handleCloseDialog={_handleCloseDialog}
        success={success}
        submit={(hotel) => dispatch(createHotelRequest(hotel))}
      />
      <UpdateHotelDialog
        open={openUpdateDialog}
        handleCloseDialog={_handleCloseUpdateDialog}
        success={success}
        hotel={selectedHotel}
        submit={(hotel) => dispatch(updateHotelRequest(hotel))}
      />
      <ConfirmationDeleteDialog
        hotel={selectedHotel}
        open={openConfirmationDialog}
        handleCloseDialog={_handleCloseConfirmationDialog}
        deleteHotel={deleteHotel}
        success={success}
      />
    </>
  );
};

export default Hotels;
