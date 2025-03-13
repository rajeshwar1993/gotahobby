import { ImageStorageInput } from ".";

export type UploadResponse = {
  id: string;
  path: string;
  fullPath: string;
};

export abstract class StorageHandler {
  constructor() {}

  abstract uploadImage({
    file,
    pictureType,
    entityId,
  }: ImageStorageInput): Promise<UploadResponse>;

  abstract getPublicImageURL(path: string): Promise<string>;
}
