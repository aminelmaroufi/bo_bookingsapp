import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import Footer from "src/components/Footer";
import RoomsTable from "./RoomsTable";
import { RootState } from "src/redux/reducers";
import { getRooms } from "src/redux/actions";

const Rooms = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>Applications - Hotels</title>
      </Helmet>
      <PageTitleWrapper maxWidth="lg">
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RoomsTable rooms={rooms} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Rooms;
