import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

const PageHeader = (props) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {props.hotel.name}
        </Typography>
        <Typography variant="subtitle2">{props.hotel.address}</Typography>
        <Typography variant="subtitle2">
          there's {props.hotel.rooms.length} room
          {props.hotel.rooms.length > 1 ? "s" : ""} in this hotel
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => props._openDialog()}
        >
          Create new room
        </Button>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
