module.exports = (app) => {
  const products = require("../controllers/products.controller");

  var router = require("express").Router();
  const multer = require("multer");
  const path = require("path");

  // File upload settings
  const PATH = "./uploads";

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, PATH);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now());
      console.log(
        file.mimetype,
        file.filename,
        file.originalname,
        file.fieldname
      );
    },
  });

  let upload = multer({
    storage: storage,
  });
  // End of Image setting

  // Create a new Product
  router.post("/", upload.single("image"), products.create);

  // Retrieve all Products
  router.get("/", products.findAll);

  // Retrieve all published Products
  //router.get("/published", products.findAllPublished);

  // Retrieve a single Product with StateCode
  router.get("/:stateCode", products.findOne);

  // Update a Product with id
  //router.put("/:id", products.update);

  // Delete a Product with id
  //router.delete("/:id", products.delete);

  // Delete all Products
  //router.delete("/", products.deleteAll);

  app.use("/api/products", router);
};
