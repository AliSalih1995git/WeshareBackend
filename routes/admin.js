const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  blockUser,
  unBlockUser,
} = require("../controller/admin");

router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);
router.put("/blockUser/:id", blockUser);
router.put("/unBlockUser/:id", unBlockUser);

module.exports = router;
