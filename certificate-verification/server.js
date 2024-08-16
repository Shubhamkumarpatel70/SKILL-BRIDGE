const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const app = express();
const port = 3000;

// Setup CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define paths
const frontendFile = path.join(__dirname, "../index.html");
const frontend = path.join(__dirname, "../");
const uploadsDir = path.join(__dirname, "uploads");
const certificatesFilePath = path.join(__dirname, "certificates.json");
const tasksFilePath = path.join(__dirname, "tasks.json");

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// GET endpoint to verify certificate by ID
app.get("/verify/:id", (req, res) => {
  const studentId = req.params.id.toUpperCase();

  fs.readFile(certificatesFilePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Error reading certificates data" });
    }

    const certificates = JSON.parse(data);
    const certificate = certificates.find(
      (cert) => cert.certificate_id.toUpperCase() === studentId
    );

    if (certificate) {
      res.json({
        status: "success",
        message: "Verification successful",
        certificate,
      });
    } else {
      res
        .status(404)
        .json({
          status: "error",
          message: "Certificate not found for the provided student ID",
        });
    }
  });
});

// POST endpoint to verify certificate using student name and certificate ID
app.post("/verify", (req, res) => {
  const { student_name, certificate_id } = req.body;

  fs.readFile(certificatesFilePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Error reading certificates data" });
    }

    const certificates = JSON.parse(data);
    const certificate = certificates.find(
      (cert) =>
        cert.student_name.toLowerCase() === student_name.toLowerCase() &&
        cert.certificate_id.toLowerCase() === certificate_id.toLowerCase()
    );

    if (certificate) {
      res.json({
        status: "success",
        message: "Verification successful",
        verified_by: certificate.verified_by,
      });
    } else {
      res.json({
        status: "error",
        message: "Certificate not found or details do not match",
      });
    }
  });
});

// Endpoint to fetch tasks
app.post("/fetch-tasks", (req, res) => {
  const { name, domain, id } = req.body;

  fs.readFile(tasksFilePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Error reading tasks data" });
    }

    const tasks = JSON.parse(data);
    const task = tasks.find((task) => task.domain === domain);

    if (task) {
      res.json({ status: "success", tasks: [task] });
    } else {
      res.json({ status: "error", message: "No tasks found" });
    }
  });
});

// Endpoint to upload file
app.post("/upload-file", upload.single("registrationFile"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "No file uploaded" });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.json({ status: "success", fileUrl });
});

// build react files
app.use(express.static(frontend));

app.get("*", (req, res) => {
  res.sendFile(frontendFile);
});

// Serve static files from the uploads directory
app.use("/uploads", express.static(uploadsDir));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
