import { useTranslation } from "react-i18next"
import { useState } from "react"
import { FileIcon, WarningIcon, XIcon } from "@phosphor-icons/react"
import { FileInput } from "@astryxdesign/core/FileInput"
import { VStack } from "@astryxdesign/core/VStack"
import { List, ListItem } from "@astryxdesign/core/List"
import { Thumbnail } from "@astryxdesign/core/Thumbnail"
import { IconButton } from "@astryxdesign/core/IconButton"
import { Spinner } from "@astryxdesign/core/Spinner"
import { Icon } from "@astryxdesign/core/Icon"

import { useFieldContext } from "./field-context"
import type { FileItem } from "@/services/uploader"

export type GenericFileUploaderProps = {
  label?: string
  description?: string
  isRequired?: boolean
  accept?: string
  multiple?: boolean
  isDisabled?: boolean
  maxSizeMB?: number
  id?: string
}

type UploadingFile = {
  tempId: string
  file: File
  progress: number
  error?: string
}

const imageMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
]

export function GenericFileUploader({
  label,
  description,
  isRequired,
  accept,
  multiple = true,
  isDisabled = false,
  maxSizeMB,
  id,
}: GenericFileUploaderProps) {
  const { t } = useTranslation()
  const fileUploadServerFn = async ({ data }: { data: FormData }) => {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: data,
    })

    if (!response.ok) {
      throw new Error(t("form_global.file_upload.upload_failed"))
    }

    const result = await response.json()
    return result.files as Array<FileItem>
  }
  const field = useFieldContext<Array<FileItem>>()

  const [uploadingFiles, setUploadingFiles] = useState<Array<UploadingFile>>([])

  const fileList: Array<FileItem> = Array.isArray(field.state.value)
    ? field.state.value
    : []

  const error = field.state.meta.errors.at(0)

  const handleFiles = async (files: Array<File>) => {
    if (isDisabled || files.length === 0) return

    const validFiles: Array<File> = []

    for (const file of files) {
      if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
        alert(
          t("form_global.file_upload.file_exceeds_max_size", {
            name: file.name,
            maxSizeMB,
          }),
        )
        continue
      }
      validFiles.push(file)
    }

    if (validFiles.length === 0) return

    // Prepare initial uploading states
    const newUploadingEntries: Array<UploadingFile> = validFiles.map(
      (file) => ({
        tempId: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        progress: 0,
      }),
    )

    setUploadingFiles((prev) => [...prev, ...newUploadingEntries])

    try {
      const formData = new FormData()
      validFiles.forEach((file) => formData.append("files[]", file))

      const uploadedFiles = await fileUploadServerFn({ data: formData })

      if (uploadedFiles && uploadedFiles.length > 0) {
        const newItems: Array<FileItem> = uploadedFiles.map((file) => ({
          id: file.id,
          name: file.name,
          url: file.url,
          mime_type: file.mime_type,
        }))

        field.setValue((prev) => {
          const current = Array.isArray(prev) ? prev : []
          return [...current, ...newItems]
        })

        // Remove uploaded files from uploading list
        setUploadingFiles((prev) =>
          prev.filter(
            (item) =>
              !newUploadingEntries.some((e) => e.tempId === item.tempId),
          ),
        )
      } else {
        throw new Error(t("form_global.file_upload.upload_failed"))
      }
    } catch (err) {
      console.error("Failed to upload files:", err)
      const errorMessage =
        err instanceof Error
          ? err.message
          : t("form_global.file_upload.upload_failed")
      setUploadingFiles((prev) =>
        prev.map((item) =>
          newUploadingEntries.some((e) => e.tempId === item.tempId)
            ? { ...item, error: errorMessage, progress: 0 }
            : item,
        ),
      )
    }
  }

  const handleRemoveUploaded = (idToRemove: string) => {
    field.setValue((prev) => {
      const current = Array.isArray(prev) ? prev : []
      return current.filter((item) => item.id !== idToRemove)
    })
  }

  const handleCancelUploading = (tempId: string) => {
    setUploadingFiles((prev) => prev.filter((item) => item.tempId !== tempId))
  }

  const formattedAccept = accept
    ? t(`form_global.file_upload.${accept}`, { defaultValue: accept })
    : undefined

  const defaultDescription = formattedAccept
    ? t("form_global.file_upload.allowed_formats", {
        formats: formattedAccept,
        0: formattedAccept,
      })
    : t("form_global.file_upload.upload_images_or_documents")
  const computedDescription =
    (description ? description + " " : "") +
    defaultDescription +
    (maxSizeMB
      ? ` ${t("form_global.file_upload.maximum_file_size", {
          0: maxSizeMB,
          maxSizeMB,
        })}`
      : "")

  return (
    <VStack gap={3}>
      <FileInput
        id={id}
        label={label || t("form_global.file_upload.click_to_upload")}
        description={computedDescription}
        isRequired={isRequired}
        isDisabled={isDisabled}
        accept={accept}
        isMultiple={multiple}
        maxSize={maxSizeMB ? maxSizeMB * 1024 * 1024 : undefined}
        mode="dropzone"
        value={null}
        onChange={(val) => {
          if (!val) return
          const selectedFiles = Array.isArray(val) ? val : [val]
          handleFiles(selectedFiles)
        }}
        status={
          error
            ? {
                type: "error",
                message: typeof error === "string" ? error : t(error.message),
              }
            : undefined
        }
      />

      {(fileList.length > 0 || uploadingFiles.length > 0) && (
        <List>
          {/* Completed uploaded files */}
          {fileList.map((fileItem) => {
            const isImg = imageMimeTypes.includes(fileItem.mime_type)
            return (
              <ListItem
                key={fileItem.id}
                label={fileItem.name}
                description={fileItem.id}
                startContent={
                  isImg ? (
                    <Thumbnail
                      src={fileItem.url}
                      alt={fileItem.name}
                      label={fileItem.name}
                    />
                  ) : (
                    <Icon icon={FileIcon} size="md" />
                  )
                }
                endContent={
                  <IconButton
                    label={t("form_global.file_upload.remove_file")}
                    variant="ghost"
                    size="sm"
                    icon={<XIcon size={20} />}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveUploaded(fileItem.id)
                    }}
                  />
                }
              />
            )
          })}

          {/* Files currently uploading or errored */}
          {uploadingFiles.map((item) => (
            <ListItem
              key={item.tempId}
              label={item.file.name}
              description={
                item.error
                  ? item.error
                  : t("form_global.file_upload.uploading", {
                      progress: item.progress,
                    })
              }
              startContent={
                item.error ? (
                  <Icon icon={WarningIcon} color="error" size="md" />
                ) : (
                  <Spinner size="sm" />
                )
              }
              endContent={
                <IconButton
                  label={t("form_global.file_upload.cancel_upload")}
                  variant="ghost"
                  size="sm"
                  icon={<XIcon size={20} />}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCancelUploading(item.tempId)
                  }}
                />
              }
            />
          ))}
        </List>
      )}
    </VStack>
  )
}
