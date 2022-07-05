import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Grid, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import Footer from "src/components/Footer";
import RoomsTable from "./RoomsTable";
import FormDialog from "./FormDialog";
import UpdateRoomDialog from "./UpdateRoomDialog";
import ConfirmationDeleteDialog from "./ConfirmationDeleteDialog";
import { RootState } from "src/redux/reducers";
import {
  getHotelRequest,
  createRoomRequest,
  updateRoomRequest,
  deleteRoomRequest,
  exportHotelRoomsRquest,
} from "src/redux/actions";
import { emptyRoom } from "src/redux/reducers/room";
import { IRoom } from "src/models";

const HotelRooms = () => {
  const dispatch = useDispatch();
  const { hotelId } = useParams();
  const { hotel } = useSelector((state: RootState) => state.hotel);
  const { success } = useSelector((state: RootState) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [room, setRoom] = useState(emptyRoom);

  useEffect(() => {
    if (!hotel._id) dispatch(getHotelRequest(hotelId));
  }, [dispatch]);

  const _openDialog = () => {
    setOpenDialog(true);
  };
  const _handleCloseDialog = () => setOpenDialog(false);

  const selectRoom = (room: IRoom) => {
    setRoom(room);
    setOpenUpdateDialog(true);
  };
  const _handleCloseUpdateDialog = () => setOpenUpdateDialog(false);

  const _openConfirmationDialog = (room: IRoom) => {
    setRoom(room);
    setOpenConfirmationDialog(true);
  };
  const _handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

  return (
    <>
      <Helmet>
        <title>Applications - Hotels</title>
      </Helmet>
      <PageTitleWrapper maxWidth="lg">
        <PageHeader hotel={hotel} _openDialog={_openDialog} />
      </PageTitleWrapper>
      {hotel.rooms.length === 0 && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 30, padding: 10 }}
        >
          <Typography variant="subtitle2">
            No rooms found for {hotel.name}
          </Typography>
        </Grid>
      )}
      <Container maxWidth="lg">
        {hotel.rooms.length > 0 && (
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <RoomsTable
                rooms={hotel.rooms}
                _selectRoom={(room: IRoom) => selectRoom(room)}
                _openConfirmationDialog={_openConfirmationDialog}
                _export={() => dispatch(exportHotelRoomsRquest(hotel))}
              />
            </Grid>
          </Grid>
        )}
      </Container>
      <Footer />
      <FormDialog
        open={openDialog}
        handleCloseDialog={_handleCloseDialog}
        success={success}
        submit={(room) => dispatch(createRoomRequest(hotel._id, room))}
      />
      <UpdateRoomDialog
        room={room}
        open={openUpdateDialog}
        handleCloseDialog={_handleCloseUpdateDialog}
        success={success}
        submit={(updatedRoom) =>
          dispatch(updateRoomRequest(hotel._id, updatedRoom))
        }
      />
      <ConfirmationDeleteDialog
        room={room}
        open={openConfirmationDialog}
        handleCloseDialog={_handleCloseConfirmationDialog}
        deleteRoom={() => dispatch(deleteRoomRequest(hotel._id, room._id))}
        success={success}
      />
    </>
  );
};

export default HotelRooms;
