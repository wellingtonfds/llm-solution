import { getImageMime } from 'base64-image-mime';
import { v4 as uuidv4 } from 'uuid';

import { writeFileSync } from "fs";

export enum FileExtension {
    'image/png' = 'png',
    'image/jpeg' = 'jpeg',
    'image/gif' = 'gif',
    'image/svg+xml' = 'svg',
    'image/webp' = 'webp',
}
interface StoreImageResponse {
    filename: string
    path: string
    mime: string,
    extension: FileExtension,
}
export function storeImage(image: string): StoreImageResponse {

    const imageMime = getImageMime(image)
    const extension = FileExtension[imageMime]
    const filename = `${uuidv4()}.${extension}`
    const path = `src/storage/${filename}`
    const binaryImage = Buffer.from(image, 'base64')
    writeFileSync(path, binaryImage)
    return {
        filename,
        path,
        mime: imageMime,
        extension,
    }
}