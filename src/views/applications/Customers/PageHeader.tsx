import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

const PageHeader = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Customers
        </Typography>
        <Typography variant="subtitle2">
          Use the filters below to filter hotels
        </Typography>
        <Typography variant="subtitle2">
          Click into the customer fullname to get his bookings
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
