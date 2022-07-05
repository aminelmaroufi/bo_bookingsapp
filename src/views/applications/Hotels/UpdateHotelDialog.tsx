import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Avatar, Box, Rating, styled, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CountryDropdown } from "react-country-region-selector";

import { emptyNewHotel } from "src/redux/reducers/hotel";
import { INewHotel } from "src/models";
import { baseURL } from "src/config";
import { HotelFormMessages } from "src/utils/validationMessages";

const Input = styled("input")({
  display: "none",
});

const UpdateHotelDialog = (props) => {
  const [hotel, setHotel] = useState(props.hotel);
  const [selectedField, setSelectedField] = useState("");
  const [nameIsValid, setNameIsValid] = useState(true);
  const [nameValueIsValid, setNameValueIsValid] = useState(true);
  const [typeIsValid, setTypeIsValid] = useState(true);
  const [typeValueIsValid, setTypeValueIsValid] = useState(true);
  const [mainPictureIsValid, setMainPictureIsValid] = useState(true);
  const [seconPictureIsValid, setSecondPictureIsValid] = useState(true);
  const [ratingIsValid, setRatingIsValid] = useState(true);
  const [shortAddressIsValid, setShortAddressIsValid] = useState(true);
  const [shortAddressValueIsValid, setShortAddressValueIsValid] =
    useState(null);
  const [addressIsValid, setAddressIsValid] = useState(true);
  const [addressValueIsValid, setAddressValueIsValid] = useState(true);
  const [locationIsValid, setLocationIsValid] = useState(true);
  const [locationValueIsValid, setLocationValueIsValid] = useState(true);
  const [countryIsValid, setCountryIsValid] = useState(true);
  const [cityIsValid, setCityIsValid] = useState(true);
  const [cityValueIsValid, setCityValueIsValid] = useState(true);
  const [isValid, setIsValid] = useState(true);

  let mainPicInput, secondPicFile;

  const handleChange = (field: string, event: any) => {
    let upatedHotel: INewHotel = hotel;
    if (field === "main_picture") {
      // if (event.length === 1) {
      upatedHotel = { ...upatedHotel, main_picture: event.target?.files?.[0] };
      // upatedHotel = { ...upatedHotel, second_picture: "" };
      // } else upatedHotel = { ...upatedHotel, second_picture: event[1] };
    } else if (field === "second_picture") {
      // if (event.length === 1) {
      upatedHotel = {
        ...upatedHotel,
        second_picture: event.target?.files?.[0],
      };
      // upatedHotel = { ...upatedHotel, second_picture: "" };
      // } else upatedHotel = { ...upatedHotel, second_picture: event[1] };
    } else if (field === "rating") {
      upatedHotel = { ...upatedHotel, [field]: parseInt(event.target.value) };
    } else if (field === "country") {
      upatedHotel = { ...upatedHotel, [field]: event };
    } else {
      upatedHotel = { ...upatedHotel, [field]: event.target.value };
    }
    setHotel(upatedHotel);
    // if (field === "pictures") {
    //   if (event.length === 1) {
    //     setSecondPictureIsValid(false);
    //     setSelectedField("main_picture");
    //   } else setSelectedField("second_picture");
    // } else {
    setSelectedField(field);
    // }
  };

  useEffect(() => {
    if (props.success) {
      setHotel(emptyNewHotel);
      props.handleCloseDialog();
    }
  }, [props.success]);

  useEffect(() => {
    const validateFields = () => {
      switch (selectedField) {
        case "name":
          if (hotel.name.length) {
            setNameIsValid(true);
            if (hotel.name.length > 3) setNameValueIsValid(true);
            else {
              setNameValueIsValid(false);
            }
          } else {
            setNameValueIsValid(null);
            setNameIsValid(false);
          }
          break;
        case "main_picture":
          if (hotel.main_picture) {
            setMainPictureIsValid(true);
          } else {
            setMainPictureIsValid(false);
          }
          break;
        case "second_picture":
          if (hotel.second_picture) {
            setSecondPictureIsValid(true);
          } else {
            setSecondPictureIsValid(false);
          }
          break;
        case "type":
          if (hotel.type) {
            setTypeIsValid(true);
            if (hotel.type.length > 3) setTypeValueIsValid(true);
            else {
              setTypeValueIsValid(false);
            }
          } else {
            setTypeValueIsValid(null);
            setTypeIsValid(false);
          }
          break;
        case "country":
          if (hotel.country) {
            setCountryIsValid(true);
          } else {
            setCountryIsValid(false);
          }
          break;
        case "city":
          if (hotel.city) {
            setCityIsValid(true);
            if (hotel.city.length > 3) setCityValueIsValid(true);
            else {
              setCityValueIsValid(false);
            }
          } else {
            setCityValueIsValid(null);
            setCityIsValid(false);
          }
          break;
        case "rating":
          if (hotel.rating > 0) {
            setRatingIsValid(true);
          } else {
            setRatingIsValid(false);
          }
          break;
        case "short_address":
          if (hotel.short_address.length) {
            setShortAddressIsValid(true);
            if (hotel.short_address.length > 3)
              setShortAddressValueIsValid(true);
            else {
              setShortAddressValueIsValid(false);
            }
          } else {
            setShortAddressValueIsValid(null);
            setShortAddressIsValid(false);
          }
          break;
        case "address":
          if (hotel.address) {
            setAddressIsValid(true);
            if (hotel.address.length > 3) setAddressValueIsValid(true);
            else {
              setAddressValueIsValid(false);
            }
          } else {
            setAddressValueIsValid(null);
            setAddressIsValid(false);
          }
          break;
        case "location":
          if (hotel.location) {
            setLocationIsValid(true);
            if (hotel.location.length > 3) setLocationValueIsValid(true);
            else {
              setLocationValueIsValid(false);
            }
          } else {
            setLocationValueIsValid(null);
            setLocationIsValid(false);
          }
          break;
      }
    };

    validateFields();
  }, [hotel, selectedField]);

  useEffect(() => {
    if (
      nameIsValid &&
      mainPictureIsValid &&
      seconPictureIsValid &&
      typeIsValid &&
      ratingIsValid &&
      shortAddressIsValid &&
      addressIsValid &&
      locationIsValid &&
      countryIsValid &&
      cityIsValid &&
      cityValueIsValid
    )
      setIsValid(true);
    else setIsValid(false);
  }, [
    nameIsValid,
    mainPictureIsValid,
    seconPictureIsValid,
    typeIsValid,
    ratingIsValid,
    shortAddressIsValid,
    addressIsValid,
    locationIsValid,
    countryIsValid,
    cityIsValid,
    cityValueIsValid,
  ]);

  const submit = () => {
    if (isValid) props.submit(hotel);
  };

  const removePicture = (field: string) => {
    let upatedHotel: INewHotel = hotel;
    if (field === "main_picture") {
      upatedHotel = { ...upatedHotel, main_picture: null };
    } else {
      upatedHotel = {
        ...upatedHotel,
        second_picture: null,
      };
    }
    setHotel(upatedHotel);

    setSelectedField(field);
  };

  useEffect(() => {
    setHotel(props.hotel);
  }, [props.hotel]);

  return (
    <Dialog
      open={props.open}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={props.handleCloseDialog}
    >
      <DialogTitle style={{ fontSize: 25, fontWeight: "bold" }}>
        Update hotel
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: 10, marginBottom: 50 }}>
          * All the fields are required:
        </DialogContentText>
        <ValidatorForm onSubmit={submit}>
          <TextValidator
            autoFocus
            sx={{
              mb: !nameIsValid || !nameValueIsValid ? 0 : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="Name*"
            onChange={(event) => handleChange("name", event)}
            type="text"
            name="Name"
            value={hotel.name}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          {nameIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.name}
            </Typography>
          )}
          {nameValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.nameNotValid}
            </Typography>
          )}
          <Box style={{ flexDirection: "row", marginBottom: 15 }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              disabled
              placeholder={
                hotel.main_picture ? hotel.main_picture?.name : "Upload a file"
              }
              style={{
                width: "80%",
                marginRight: 10,
              }}
            />

            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event) => handleChange("main_picture", event)}
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
          {mainPictureIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.main_picture}
            </Typography>
          )}

          {hotel.main_picture && (
            <Box mt={2} style={{ marginBottom: 15 }}>
              <div>Image Preview:</div>
              <div style={{ flexDirection: "row" }}>
                <img
                  src={
                    typeof hotel.main_picture === "string"
                      ? `${baseURL}/files/${hotel.main_picture}/view`
                      : URL.createObjectURL(hotel.main_picture)
                  }
                  alt={"main_picture"}
                  height="100px"
                />
                <Button onClick={() => removePicture("main_picture")}>
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

          <Box style={{ flexDirection: "row" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              disabled
              placeholder={
                hotel.second_picture
                  ? hotel.second_picture?.name
                  : "Upload a second file"
              }
              style={{
                width: "80%",
                marginRight: 10,
              }}
            />

            <label htmlFor="contained-button-file2">
              <Input
                accept="image/*"
                id="contained-button-file2"
                multiple
                type="file"
                onChange={(event) => handleChange("second_picture", event)}
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

          {seconPictureIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.second_picture}
            </Typography>
          )}
          {hotel.second_picture && (
            <Box mt={2} style={{ marginBottom: 15 }}>
              <div>Image Preview:</div>
              <div style={{ flexDirection: "row" }}>
                <img
                  src={
                    typeof hotel.second_picture === "string"
                      ? `${baseURL}/files/${hotel.second_picture}/view`
                      : URL.createObjectURL(hotel.second_picture)
                  }
                  alt={"second_picture"}
                  height="100px"
                />
                <Button onClick={() => removePicture("second_picture")}>
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
              mb: typeIsValid === false || typeValueIsValid === false ? 0 : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="Type*"
            onChange={(event) => handleChange("type", event)}
            type="text"
            name="Type"
            value={hotel.type}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          {typeIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.type}
            </Typography>
          )}
          {typeValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.typeNotValid}
            </Typography>
          )}

          <CountryDropdown
            value={hotel.country}
            onChange={(val) => handleChange("country", val)}
            classes={"Height: 100px  width: 100%"}
          />

          {countryIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.country}
            </Typography>
          )}

          <TextValidator
            sx={{
              mb: cityIsValid === false || cityValueIsValid === false ? 0 : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="City*"
            onChange={(event) => handleChange("city", event)}
            type="text"
            name="City"
            value={hotel.city}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          {cityIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.city}
            </Typography>
          )}
          {cityValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.cityNotValid}
            </Typography>
          )}

          <Rating
            name="read-only"
            value={hotel.rating}
            style={{ marginBottom: 20, marginLeft: 10 }}
            onChange={(event) => handleChange("rating", event)}
          />

          {ratingIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.rating}
            </Typography>
          )}
          <TextValidator
            sx={{
              mb:
                shortAddressIsValid === false ||
                shortAddressValueIsValid === false
                  ? 0
                  : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="Short address*"
            onChange={(event) => handleChange("short_address", event)}
            type="text"
            name="short address"
            value={hotel.short_address}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          {shortAddressIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.short_address}
            </Typography>
          )}
          {shortAddressValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.shortAddressNotValid}
            </Typography>
          )}
          <TextValidator
            sx={{
              mb:
                addressIsValid === false || addressValueIsValid === false
                  ? 0
                  : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="Address*"
            onChange={(event) => handleChange("address", event)}
            type="text"
            name="Address"
            value={hotel.address}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          {addressIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.address}
            </Typography>
          )}
          {addressValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.addressNotValid}
            </Typography>
          )}
          <TextValidator
            sx={{
              mb:
                locationIsValid === false || locationValueIsValid === false
                  ? 0
                  : 3,
              width: "100%",
            }}
            variant="outlined"
            size="small"
            label="Location*"
            onChange={(event) => handleChange("location", event)}
            type="text"
            name="Location"
            value={hotel.location}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          {locationIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.location}
            </Typography>
          )}
          {locationValueIsValid === false && (
            <Typography sx={{ mb: 3 }} variant="h6" color="red">
              {HotelFormMessages.locationNotValid}
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

export default UpdateHotelDialog;
