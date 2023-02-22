import { FOLLOW, UNFOLLOW } from "./types";

export const followUser = (follower) => ({
  type: FOLLOW,
  payload: follower
});

export const unfollowUser = (follower) => ({
  type: UNFOLLOW,
  payload: follower,
});