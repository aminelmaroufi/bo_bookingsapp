export enum ModeratorFormMessages {
  firstname = "First Name is required!",
  firstnameNotValid = "First Name value must be more than 3 letters!",
  lastname = "Last Name is required!",
  lastnameNotValid = "Last Name must be more than 3 letters!",
  email = "Email adress is required!",
  emailNotValid = "Email adress is not valid!",
}

export enum HotelFormMessages {
  name = "Hotel name is required",
  nameNotValid = "Hotel name must be more than 3 letters",
  main_picture = "main_picture is required",
  second_picture = "second_picture is required",
  type = "Type is required",
  typeNotValid = "Hotel type must be more than 3 letters",
  country = "Country field is required",
  city = "City field is required",
  cityNotValid = "city field must be more than 3 letters",
  rating = "Rating is required",
  short_address = "short_address is required",
  shortAddressNotValid = "Hotel short_address must be more than 3 letters",
  address = "Address is required",
  addressNotValid = "Hotel address must be more than 3 letters",
  location = "Location is required",
  locationNotValid = "Hotel location must be more than 3 letters",
}

export enum RoomFormMessages {
  title = "Room title is required",
  titleNotValid = "Room title must be more than 3 letters",
  room_picture = "Room picture is required",
  advantage = "Advantage field is required",
  advantageNotValid = "Room advantage field must be more than 3 letters",
  price = "Price is required",
}

export enum ResetPwdFormMessages {
  password = "Password is required",
  passwordNotValid = "Password value is not valid",
  confirmed_password = "Confirmed password is required",
  confirmedPwdNotValid = "Confirmed password value is not valid",
  pwdNotMatched = "New password and confirm password must be matched",
}
