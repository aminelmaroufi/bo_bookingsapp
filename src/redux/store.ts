import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  createRouterMiddleware,
  ReduxRouterState,
} from "@lagunovsky/redux-react-router";
import rootSaga from "./sagas";
import rootReducer from "./reducers";
import { browserHistory } from "./reducers/history";

let window: any;

export type State = { router: ReduxRouterState };

const sagaMiddleware = createSagaMiddleware();

const routerMiddleware = createRouterMiddleware(browserHistory);

const configureStore = () => {
  const middlewares = [sagaMiddleware, routerMiddleware];

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      window?.__REDUX_DEVTOOLS_EXTENSION__
        ? window?.__REDUX_DEVTOOLS_EXTENSION__()
        : (f: any) => f
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
