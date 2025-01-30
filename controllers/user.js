const User = require("../Model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken") ;


exports.register = async (req, res) => {
    try {
        const { firstname, name, email, password, isAdmin } = req.body; // Remplacer "role" par "isAdmin"
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).send({ errors: [{ msg: "Email déjà utilisé ..." }] });
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Créer un nouvel utilisateur avec isAdmin
        const newUser = new User({
            firstname,
            name,
            email,
            password: hashPassword,
            isAdmin: isAdmin || false // Si aucun isAdmin n'est spécifié, il sera false par défaut
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.SCRT_KEY, { expiresIn: "48h" });

        res.status(200).send({
            success: [{ msg: "Inscription avec succès ..." }],
            user: newUser,
            token
        });

    } catch (error) { 
        res.status(400).send({ errors: [{ msg: "Essayez à nouveau" }] });
    }
};


exports.login = async (req, res) => {
    console.log("BODY REÇU DANS LOGIN:", req.body); // 🔥 Debug ici !
    try {
        const {email , password} = req.body ;
        const foundUser = await User.findOne({email})
        if (!foundUser) {
            return res.status(400).send({errors : [{msg : "utilisateur non trouvé"}]})
        }
        const checkPassword = await bcrypt.compare(password ,foundUser.password )
        if(!checkPassword) {
            return res.status(400).send({errors : [{msg : "Veuillez verifier votre mot de passe"}]})
        }

        const token = jwt.sign({
            id : foundUser._id
        }, process.env.SCRT_KEY , {expiresIn : "48h"}  )

        res.status(200).send({success : [{msg : "welcome back"}], user : foundUser ,token })

    } catch (error) {
        return res.status(400).send({errors : [{msg : "Veuillez verifier vos informations"}]})    
    }
}

exports.updateUserPassword = async (req, res) => {
    const { oldPassword, password, confirmedpassword } = req.body;
    const { id } = req.params; // L'ID de l'utilisateur est dans les paramètres de l'URL.

    try {
        const user = await User.findById(id); // Utilisez l'ID extrait de req.params
        if (!user) {
            return res.status(400).send('User not found');
        }

        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return res.status(400).send({ errors: [{ msg: "Veuillez vérifier votre ancien mot de passe "} ] });
        }

        if (password !== confirmedpassword) {
            return res.status(400).send({ errors: [{ msg: "Les mots de passe ne correspondent pas "} ] });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        const updatedUserPassword = await user.save();

        return res.json({
            success: [{ msg: "Votre mot de passe a été modifié avec succès" }],
            user: updatedUserPassword
        });

    } catch (err) {
        return res.status(400).send({ errors: [{ msg: "Veuillez réessayer ultérieurement "} ] });
    }
};


  // Voir tous les utilisateurs (Admin uniquement)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclut les mots de passe
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ errors: [{ msg: "Erreur serveur" }] });
    }
};

// Supprimer un utilisateur (Admin uniquement)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: [{ msg: "Utilisateur supprimé avec succès" }] });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: "Erreur lors de la suppression" }] });
    }
};