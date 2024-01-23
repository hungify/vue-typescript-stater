export const isImageFile = (file: File) => {
  return new Promise<{
    success: boolean
  }>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (event) {
      const img = new Image()

      img.onload = function () {
        if (img.width > 0 && img.height > 0) {
          resolve({
            success: true,
          })
        } else {
          resolve({
            success: false,
          })
        }
      }

      img.onerror = function () {
        resolve({
          success: false,
        })
      }
      img.src = event.target?.result as string
    }

    reader.onerror = function () {
      reject(new Error('Failed to read the file'))
    }

    reader.readAsDataURL(file)
  })
}
