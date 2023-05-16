import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import Footer from "src/components/Footer";
import CustomersTable from "./CustomersTable";
import { RootState } from "src/redux/reducers";
import { getCustomers, exportCustomer } from "src/redux/actions";

const Customers = () => {
  const dispatch = useDispatch();
  const { customers, total, pages, page, limit } = useSelector(
    (state: RootState) => state.customer
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ q: "", page: "1" });
    dispatch(getCustomers({ q: "", page: "1" }));
  }, [dispatch]);

  const handlePagechange = (params) => {
    setSearchParams({ q: params.q, page: params.page });
    dispatch(getCustomers(params));
  };

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
            <CustomersTable
              customers={customers}
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
              _export={() => dispatch(exportCustomer())}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Customers;
