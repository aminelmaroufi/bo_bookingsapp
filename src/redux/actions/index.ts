export {
  loginRequest,
  checkUser,
  logoutRequest,
  forgtPasswordRequest,
  resetPasswordRequest,
} from "./auth";
export {
  getHotels,
  selectHotel,
  getHotelRequest,
  createHotelRequest,
  updateHotelRequest,
  deleteHotelRequest,
  exportHotels,
} from "./hotels";
export {
  getRooms,
  createRoomRequest,
  updateRoomRequest,
  deleteRoomRequest,
  exportHotelRoomsRquest,
} from "./room";
export {
  getCustomers,
  exportCustomer,
  getCustomerBookingsRequest,
  exportCustomerBookingsRequest,
} from "./customer";
export { getBookings, exportBookings } from "./booking";
export {
  getModerators,
  createModeratorRequest,
  deleteModeratorRequest,
} from "./admin";
export { getStatistics } from "./dash";
