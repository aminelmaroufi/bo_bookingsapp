import ActionTypes from "src/utils/actionTypes";
import { adminActions, AdminState } from "src/types";
import admin from "../admin";
import { IAdmin } from "src/models";

const defaultState: AdminState = {
  moderators: [],
};

const moderators: Array<IAdmin> = [
  {
    _id: "1",
    firstname: "test",
    lastname: "test",
    fullname: "test test",
    email: "test@test.com",
    roles: ["admin"],
    created_at: "",
    updated_at: "",
  },
];

describe("test admin reducer", () => {
  it("should return the initial state when state is undefined", () => {
    const noAction: adminActions = {
      type: "",
    };
    expect(admin(undefined, noAction)).toEqual(defaultState);
  });

  it("should handle the 'SET_MODERATORS' action", () => {
    const expectedState = { ...defaultState, moderators };
    const getModeratorsPayload: adminActions = {
      type: ActionTypes.SET_MODERATORS,
      payload: { ...defaultState, moderators },
    };
    expect(admin(undefined, getModeratorsPayload)).toEqual(expectedState);
  });

  it("should handle the 'CREATE_MODERATOR_SUCCESS' action", () => {
    const newModerator: IAdmin = {
      _id: "2",
      firstname: "test1",
      lastname: "test1",
      fullname: "test1 test1",
      email: "test1@test.com",
      roles: ["admin"],
      created_at: "",
      updated_at: "",
    };
    const expectedState = { ...defaultState, moderators: [newModerator] };
    const createModeratorSuccessPayload: adminActions = {
      type: ActionTypes.CREATE_MODERATOR_SUCCESS,
      payload: { moderator: newModerator },
    };
    expect(admin(undefined, createModeratorSuccessPayload)).toEqual(
      expectedState
    );
  });

  it("should handle the 'DELETE_MODERATOR_SUCCESS' action", () => {
    const newArray: Array<IAdmin> = [
      {
        _id: "2",
        firstname: "test1",
        lastname: "test1",
        fullname: "test1 test1",
        email: "test1@test.com",
        roles: ["admin"],
        created_at: "",
        updated_at: "",
      },
    ];
    const expectedState = { ...defaultState, moderators: newArray };
    const deleteModeratorSuccessPayload: adminActions = {
      type: ActionTypes.DELETE_MODERATOR_SUCCESS,
      payload: { moderatorId: "1" },
    };
    expect(admin(undefined, deleteModeratorSuccessPayload)).toEqual(
      expectedState
    );
  });
});
