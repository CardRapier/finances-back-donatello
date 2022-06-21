/* eslint-disable @typescript-eslint/no-var-requires */
const cloudinary = require('cloudinary').v2;

import { MulterFile } from '@webundsoehne/nest-fastify-file-upload/dist/interfaces/multer-options.interface';
import bufferToDataUrl from 'buffer-to-data-url';

export class FileUtils {
  public static async uploadFile(file: MulterFile) {
    return await this.upload(file, {
      folder: 'finances-donatello',
    });
  }

  public static async upload(file: MulterFile, options: any) {
    const base64 = await this.convertFileToBase64(file);
    return await cloudinary.uploader.upload(base64, options);
  }

  public static async convertFileToBase64(file: MulterFile) {
    return await bufferToDataUrl(file.mimetype, file.buffer);
  }
}
