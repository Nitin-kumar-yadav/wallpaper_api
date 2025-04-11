import AdminPannel from "../model/AdminPannel.js";
import bcrypt from "bcryptjs";


export const adminSignup = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.password
    ) {
        return res.status(400).json({
            message: "Please fill all fields"
        })
    }
    const { name, email, password } = req.body
    const userExists = await AdminPannel.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const user = new AdminPannel({
            name,
            email,
            password: hashedPassword
        })
        const result = await user.save();
        if (!result) {
            return res.status(400).json({
                message: "User creation failed"
            })
        }
        res.status(200).json({
            message: "User created successfully",
        })
    } catch (error) {
        res.status(400).json({
            message: "User credentials occurred"
        })
    }

}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        const admin = await AdminPannel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compareSync(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({
            message: "Login successful",
            admin: {
                id: admin._id,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",

        });
    }
}