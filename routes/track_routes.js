const { Router } = require("express");
const {
  addTrack,
  deleteTrack,
  fetchOneTrack,
  fetchTracks,
  updateTrack,
} = require("../controllers/track_controller");
const trackRouter = Router();

trackRouter
  .route("/")
  .get(fetchTracks)
  .post(addTrack)
  .delete(deleteTrack)
  .patch(updateTrack);
trackRouter.route("/:id").get(fetchOneTrack);

module.exports = trackRouter;
