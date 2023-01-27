import { Card, Grid, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { RootState } from "src/redux/reducers";
import { loginRequest } from "src/redux/actions";

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
  background: "#ddd",
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

const Login = (props: any) => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetching } = useSelector((state: RootState) => state.auth);
  const { palette } = useTheme();
  const textError = palette.error.main;
  const textPrimary = palette.primary.main;
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailValueIsValid, setEmailValueIsValid] = useState(false);
  const [pwdIsValid, setPwdIsValid] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (field: string, event: any) => {
    let temp = { ...userInfo };
    temp[field] = event.target.value;
    setUserInfo(temp);
    setSelectedField(field);
  };

  const validateFields = () => {
    const { email, password } = userInfo;

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
      case "password": {
        if (password) {
          setPwdIsValid(true);
        } else {
          setPwdIsValid(false);
        }
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    validateFields();
  }, [userInfo]);

  const login = () => {
    dispatch(loginRequest(userInfo.email, userInfo.password));
  };

  useEffect(() => {
    const validateForm = () => {
      if (pwdIsValid && emailIsValid && emailValueIsValid) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    validateForm();
  }, [emailIsValid, emailValueIsValid, pwdIsValid]);

  useEffect(() => {
    const validateForm = () => {
      if (pwdIsValid && emailIsValid && emailValueIsValid) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    validateForm();
  }, [emailIsValid, emailValueIsValid, pwdIsValid]);

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
              <ValidatorForm data-testid="login-form" onSubmit={login}>
                <TextValidator
                  id="email"
                  sx={{ mb: 3, width: "100%" }}
                  variant="outlined"
                  size="small"
                  label="Email"
                  onChange={(event) => handleChange("email", event)}
                  type="email"
                  name="email"
                  value={userInfo.email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />
                <TextValidator
                  id="password"
                  sx={{ mb: "12px", width: "100%" }}
                  label="Password"
                  variant="outlined"
                  size="small"
                  onChange={(event) => handleChange("password", event)}
                  name="password"
                  type="password"
                  value={userInfo.password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                {message && (
                  //   <Paragraph sx={{ color: textError }}>{message}</Paragraph>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ color: textError }}
                    gutterBottom
                  >
                    {message}
                  </Typography>
                )}

                <FlexBox mb={2} flexWrap="wrap">
                  <Box position="relative">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!isValid}
                      type="submit"
                      onClick={login}
                    >
                      Sign in
                    </Button>
                    {fetching && (
                      <StyledProgress size={24} className="buttonProgress" />
                    )}
                  </Box>
                </FlexBox>
                <Link to={"/session/forgot-password"}>Forgt password ?</Link>
              </ValidatorForm>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default Login;
