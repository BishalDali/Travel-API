import multer, { FileFilterCallback } from 'multer';
import cloudinary, { UploadApiResponse } from 'cloudinary';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from './error.utils';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith('image')) {
      return callback(new CustomError('Please upload only images', 400));
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return callback(new CustomError('File size exceeds 10MB', 400));
    }

    callback(null, true);
  }
});

const uploadImages = (req: Request, res: Response, next: NextFunction): void => {

  upload.array('images', 10)(req, res, async (err: any) => {
    if (err) {
      return next(new CustomError(err.message, 400));
    }

    if (!req.files || req.files.length === 0) {
      return next(new CustomError('Please upload at least one image', 400));
    }

    try {
      const imageUrls: string[] = [];
      for (const file of req.files as Express.Multer.File[]) {
        const result: UploadApiResponse = await cloudinary.v2.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }

      req.body.photos = imageUrls;
    

      next();
    } catch (error) {
      return next(new CustomError((error as Error).message, 400));
    }
  });
};



export default uploadImages;