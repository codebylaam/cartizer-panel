import axios from 'axios'

import { ApiService } from '@/services/api'

export type SignedUrlResponse = {
  name: string
  upload_url: string
  url: string
}

export type FileItem = {
  id: string
  name: string
  url: string
  mime_type: string
}

/**
 * Fetch a presigned S3/R2 URL for a given filename from the backend.
 */
export async function getSignedUrl(
  fileName: string,
): Promise<SignedUrlResponse> {
  const response = await ApiService.get<SignedUrlResponse>({
    url: `/upload/signed-url/${encodeURIComponent(fileName)}`,
  })

  const res = response as unknown as { data?: SignedUrlResponse }
  return res.data ?? (response as unknown as SignedUrlResponse)
}

/**
 * Upload a file directly to the S3/R2 presigned URL via HTTP PUT.
 */
export async function uploadFileToPresignedUrl(
  uploadUrl: string,
  file: File,
  onProgress?: (percent: number) => void,
): Promise<void> {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        )
        onProgress(percent)
      }
    },
  })
}
