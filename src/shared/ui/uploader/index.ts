import { Upload, type UploadProps } from './Upload';
import { UploadAddButton } from './UploadAddButton';
import { UploadPreviews } from './UploadPreviews';

export const Root = Upload;
export type RootProps = UploadProps;

export const AddButton = UploadAddButton;
export const Previews = UploadPreviews;
export { FilePreview } from './FilePreview';

export * as Uploader from './'