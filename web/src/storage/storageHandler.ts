import { ImageStorageInput } from ".";

export type UploadResponse = {
  id: string;
  path: string;
  fullPath: string;
} | null;

export abstract class StorageHandler {
  constructor() {}

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;

  abstract uploadImage({
    file,
    type,
    entityId,
  }: ImageStorageInput): Promise<UploadResponse>;
}
