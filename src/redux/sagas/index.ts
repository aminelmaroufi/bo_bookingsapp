import { fork, all } from "redux-saga/effects";
import watchAuthRequests from "./auth";
import watchHotelsRequest from "./hotels";
import watchRoomsRequest from "./room";
import watchCustomersRequest from "./customer";
import watchBookingsRequest from "./booking";
import watchAdminRequest from "./admin";
import watchDashRequest from "./dash";

export default function* rootSaga() {
  yield all([
    fork(watchAuthRequests),
    fork(watchHotelsRequest),
    fork(watchRoomsRequest),
    fork(watchCustomersRequest),
    fork(watchBookingsRequest),
    fork(watchAdminRequest),
    fork(watchDashRequest),
  ]);
}
