import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Box, styled, Typography } from "@mui/material";
import CurrencyInput from "react-currency-input-field";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUpload from "react-mui-fileuploader";
import { emptyNewRoom } from "src/redux/reducers/room";
import { INewRoom } from "src/models";
import { RoomFormMessages } from "src/utils/validationMessages";

const Input = styled("input")({
  display: "none",
});

const FormDialog = (props) => {
  const [room, setRoom] = useState(emptyNewRoom);
  const [selectedField, setSelectedField] = useState("");
  const [titleIsValid, setTitleIsValid] = useState(null);
  const [titleValueIsValid, setTitleValueIsValid] = useState(null);
  const [roomPictureIsValid, setRoomPictureIsValid] = useState(null);
  const [priceIsValid, setPriceIsValid] = useState(null);
  const [advantageIsValid, setAdvantageIsValid] = useState(null);
  const [advantageValueIsValid, setAdvantageValueIsValid] = useState(null);
  const [isValid, setIsValid] = useState(false);

  let fileInput;

  const handleChange = (field: string, value: any) => {
    let upatedRoom: INewRoom = room;

    if (field === "room_picture")
      upatedRoom = { ...upatedRoom, room_picture: value.target?.files?.[0] };
    else upatedRoom = { ...upatedRoom, [field]: value };
    setRoom(upatedRoom);
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
      switch (selectedField) {
        case "title":
          if (room.title.length) {
            setTitleIsValid(true);
            if (room.title.length > 3) setTitleValueIsValid(true);
            else {
              setTitleValueIsValid(false);
            }
          } else {
            setTitleValueIsValid(null);
            setTitleIsValid(false);
          }
          break;
        case "room_picture":
          if (room.room_picture) {
            setRoomPictureIsValid(true);
          } else {
            setRoomPictureIsValid(false);
          }
          break;

        case "advantage":
          if (room.advantage) {
            setAdvantageIsValid(true);
            if (room.advantage.length > 3) setAdvantageValueIsValid(true);
            else {
              setAdvantageValueIsValid(false);
            }
          } else {
            setAdvantageIsValid(false);
            setAdvantageValueIsValid(null);
          }
          break;
        case "price":
          if (room.price > 0) {
            setPriceIsValid(true);
          } else {
            setPriceIsValid(false);
          }
          break;
      }
    };

    validateFields();
  }, [room, selectedField]);

  useEffect(() => {
    if (titleIsValid && roomPictureIsValid && advantageIsValid && priceIsValid)
      setIsValid(true);
    else setIsValid(false);
  }, [titleIsValid, roomPictureIsValid, advantageIsValid, priceIsValid]);

  const submit = () => {
    if (isValid) props.submit(room);
  };

  const removePicture = () => {
    let upatedRoom: INewRoom = room;

    upatedRoom = { ...upatedRoom, room_picture: null };

    setRoom(upatedRoom);
    fileInput.value = null;
    setSelectedField("room_picture");
  };

  const onCloseDialog = () => {
    resetForm();
    props.handleCloseDialog();
  };

  const resetForm = () => {
    setRoom(emptyNewRoom);
    setTitleIsValid(null);
    setTitleValueIsValid(null);
    setRoomPictureIsValid(null);
    setAdvantageIsValid(null);
    setAdvantageValueIsValid(null);
    setPriceIsValid(null);
  };

  return (
    <Dialog
      open={props.open}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={() => onCloseDialog()}
    >
      <DialogTitle style={{ fontSize: 25, fontWeight: "bold" }}>
        Create new Room
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: 10, marginBottom: 50 }}>
          * All the fields are required:
        </DialogContentText>
        <ValidatorForm onSubmit={submit}>
          <TextValidator
            autoFocus
            sx={{
              mb: !titleIsValid || !titleValueIsValid ? 0 : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="Title*"
            onChange={(event: any) =>
              handleChange("title", event.target?.value)
            }
            type="text"
            name="Title"
            value={room.title}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          {titleIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {RoomFormMessages.title}
            </Typography>
          )}
          {titleValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {RoomFormMessages.titleNotValid}
            </Typography>
          )}

          <Box style={{ flexDirection: "row", marginBottom: 15 }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              disabled
              placeholder={
                room.room_picture ? room.room_picture?.name : "Upload a file"
              }
              style={{
                width: "80%",
                marginRight: 10,
              }}
            />

            <label htmlFor="contained-button-file">
              <Input
                ref={(ref) => (fileInput = ref)}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event) => handleChange("room_picture", event)}
              />
              <Button
                variant="contained"
                component="span"
                // style={{ marginTop: 8 }}
              >
                Upload
              </Button>
            </label>
          </Box>

          {roomPictureIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {RoomFormMessages.room_picture}
            </Typography>
          )}

          {room.room_picture && (
            <Box mt={2} style={{ marginBottom: 15 }}>
              <div>Image Preview:</div>
              <div style={{ flexDirection: "row" }}>
                <img
                  src={URL.createObjectURL(room.room_picture)}
                  alt={"main_picture"}
                  height="100px"
                />
                <Button onClick={() => removePicture()}>
                  <DeleteIcon
                    color="error"
                    style={{
                      position: "relative",
                      top: -92,
                      right: 35,
                      zIndex: 9999,
                    }}
                  />
                </Button>
              </div>
            </Box>
          )}

          <TextValidator
            sx={{
              mb: !advantageIsValid || !advantageValueIsValid ? 0 : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="Advantage*"
            onChange={(event: any) =>
              handleChange("advantage", event.target?.value)
            }
            type="text"
            name="Advantage"
            value={room.advantage}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          {advantageIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {RoomFormMessages.advantage}
            </Typography>
          )}
          {advantageValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {RoomFormMessages.advantageNotValid}
            </Typography>
          )}

          {/* <TextValidator
            sx={{ mb: 3, width: "100%" }}
            variant="outlined"
            size="small"
            label="Price*"
            onChange={(event) => handleChange("price", event)}
            type="text"
            name="price"
            value={room.price}
            validators={["required"]}
            errorMessages={["this field is required"]}
          /> */}
          <CurrencyInput
            id="input-example"
            name="input-name"
            placeholder="Price"
            value={room.price}
            prefix="$"
            decimalsLimit={2}
            onValueChange={(value, name) => handleChange("price", value)}
            style={{
              width: "100%",
              height: 40,
            }}
          />
          {priceIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {RoomFormMessages.price}
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
