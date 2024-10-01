import { getImageMime } from 'base64-image-mime';
import { v4 as uuidv4 } from 'uuid';

import { writeFileSync } from "fs";

export enum FileExtension {
    'image/png' = 'png',
    'image/jpeg' = 'jpeg',
    'image/webp' = 'webp',
}

export type mimeType = 'image/png' | 'image/jpeg' | 'image/webp'
interface StoreImageResponse {
    filename: string
    path: string
    mimeType: mimeType,
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
        mimeType: imageMime,
        extension,
    }
}

export function validateType(image: string) {
    const imageMime = getImageMime(image)
    return Object.values(FileExtension).includes(FileExtension[imageMime])
}