import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

const PageHeader = (props) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Hotels
        </Typography>
        <Typography variant="subtitle2">
          Click into a hotel to get its rooms
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => props._openDialog()}
        >
          Create new hotel
        </Button>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
