const BaseController = require("../base");
const express = require("express");
const { disk, memory } = require("../../middlewares/upload");
const { uploader } = require("../../helpers/cloudinary");
const router = express.Router();

class UploadController extends BaseController {
    constructor() {
        super();
        router.post("/", memory.single('file'), this.upload);
        router.post("/local", disk.single('file'), this.uploadLocal);
    }
    upload = async (req, res, next) => {
        try {
            const { file } = req;
            //mengambil file dari url buffer, karena file bisa di convert ke sebuah url dengan tipe base64
            const allowedFile =
                [
                    'image/png',
                    'image/jpg',
                    'image/jpeg',
                    'image/webp',
                    'image/svg+xml',
                    'application/pdf',
                    'application/ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                ];

            if (!allowedFile.includes(file.mimetype)) {
                return next(new ValidationError("File not allowed"));
            }

            const fileBase64 = file.buffer.toString('base64');
            const fileDataUri = `data:${file.mimetype};base64,${fileBase64}`;

            const fileUpload = await uploader.upload(fileDataUri, {
                resource_type: "auto",
            });

            res.status(200).json(
                this.apiSend({
                    code: 200,
                    status: "success",
                    message: "File uploaded successfully",
                    data: {
                        url: fileUpload.secure_url,
                        width: fileUpload.width,
                        height: fileUpload.height,
                        format: fileUpload.format,
                        resource_type: fileUpload.resource_type,
                    }
                }));

        } catch (e) {
            next(e);
        }
    }

    uploadLocal = async (req, res, next) => {
        try {
            const { file } = req;
            const allowedFile =
                [
                    'image/png',
                    'image/jpg',
                    'image/jpeg',
                    'image/webp',
                    'image/svg+xml',
                    'application/pdf',
                    'application/ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                ];

            if (!allowedFile.includes(file.mimetype)) {
                return next(new ValidationError("File not allowed"));
            }

            const proxyHost = req.headers['x-forwarded-host'] || req.headers['host'];
            const url = `http://${proxyHost}/public/uploads/${file.filename}`

            res.status(200).json(
                this.apiSend({
                    code: 200,
                    status: "success",
                    message: "File uploaded successfully",
                    data: {
                        url: url
                    }
                }
                ));
        } catch (e) {
            next(e);
        }
    }
}

new UploadController();
module.exports = router