import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import Footer from "src/components/Footer";
import BookingsTable from "./BookingsTable";
import { RootState } from "src/redux/reducers";
import { getBookings, exportBookings } from "src/redux/actions";

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, total, pages, page, limit } = useSelector(
    (state: RootState) => state.booking
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ q: "", page: "1" });
    // dispatch(getBookings({ q: "", page: "1" }));
  }, [dispatch]);

  const handlePagechange = (params) => {
    setSearchParams({ q: params.q, page: params.page });
    dispatch(getBookings(params));
  };

  return (
    <>
      <Helmet>
        <title>Applications - Hotels</title>
      </Helmet>
      <PageTitleWrapper maxWidth="xl">
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <BookingsTable
              bookings={bookings}
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
              exportBookings={(params) => dispatch(exportBookings(params))}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Bookings;
