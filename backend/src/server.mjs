import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Products from "./models/ProductModel.mjs";
import bcrypt from "bcryptjs";
import User from "./models/UserModel.mjs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
    .connect(
        "mongodb+srv://Mayakrishnan:Mayakrishnan_0303@cluster0.m8pazqm.mongodb.net/ecommerce"
    )
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err.message));

/* Home Route */
app.get("/", (req, res) => {
    res.send({
        msg: "Server Connected Successfully",
    });
});

/* Get All Products */
app.get("/api/products", async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            msg: err.message,
        });
    }
});

/* Add Product */
app.post("/api/products", async (req, res) => {
    try {
        const body = req.body;

        if (!Array.isArray(body)) {
            return res.status(400).json({
                msg: "Body must be an array of products"
            });
        }

        for (const product of body) {
            if (
                !product.name ||
                !product.description ||
                !product.price ||
                !product.image ||
                !product.category
            ) {
                return res.status(400).json({
                    msg: "Validation Failed",
                    error:
                        "name, description, price, image, category are required"
                });
            }
        }

        const savedProducts = await Products.insertMany(body);

        res.status(201).json({
            msg: "Products Added Successfully",
            data: savedProducts
        });

    } catch (err) {
        res.status(400).json({
            msg: "Failed to Add Products",
            error: err.message
        });
    }
});
/* Get Single Product */
app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                msg: "Product Not Found",
            });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({
            msg: err.message,
        });
    }
});

/* Update Product */
app.put("/api/products/:id", async (req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                msg: "Product Not Found",
            });
        }

        res.status(200).json({
            msg: "Product Updated Successfully",
            data: updatedProduct,
        });
    } catch (err) {
        res.status(400).json({
            msg: err.message,
        });
    }
});

/* Delete Product */
app.delete("/api/products/:id", async (req, res) => {
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                msg: "Product Not Found",
            });
        }

        res.status(200).json({
            msg: "Product Deleted Successfully",
            data: deletedProduct,
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message,
        });
    }
});

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } =
            req.body;

        const exists = await User.findOne({
            email,
        });

        if (exists) {
            return res.status(400).json({
                msg: "User already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            msg: "Registered Successfully",
            user,
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message,
        });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } =
            req.body;

        const user = await User.findOne({
            email,
        });

        if (!user) {
            return res.status(400).json({
                msg: "User not found",
            });
        }

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {
            return res.status(400).json({
                msg: "Wrong password",
            });
        }

        res.status(200).json({
            msg: "Login success",
            user,
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message,
        });
    }
});

/* Start Server */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});