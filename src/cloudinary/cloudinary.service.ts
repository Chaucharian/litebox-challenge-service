import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config'; 
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('cloudinary.cloudName'),
      api_key: this.configService.get<string>('cloudinary.apiKey'),
      api_secret: this.configService.get<string>('cloudinary.apiSecret'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);

    // Return a promise that resolves with the secure URL
    return new Promise((resolve, reject) => {
      stream.pipe(
        cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject(new Error('Image upload to Cloudinary failed: ' + error.message));
            } else {
              resolve(result.secure_url); 
            }
          }
        )
      );
    });
  }
}
