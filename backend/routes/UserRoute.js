 
const express=require("express");
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUser, getUser, updateUserRole, deleteUser } = require("../controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router=express.Router();


router.route('/register').post(registerUser);

// This is login user 

router.route('/login').post(loginUser)

router.route('/password/forgot').post(forgetPassword)

router.route("/password/reset/:token").put(resetPassword)



router.route('/logout').get(logout)

router.route("/me").get(isAuthenticatedUser,getUserDetails)


router.route("/password/update").put(isAuthenticatedUser,updateUserPassword);


router.route("/me/update").put(isAuthenticatedUser,updateUserProfile)
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getUser).put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)








module.exports=router;