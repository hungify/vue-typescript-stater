export const isImageFile = (file: File) => {
  return new Promise<{
    success: boolean
  }>((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', function (event) {
      const img = new Image()

      img.addEventListener('load', function () {
        if (img.width > 0 && img.height > 0) {
          resolve({
            success: true,
          })
        } else {
          resolve({
            success: false,
          })
        }
      })

      img.addEventListener('error', function () {
        resolve({
          success: false,
        })
      })

      img.src = event.target?.result as string
    })

    reader.addEventListener('error', function () {
      reject(new Error('Failed to read the file'))
    })

    reader.readAsDataURL(file)
  })
}
