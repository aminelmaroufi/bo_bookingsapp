import { Box, Container, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        border-radius: 0;
        margin: ${theme.spacing(3)} 0;
`
);

const Footer = () => {
  return (
    <FooterWrapper data-cy="footer">
      <Container maxWidth="xl">
        <Box
          py={3}
          display={{ xs: "block", md: "flex" }}
          alignItems="center"
          textAlign={{ xs: "center", md: "left" }}
          justifyContent="center"
        >
          <Box>
            <Typography variant="subtitle1">
              &copy; 2022 - Booking Hotels Admin Dashboard
            </Typography>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
