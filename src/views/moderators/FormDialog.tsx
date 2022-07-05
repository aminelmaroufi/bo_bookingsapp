import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Dialog, styled, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { INewAdmin } from "src/models";
import { emptyNewAdmin } from "src/models/admin";
import { ModeratorFormMessages } from "src/utils/validationMessages";

const Input = styled("input")({
  display: "none",
});

const FormDialog = (props) => {
  const [moderator, setModerator] = useState(emptyNewAdmin);
  const [selectedField, setSelectedField] = useState("");
  const [firstNameIsValid, setFirstNameIsValid] = useState(null);
  const [firstNameValueIsValid, setFirstNameValueIsValid] = useState(null);
  const [lastNameIsValid, setLastNameIsValid] = useState(null);
  const [lastNameValueIsValid, setLastNameValueIsValid] = useState(null);
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [emailValueIsValid, setEmailValueIsValid] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (field: string, value: any) => {
    let upatedModerator: INewAdmin = moderator;

    upatedModerator = { ...upatedModerator, [field]: value };
    setModerator(upatedModerator);
    setSelectedField(field);
  };

  useEffect(() => {
    if (props.success) {
      resetForm();
      props.handleCloseDialog();
    }
  }, [props.success]);

  useEffect(() => {
    const validateFields = () => {
      const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        moderator.email
      );
      switch (selectedField) {
        case "firstname":
          if (moderator.firstname.length) {
            setFirstNameIsValid(true);
            if (moderator.firstname.length > 3) setFirstNameValueIsValid(true);
            else {
              setFirstNameValueIsValid(false);
            }
          } else {
            setFirstNameValueIsValid(null);
            setFirstNameIsValid(false);
          }
          break;
        case "lastname":
          if (moderator.lastname.length) {
            setLastNameIsValid(true);
            if (moderator.lastname.length > 3) setLastNameValueIsValid(true);
            else {
              setLastNameIsValid(false);
            }
          } else {
            setLastNameValueIsValid(null);
            setLastNameIsValid(false);
          }
          break;
        case "email":
          if (moderator.email) {
            setEmailIsValid(true);

            if (moderator.email && !emailValid) {
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
    };

    validateFields();
  }, [moderator, selectedField]);

  useEffect(() => {
    if (firstNameIsValid && lastNameIsValid && emailIsValid) setIsValid(true);
    else setIsValid(false);
  }, [firstNameIsValid, lastNameIsValid, emailIsValid]);

  const submit = () => {
    if (isValid) props.submit(moderator);
  };

  const onCloseDialog = () => {
    resetForm();
    props.handleCloseDialog();
  };

  const resetForm = () => {
    setModerator(emptyNewAdmin);
    setSelectedField("");
    setFirstNameIsValid(null);
    setFirstNameValueIsValid(null);
    setLastNameIsValid(null);
    setLastNameValueIsValid(null);
    setEmailIsValid(null);
    setEmailValueIsValid(null);
    setIsValid(null);
  };

  return (
    <Dialog
      open={props.open}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={() => onCloseDialog()}
    >
      <DialogTitle style={{ fontSize: 25, fontWeight: "bold" }}>
        Create New Moderator
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: 10, marginBottom: 50 }}>
          * All the fields are required:
        </DialogContentText>
        <ValidatorForm onSubmit={submit}>
          <TextValidator
            autoFocus
            sx={{
              mb:
                firstNameIsValid === false || firstNameValueIsValid === false
                  ? 0
                  : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="First Name*"
            onChange={(event: any) =>
              handleChange("firstname", event.target?.value)
            }
            type="text"
            name="Title"
            value={moderator.firstname}
          />
          {firstNameIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {ModeratorFormMessages.firstname}
            </Typography>
          )}
          {firstNameValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {ModeratorFormMessages.firstnameNotValid}
            </Typography>
          )}

          <TextValidator
            sx={{
              mb:
                lastNameIsValid === false || lastNameValueIsValid === false
                  ? 0
                  : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="Last Name*"
            onChange={(event: any) =>
              handleChange("lastname", event.target?.value)
            }
            type="text"
            name="Lastname"
            value={moderator.lastname}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          {lastNameIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {ModeratorFormMessages.lastname}
            </Typography>
          )}
          {lastNameValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {ModeratorFormMessages.lastnameNotValid}
            </Typography>
          )}

          <TextValidator
            sx={{
              mb: !emailIsValid || !emailValueIsValid ? 0 : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="Email Adress*"
            onChange={(event: any) =>
              handleChange("email", event.target?.value)
            }
            type="text"
            name="Email"
            value={moderator.email}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          {emailIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {ModeratorFormMessages.email}
            </Typography>
          )}
          {emailValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {ModeratorFormMessages.emailNotValid}
            </Typography>
          )}
        </ValidatorForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseDialog}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!isValid}
          onClick={submit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
