import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Container, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import Footer from "src/components/Footer";
import BookingsTable from "./BookingsTable";
import { RootState } from "src/redux/reducers";
import {
  getCustomerBookingsRequest,
  exportCustomerBookingsRequest,
} from "src/redux/actions";

const CustomerBookings = () => {
  const dispatch = useDispatch();
  const { customerId } = useParams();
  const { customer, total, pages, page, limit } = useSelector(
    (state: RootState) => state.customer
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ q: "", page: "1" });
    dispatch(getCustomerBookingsRequest(customerId, { q: "", page: "1" }));
  }, [dispatch]);

  const handlePagechange = (params) => {
    setSearchParams({ q: params.q, page: params.page });
    dispatch(getCustomerBookingsRequest(customerId, params));
  };

  return (
    <>
      <Helmet>
        <title>Applications - Customer Bookings</title>
      </Helmet>
      <PageTitleWrapper maxWidth="xl">
        <PageHeader customer={customer} />
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
              bookings={customer.bookings}
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
              exportBookings={(params) =>
                dispatch(exportCustomerBookingsRequest(customer, params))
              }
              customer={customer}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CustomerBookings;
