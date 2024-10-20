
import { pushOnBucket } from "../../lib/utils/Bucket.js"
import { StatusCode } from "../../lib/utils/index.js"



const fileUpload = async (req, res) => {
    try {

        if (req.file) {

            const id = req.user._id
            const type = req.file.mimetype.split('/')
            const fileName = `${Date.now()}.${type[1]}`
            const directory = `${id}/${type[0]}/${fileName}`

            await pushOnBucket(req.file, directory)

            const url = `${process.env.DIGITALOCEAN_SPACES_URL}/${directory}`

            res.status(StatusCode.SUCCESS).json({
                status: true,
                massage: "File Uploaded Successfully.",
                data: {
                    url
                }
            })

        } else {
            res.status(StatusCode.NOT_FOUND_ERROR).json({
                status: false,
                massage: "File or Not Found!"
            })
        }

    } catch (error) {

        res.status(StatusCode.SERVER_ERROR).json({
            status: false,
            massage: "server Error..!",
            error
        })
    }
}

const UploadController = {
    fileUpload
}

export default UploadController
