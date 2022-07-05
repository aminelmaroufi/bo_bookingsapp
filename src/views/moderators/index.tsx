import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import Footer from "src/components/Footer";
import ModeratorsTable from "./ModeratorsTable";
import ConfirmationDeleteDialog from "./ConfirmationDeleteDialog";
import FormDialog from "./FormDialog";
import { RootState } from "src/redux/reducers";
import {
  getModerators,
  createModeratorRequest,
  deleteModeratorRequest,
} from "src/redux/actions";
import { IAdmin } from "src/models";
import { emptyAdmin } from "src/models/admin";

const Moderators = () => {
  const dispatch = useDispatch();
  const { moderators } = useSelector((state: RootState) => state.admin);
  const { success } = useSelector((state: RootState) => state.auth);
  const [moderator, setModerator] = useState(emptyAdmin);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  useEffect(() => {
    dispatch(getModerators());
  }, [dispatch]);

  const _openDialog = () => {
    setOpenDialog(true);
  };
  const _handleCloseDialog = () => setOpenDialog(false);

  const _openConfirmationDialog = (moderator: IAdmin) => {
    setModerator(moderator);
    setOpenConfirmationDialog(true);
  };
  const _handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

  return (
    <>
      <Helmet>
        <title>Applications - Moderators</title>
      </Helmet>
      <PageTitleWrapper maxWidth="lg">
        <PageHeader _openDialog={_openDialog} />
      </PageTitleWrapper>

      {moderators.length === 0 && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 30, padding: 10 }}
        >
          <Typography variant="subtitle2">No moderators found</Typography>
        </Grid>
      )}

      {moderators.length > 0 && (
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <ModeratorsTable
                moderators={moderators}
                openConfirmationDialog={(moderator) =>
                  _openConfirmationDialog(moderator)
                }
              />
            </Grid>
          </Grid>
        </Container>
      )}
      <FormDialog
        open={openDialog}
        handleCloseDialog={_handleCloseDialog}
        success={success}
        submit={(moderator) => dispatch(createModeratorRequest(moderator))}
      />
      <ConfirmationDeleteDialog
        moderator={moderator}
        open={openConfirmationDialog}
        handleCloseDialog={_handleCloseConfirmationDialog}
        deleteModerator={() => dispatch(deleteModeratorRequest(moderator._id))}
        success={success}
      />
      <Footer />
    </>
  );
};

export default Moderators;
