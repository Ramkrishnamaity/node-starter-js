import jwt from "jsonwebtoken"


export const StatusCode = {
	SUCCESS: 200,
	VALIDATION_ERROR: 422,
	SERVER_ERROR: 500,
	DUPLICATE_KEY_ERROR: 409,
	BAD_REQUEST: 400,
	AUTH_ERROR: 401,
	NOT_FOUND_ERROR: 404,
	TOKEN_EXPIRE: 419
}

export const CreateToken = (payload, expiresIn = '1d') => {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
}

export const InputValidator = async (input, rules) => {
	return new Promise((resolve, reject) => {
		const v = new Validator(input, rules)
		v.check()
			.then((match) => {
				if (!match) {
					const error = (Object.values(v.errors)[0]).message
					reject(error)
				} else {
					resolve()
				}
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export const MailSender = async (email, title, body) => {
	try {

		const host = process.env.MAIL_HOST
		const user = process.env.MAIL_USER
		const pass = process.env.MAIL_PASS

		const configOptions = {
			host: host,
			port: 465,
			secure: true,
			auth: {
				user: user,
				pass: pass
			}
		}
		const transporter = createTransport(configOptions)
		await transporter.sendMail({
			from: "Project ORG.",
			to: `${email}`,
			subject: `${title}`,
			html: `${body}`
		})
		return true
	} catch (error) {
		console.log("Error in Mail Send: ", error)
		return false
	}
}