import axios, { isAxiosError } from 'axios'
import { ApiService } from './api'
import { getAuthHeaders } from '@/utils/get-auth-headers'

type FileUploadResponse = {
  data: Array<FileUploadType>
}

type FileUploadType = {
  id: string
  name: string
  upload_url: string
  url: string
}

export type UploadedFile = {
  id: string
  name: string
  upload_url: string
  url: string
  mime_type: string
  size: number
}

export class FileUpload {
  readonly files: ReadonlyArray<File>
  private readonly uploadedFiles: Array<UploadedFile> = []

  constructor(files: ReadonlyArray<File>) {
    this.files = files
  }

  private async uploadApi() {
    try {
      const response = await ApiService.post<FileUploadType, true>({
        url: '/media/signed-url',
        payload: {
          total_files: this.files.length,
          file_types: this.files.map((file) => file.type),
        },
        config: {
          headers: getAuthHeaders(),
        },
      })
      return response.data
    } catch (error) {
      console.error('Error uploading files:', error)
      throw error
    }
  }

  private async uploadFilesToR2(callbackResponse: FileUploadResponse['data']) {
    try {
      await Promise.all(
        callbackResponse.map(async (fileData, index) => {
          const file = this.files[index]
          await axios.put(fileData.upload_url, file, {
            headers: { 'Content-Type': file.type },
          })

          this.uploadedFiles.push({
            name: file.name,
            url: fileData.url,
            id: fileData.id,
            mime_type: file.type,
            size: file.size,
            upload_url: fileData.upload_url,
          })
        }),
      )
    } catch (error) {
      console.error('Error uploading files to R2:', error)
      throw error
    }
  }

  private async updateFileUploadStatus() {
    try {
      await ApiService.patch({
        url: '/media/status/uploaded',
        payload: {
          medias: this.uploadedFiles.map((file) => {
            return {
              id: file.id,
              mime_type: file.mime_type,
              size: file.size,
              status: 'UPLOADED',
            }
          }),
        },
        config: {
          headers: getAuthHeaders(),
        },
      })
    } catch (error) {
      console.error('Error updating file upload status:', error)
      throw error
    }
  }

  async upload() {
    try {
      const response = await this.uploadApi()
      await this.uploadFilesToR2(response)
      await this.updateFileUploadStatus()

      return this.uploadedFiles
    } catch (error) {
      if (isAxiosError(error)) {
        console.error('Axios error uploading files:', error.message)
      } else if (error instanceof Error) {
        console.error('Error uploading files:', error.message)
      } else {
        console.log(error)
      }
    }
  }
}
