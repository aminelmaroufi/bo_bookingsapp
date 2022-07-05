import { Card, Grid, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { RootState } from "src/redux/reducers";
import { forgtPasswordRequest } from "src/redux/actions";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
}));

const JustifyBox = styled(FlexBox)(() => ({
  flex: 1,
  justifyContent: "center",
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const IMG = styled("img")(() => ({
  width: "100%",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  height: window.innerHeight,
  alignItems: "center",
  "& .card": {
    maxWidth: 800,
    borderRadius: 12,
  },
}));

const StyledProgress = styled(CircularProgress)(() => ({
  position: "absolute",
  top: "6px",
  left: "25px",
}));

const ForgotPwd = () => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetching } = useSelector((state: RootState) => state.auth);
  const { palette } = useTheme();
  const textError = palette.error.main;
  const textPrimary = palette.primary.main;
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailValueIsValid, setEmailValueIsValid] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (field: string, event: any) => {
    setEmail(event.target.value);
    setSelectedField(field);
  };

  const validateFields = () => {
    switch (selectedField) {
      case "email": {
        const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          email
        );
        if (email) {
          setEmailIsValid(true);

          if (email && !emailValid) {
            setEmailValueIsValid(false);
          } else if (emailValid) {
            setEmailValueIsValid(true);
          }
        } else {
          setEmailValueIsValid(null);
          setEmailIsValid(false);
        }
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    validateFields();
  }, [email]);

  const forgot = () => {
    dispatch(forgtPasswordRequest(email));
  };

  useEffect(() => {
    const validateForm = () => {
      if (emailIsValid && emailValueIsValid) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    validateForm();
  }, [emailIsValid, emailValueIsValid]);

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <JustifyBox p={4} height="100%">
              <IMG src="/assets/images/logo.png" alt="" />
            </JustifyBox>
          </Grid>
          <Grid item lg={12} md={7} sm={7} xs={12}>
            <ContentBox>
              <ValidatorForm onSubmit={forgot}>
                <TextValidator
                  sx={{ mb: 3, width: "100%" }}
                  variant="outlined"
                  size="small"
                  label="Email"
                  onChange={(event) => handleChange("email", event)}
                  type="email"
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />

                <FlexBox mb={2} flexWrap="wrap">
                  <Box position="relative">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!isValid}
                      type="submit"
                    >
                      Send
                    </Button>
                    {fetching && (
                      <StyledProgress size={24} className="buttonProgress" />
                    )}
                  </Box>
                </FlexBox>
                <FlexBox mb={2} flexWrap="wrap">
                  Already have an account ?{" "}
                  <Link
                    to={"/login"}
                    style={{ marginLeft: 5, color: textPrimary }}
                  >
                    Login
                  </Link>
                </FlexBox>
              </ValidatorForm>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default ForgotPwd;
