import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

const PageHeader = (props) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {props.customer.fullname} Bookings
        </Typography>
        <Typography variant="subtitle2">
          Use the filters below to filter booking by customer, hotel or rooms
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
