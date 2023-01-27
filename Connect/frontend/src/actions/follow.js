import { FOLLOW, UNFOLLOW } from "./types";

export const followUser = (user) => ({
  type: FOLLOW,
  payload: user,
});

export const unfollowUser = () => ({
  type: UNFOLLOW,
});