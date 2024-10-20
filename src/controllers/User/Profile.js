import { StatusCode } from "../../lib/utils/index.js"
import UserModel from "../../models/User.js"


const getProfile = async (req, res) => {
	try {

		const userData = await UserModel.aggregate([
			{
				$match: {
					_id: new Types.ObjectId(req.user._id)
				}
			},
			{
				$project: {
					password: 0,
					createdOn: 0,
					isDeleted: 0,
					__v: 0
				}
			}
		])

		userData.length !== 0 ?
			res.status(StatusCode.SUCCESS).json({
				status: true,
				message: "User Profile Fetched Successfully",
				data: userData[0]
			}) :
			res.status(StatusCode.NOT_FOUND_ERROR).json({
				status: false,
				message: "User Not Found!"
			})

	} catch (error) {
		res.status(StatusCode.SERVER_ERROR).json({
			status: false,
			message: "Server Error!",
			error
		})
	}
}

const UserProfileController = {
    getProfile
}

export default UserProfileController