/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

const StatisticsCard = ({
  bgColor,
  title,
  count,
  percentage,
  icon,
  direction,
  increase,
  type,
}) => {
  return (
    <Card cy-data={type}>
      <Box>
        <Box p={2}>
          <Grid container alignItems="center">
            {direction === "left" ? (
              <Grid item>
                <Box
                //   variant="gradient"
                //   bgColor={bgColor === "white" ? icon.color : "white"}
                //   color={bgColor === "white" ? "white" : "dark"}
                //   width="3rem"
                //   height="3rem"
                //   borderRadius="md"
                //   display="flex"
                //   justifyContent="center"
                //   alignItems="center"
                //   shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </Box>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <Box ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <Typography
                  variant="button"
                  color={bgColor === "white" ? "text" : "white"}
                  //   opacity={bgColor === "white" ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={bgColor === "white" ? "dark" : "white"}
                >
                  {count}{" "}
                  <Typography
                    variant="button"
                    color={percentage.color}
                    fontWeight="bold"
                  >
                    {increase ? (
                      <TrendingUp
                        style={{ position: "relative", top: 7, fontSize: 23 }}
                      />
                    ) : (
                      <TrendingDown
                        style={{ position: "relative", top: 7, fontSize: 23 }}
                      />
                    )}{" "}
                    {percentage.text}
                    <Typography
                      variant="button"
                      color={percentage.color}
                      fontWeight="bold"
                      textTransform="lowercase"
                    >
                      {" "}
                      This month
                    </Typography>
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            {direction === "right" ? (
              <Grid item xs={4}>
                <Box
                //   variant="gradient"
                //   bgColor={bgColor === "white" ? icon.color : "white"}
                //   color={bgColor === "white" ? "white" : "dark"}
                //   width="3rem"
                //   height="3rem"
                //   marginLeft="auto"
                //   borderRadius="md"
                //   display="flex"
                //   justifyContent="center"
                //   alignItems="center"
                //   shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </Box>
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </Box>
    </Card>
  );
};

// Setting default values for the props of MiniStatisticsCard
StatisticsCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the MiniStatisticsCard
StatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
    ]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default StatisticsCard;
