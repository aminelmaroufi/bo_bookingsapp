import { useState } from "react";
import {
  Box,
  Typography,
  Hidden,
  Container,
  Button,
  Grid,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import LoadingButton from "@mui/lab/LoadingButton";

import { styled } from "@mui/material/styles";

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.black1};
`
);

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function InvalidToken() {
  const [pending, setPending] = useState(false);
  function handleClick() {
    setPending(true);
  }

  return (
    <>
      <Helmet>
        <title>Status - 500</title>
      </Helmet>
      <MainContent>
        <Grid container xl={12} alignItems="center" spacing={0}>
          <Grid
            xs={12}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
              <Box textAlign="center">
                <img
                  alt="500"
                  height={260}
                  src="/assets/images/status/500.svg"
                />
                <Typography variant="h2" sx={{ my: 2 }}>
                  Invalid user token
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  The token was either expired or invalid
                </Typography>
                <Button
                  href="/login"
                  variant="contained"
                  sx={{ ml: 1, marginRight: 2 }}
                >
                  Go to login page
                </Button>
                Or
                <Button
                  href="/session/forgot-password"
                  variant="contained"
                  sx={{ ml: 1 }}
                >
                  Go to forgot password page
                </Button>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </MainContent>
    </>
  );
}

export default InvalidToken;
