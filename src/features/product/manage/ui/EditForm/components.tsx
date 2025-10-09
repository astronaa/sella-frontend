"use client";

import {
  VCheckbox,
  VImageUploader,
  VTextAreaControl,
  VTextControl,
  VUploader,
} from "~/shared/ui/validation-inputs";

import { SchemaType } from "../../api";
import { Product } from "~/shared/api/client";
import { HTMLAttributes, PropsWithChildren, useMemo } from "react";
import { Form, useField } from "react-final-form";
import { cn } from "~/shared/lib/cn";
import { IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { ValidationErrors } from "final-form";
import { Divider } from "~/shared/ui/kit/divider";
import { CategoryVTagsInput } from "~/entities/category";
import { toaster } from "~/shared/ui/toaster";

export interface RootProps extends PropsWithChildren {
  product: Product;
  onSubmit: (product: SchemaType) => void;
  validate: (values: SchemaType) => ValidationErrors;
}

export function Root({ product, onSubmit, validate, children }: RootProps) {
  const initialValues = useMemo(() => {
    const {
      previewImage: previewImageUrl,
      galleryImages: galleryImagesUrls,
      ...rest
    } = product;
    return { previewImageUrl, galleryImagesUrls, ...rest };
  }, [product]);

  return (
    <Form onSubmit={onSubmit} validate={validate} initialValues={initialValues}>
      {() => children}
    </Form>
  );
}

export function General({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const {
    input: { value: previewImageUrl },
  } = useField<string>("previewImageUrl");

  return (
    <div
      {...props}
      className={cn("flex flex-col w-full gap-[2rem]", className)}
    >
      <div className="flex gap-[2rem] w-full max-md:flex-col">
        <VImageUploader
          label="Attach Preview"
          name="previewImage"
          className="flex-shrink-0 size-[11.625rem] rounded-[1.25rem]"
          initialImageSrc={previewImageUrl ?? undefined}
        />
        <div className="flex flex-col justify-between max-md:gap-[1rem] w-full">
          <VTextControl.Root className="w-full" name="name">
            <VTextControl.LabelOrError>Product Name</VTextControl.LabelOrError>
            <VTextControl.Input placeholder="Enter product name" />
          </VTextControl.Root>

          <div className="flex gap-[2rem] w-full">
            <VTextControl.Root className="w-full" name="price">
              <VTextControl.Label>Product Price</VTextControl.Label>
              <VTextControl.Input
                type="number"
                min={1}
                step={0.01}
                placeholder="0 USDT"
              />
              <VTextAreaControl.ErrorText />
            </VTextControl.Root>
            <VTextControl.Root className="w-full" name="holdPeriod">
              <VTextControl.Label>Escrow (days)</VTextControl.Label>
              <VTextControl.Input
                type="number"
                min={1}
                step={1}
                max={60}
                placeholder="days"
              />
              <VTextAreaControl.ErrorText />
            </VTextControl.Root>
          </div>
        </div>
      </div>

      <VTextControl.Root name="tagNames">
        <VTextControl.Label>Categories</VTextControl.Label>
        <CategoryVTagsInput placeholder="Add category" />
        <VTextAreaControl.ErrorText />
      </VTextControl.Root>

      <Divider />
      <VTextControl.Root
        name="isFrozen"
        className="flex-row items-center justify-between"
      >
        <VTextControl.Label>Out of stock</VTextControl.Label>
        <VCheckbox>Hide from search and store</VCheckbox>
        <VTextAreaControl.ErrorText />
      </VTextControl.Root>
    </div>
  );
}

export function Description({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("flex flex-col w-full gap-[2rem]", className)}
    >
      <VTextControl.Root className="w-full" name="shortDescription">
        <VTextControl.LabelOrError>
          Product Description
        </VTextControl.LabelOrError>
        <VTextControl.Input placeholder="Let's make it short and sweet!" />
      </VTextControl.Root>

      <VTextAreaControl.Root className="w-full" name="description">
        <VTextAreaControl.LabelOrError>
          Full Description
        </VTextAreaControl.LabelOrError>
        <VTextAreaControl.Input
          className="h-[5rem]"
          placeholder="Can be one sentence, a short paragraph"
        />
      </VTextAreaControl.Root>

      <ImagesUploader />
    </div>
  );
}

function ImagesUploader() {
  const {
    input: { value: existingImages, onChange: setExistingImages },
  } = useField<string[]>("galleryImagesUrls");

  const {
    input: { value: pendingFiles },
  } = useField<File[]>("galleryImages");

  const {
    input: { value: previewImageUrl },
  } = useField<string | null>("previewImageUrl");

  const MAX_IMAGES = 5;
  const hasPreviewImage =
    previewImageUrl !== null && previewImageUrl !== undefined;
  const previewImageCount = hasPreviewImage ? 1 : 0;
  const galleryImageCount = existingImages.length + pendingFiles.length;
  const totalImageCount = previewImageCount + galleryImageCount;
  const remainingSlots = MAX_IMAGES - totalImageCount;

  return (
    <VUploader.Root
      name="galleryImages"
      multiple
      rootProps={{ className: "w-full" }}
      onBeforeAdd={(newFiles) => {
        // Calculate what the total would be after adding new files
        const totalAfterAdd = totalImageCount + newFiles.length;

        // Allow if we're within limits
        if (totalAfterAdd <= MAX_IMAGES) {
          return true;
        }

        // If we're at the limit and trying to add files, show helpful message
        if (totalImageCount === MAX_IMAGES) {
          const previewInfo = hasPreviewImage
            ? ` (including 1 preview image)`
            : "";

          toaster.error({
            title: `Maximum ${MAX_IMAGES} total images allowed per product`,
            description: `You currently have ${totalImageCount} images${previewInfo}. Remove some images first to add new ones.`,
          });
        } else {
          const previewInfo = hasPreviewImage
            ? ` (including 1 preview image)`
            : "";

          toaster.error({
            title: `Maximum ${MAX_IMAGES} total images allowed per product`,
            description: `You currently have ${totalImageCount} images${previewInfo}. You can only add ${remainingSlots} more gallery image${
              remainingSlots === 1 ? "" : "s"
            }.`,
          });
        }

        return false;
      }}
    >
      <VUploader.LabelOrError>
        Gallery Images ({galleryImageCount}/{MAX_IMAGES - previewImageCount})
      </VUploader.LabelOrError>

      <VUploader.Previews
        className="grid-cols-6"
        prevSlot={existingImages.map((imgUrl) => (
          <VUploader.FilePreview
            key={imgUrl}
            file={{ name: "image.jpg", url: imgUrl }}
            renderActionBar={
              <IconButton
                variant="action"
                size="xs"
                type="button"
                onClick={() =>
                  setExistingImages(existingImages.filter((i) => i !== imgUrl))
                }
              >
                <Icons.Close className="size-[1.25rem]" />
              </IconButton>
            }
          />
        ))}
      >
        <VUploader.AddButton />
      </VUploader.Previews>
    </VUploader.Root>
  );
}
