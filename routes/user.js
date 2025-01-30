const express = require("express");
const { register, login, updateUserPassword, getAllUsers, deleteUser } = require("../controllers/user");
const { isAuth, isAdmin } = require("../middlewares/isAuth"); // Ajout de isAdmin
const { registerValidator, validation, loginValidator } = require("../middlewares/Validator");

const router = express.Router();

// Authentification
router.post("/register", registerValidator(), validation, register);
router.post("/login", loginValidator(), validation, login);
router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});
router.put("/updatepassword/:_id", isAuth, updateUserPassword);

// Routes Admin (seulement pour les admins)
router.get("/all-users", isAuth, isAdmin, getAllUsers); // Voir tous les utilisateurs
router.delete("/delete-user/:id", isAuth, isAdmin, deleteUser); // Supprimer un utilisateur

module.exports = router;
