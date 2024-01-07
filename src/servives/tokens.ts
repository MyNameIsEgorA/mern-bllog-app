import * as jwt from 'jsonwebtoken'
import * as bcrypt from "bcrypt"

export const cypher = {

    createToken: (log: string, pass: string): string => {
        return jwt.sign({
                login: log,
                password: pass
            }, 'secret'
        )
    },

    cryptPassword: async (password: string): Promise<string> => {
        const salt: string = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }
}
