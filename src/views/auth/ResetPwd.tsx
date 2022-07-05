import {
  Card,
  Grid,
  Button,
  CircularProgress,
  TextField,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Typography, Box, Popover } from "@mui/material";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineTwoTone from "@mui/icons-material/ErrorOutlineTwoTone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSearchParams } from "react-router-dom";
import { browserHistory } from "src/redux/reducers/history";
import { Link } from "react-router-dom";
import { RootState } from "src/redux/reducers";
import { resetPasswordRequest } from "src/redux/actions";
import { ResetPwdFormMessages } from "src/utils/validationMessages";

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

const ResetPwd = (props: any) => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetching, reset_pwd_success } = useSelector(
    (state: RootState) => state.auth
  );
  const { palette } = useTheme();
  const textError = palette.error.main;
  const textPrimary = palette.primary.main;
  const [searchParams, setSearchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmedPwd, setConfirmedPwd] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [pwdIsValid, setPwdIsValid] = useState(null);
  const [confirmedPwdIsValid, setConfirmedPwdIsValid] = useState(null);
  const [passwordsMatched, setPasswordsMatched] = useState(null);
  const [selectedField, setSelectedField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPwd, setShowConfirmedPwd] = useState(false);

  useEffect(() => {
    if (reset_pwd_success) browserHistory.push("/login");
  }, [reset_pwd_success]);

  const handleChange = (field: string, event: any) => {
    if (field === "password") setPassword(event.target.value);
    else setConfirmedPwd(event.target.value);
    setSelectedField(field);
  };

  const validateFields = () => {
    switch (selectedField) {
      case "password": {
        if (checkRegex(password)) {
          setPwdIsValid(true);
          if (confirmedPwd) {
            if (confirmedPwdIsValid && password === confirmedPwd)
              setPasswordsMatched(true);
            else setPasswordsMatched(false);
          }
        } else {
          setPwdIsValid(false);
        }
        break;
      }
      case "confirmedPwd": {
        if (checkRegex(confirmedPwd)) {
          setConfirmedPwdIsValid(true);

          if (pwdIsValid && password === confirmedPwd)
            setPasswordsMatched(true);
          else setPasswordsMatched(false);
        } else {
          setConfirmedPwdIsValid(false);
        }
        break;
      }
      default:
        break;
    }
  };

  const checkRegex = (pass: string) => {
    const checkSpecial = /[*@!#%&()^~{}]+/.test(pass),
      checkUpper = /[A-Z]+/.test(pass),
      // checkLower = /[a-z]+/.test(string),
      checkNum = /^(.*[0-9].*)/.test(pass);
    if (checkUpper && checkNum && checkSpecial) {
      if (pass.length < 8) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const checkSpecial = (pass: string) => {
    var checkCharSp = /[*@!#%&()^~{}]+/.test(pass);
    if (checkCharSp) {
      return true;
    } else {
      return false;
    }
  };

  const checkUpper = (pass: string) => {
    var checkUpperCase = /[A-Z]+/.test(pass);
    if (checkUpperCase) {
      return true;
    } else {
      return false;
    }
  };
  const checkNumber = (pass: string) => {
    var checkNum = /^(.*[0-9].*)/.test(pass);
    if (checkNum) {
      return true;
    } else {
      return false;
    }
  };

  const checkLength = (pass: string) => {
    if (pass.length < 8) return false;
    else return true;
  };

  useEffect(() => {
    validateFields();
  }, [password, confirmedPwd]);

  const reset = () => {
    dispatch(
      resetPasswordRequest(searchParams.get("token"), password, confirmedPwd)
    );
  };

  useEffect(() => {
    const validateForm = () => {
      if (pwdIsValid && confirmedPwdIsValid && passwordsMatched) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    validateForm();
  }, [pwdIsValid, confirmedPwdIsValid, passwordsMatched]);

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
              <ValidatorForm onSubmit={reset}>
                <Grid>
                  <TextValidator
                    sx={{ mb: "12px", width: "100%" }}
                    label="Password"
                    variant="outlined"
                    size="small"
                    onChange={(event) => handleChange("password", event)}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  {!showPassword && (
                    <Visibility
                      style={{
                        fontSize: 23,
                        position: "absolute",
                        right: 40,
                        top: 40,
                        color: "#32b471",
                      }}
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                  {showPassword && (
                    <VisibilityOff
                      style={{
                        fontSize: 23,
                        position: "absolute",
                        right: 40,
                        top: 40,
                        color: "#32b471",
                      }}
                      onClick={() => setShowPassword(false)}
                    />
                  )}
                </Grid>

                {pwdIsValid === false && (
                  <Grid style={{ marginBottom: 10 }}>
                    <Typography sx={{ p: 2 }}>
                      Enter Password that must be :
                    </Typography>
                    <Grid container direction="row" style={{ marginLeft: 20 }}>
                      <Grid item>
                        {checkLength(password) ? (
                          <CheckCircleOutlined
                            style={{
                              fontSize: 19,
                              marginRight: 5,
                              color: "#32b471",
                            }}
                          />
                        ) : (
                          <ErrorOutlineTwoTone
                            style={{
                              fontSize: 18,
                              marginRight: 5,
                              color: "#de183e",
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 13 }}>
                          At least 8 characters long
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" style={{ marginLeft: 20 }}>
                      <Grid item>
                        {checkNumber(password) ? (
                          <CheckCircleOutlined
                            style={{
                              fontSize: 19,
                              marginRight: 5,
                              color: "#32b471",
                            }}
                          />
                        ) : (
                          <ErrorOutlineTwoTone
                            style={{
                              fontSize: 18,
                              marginRight: 5,
                              color: "#de183e",
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 13 }}>
                          Must contain a number
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" style={{ marginLeft: 20 }}>
                      <Grid item>
                        {checkUpper(password) ? (
                          <CheckCircleOutlined
                            style={{
                              fontSize: 19,
                              marginRight: 5,
                              color: "#32b471",
                            }}
                          />
                        ) : (
                          <ErrorOutlineTwoTone
                            style={{
                              fontSize: 18,
                              marginRight: 5,
                              color: "#de183e",
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 13 }}>
                          Must contain a capital letter
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" style={{ marginLeft: 20 }}>
                      <Grid item>
                        {checkSpecial(password) ? (
                          <CheckCircleOutlined
                            style={{
                              fontSize: 19,
                              marginRight: 5,
                              color: "#32b471",
                            }}
                          />
                        ) : (
                          <ErrorOutlineTwoTone
                            style={{
                              fontSize: 18,
                              marginRight: 5,
                              color: "#de183e",
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 13 }}>
                          Must contain a special character
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                <Grid container direction="row">
                  {" "}
                  <Grid item sm={12}>
                    <TextValidator
                      sx={{ mb: "12px", width: "100%" }}
                      label="Confirm Password"
                      variant="outlined"
                      size="small"
                      onChange={(event) => handleChange("confirmedPwd", event)}
                      name="confirm password"
                      type={showConfirmedPwd ? "text" : "password"}
                      value={confirmedPwd}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                  <Grid item style={{ paddingTop: 5 }}>
                    {!showConfirmedPwd && (
                      <Visibility
                        style={{
                          fontSize: 23,
                          position: "absolute",
                          right: 40,
                          color: "#32b471",
                        }}
                        onClick={() => setShowConfirmedPwd(true)}
                      />
                    )}
                    {showConfirmedPwd && (
                      <VisibilityOff
                        style={{
                          fontSize: 23,
                          position: "absolute",
                          right: 40,
                          color: "#32b471",
                        }}
                        onClick={() => setShowConfirmedPwd(false)}
                      />
                    )}
                  </Grid>
                </Grid>

                {confirmedPwdIsValid === false && (
                  <Grid style={{ marginBottom: 10 }}>
                    <Typography sx={{ p: 2 }}>
                      Enter Password that must be :
                    </Typography>
                    <Grid container direction="row" style={{ marginLeft: 20 }}>
                      <Grid item>
                        {checkLength(confirmedPwd) ? (
                          <CheckCircleOutlined
                            style={{
                              fontSize: 19,
                              marginRight: 5,
                              color: "#32b471",
                            }}
                          />
                        ) : (
                          <ErrorOutlineTwoTone
                            style={{
                              fontSize: 18,
                              marginRight: 5,
                              color: "#de183e",
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 13 }}>
                          At least 8 characters long
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" style={{ marginLeft: 20 }}>
                      <Grid item>
                        {checkNumber(confirmedPwd) ? (
                          <CheckCircleOutlined
                            style={{
                              fontSize: 19,
                              marginRight: 5,
                              color: "#32b471",
                            }}
                          />
                        ) : (
                          <ErrorOutlineTwoTone
                            style={{
                              fontSize: 18,
                              marginRight: 5,
                              color: "#de183e",
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 13 }}>
                          Must contain a number
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" style={{ marginLeft: 20 }}>
                      <Grid item>
                        {checkUpper(confirmedPwd) ? (
                          <CheckCircleOutlined
                            style={{
                              fontSize: 19,
                              marginRight: 5,
                              color: "#32b471",
                            }}
                          />
                        ) : (
                          <ErrorOutlineTwoTone
                            style={{
                              fontSize: 18,
                              marginRight: 5,
                              color: "#de183e",
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 13 }}>
                          Must contain a capital letter
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" style={{ marginLeft: 20 }}>
                      <Grid item>
                        {checkSpecial(confirmedPwd) ? (
                          <CheckCircleOutlined
                            style={{
                              fontSize: 19,
                              marginRight: 5,
                              color: "#32b471",
                            }}
                          />
                        ) : (
                          <ErrorOutlineTwoTone
                            style={{
                              fontSize: 18,
                              marginRight: 5,
                              color: "#de183e",
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 13 }}>
                          Must contain a special character
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {passwordsMatched === false && (
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ color: textError }}
                    gutterBottom
                  >
                    {ResetPwdFormMessages.pwdNotMatched}
                  </Typography>
                )}

                <FlexBox mb={2} flexWrap="wrap">
                  <Box position="relative">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!isValid}
                      type="submit"
                    >
                      Submit
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

export default ResetPwd;
