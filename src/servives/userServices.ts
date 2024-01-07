import User, {UserType} from "../data/usersData";
import {cypher} from "./tokens";
import * as bcrypt from 'bcrypt'

export const UserOptions = {

    createUser: async (email: string, password: string, name: string, url?: string) => {
        try {
            const userDocument = new User({
                email: email,
                password: await cypher.cryptPassword(password),
                name: name,
                url: url
            })
            return [await userDocument.save(), cypher.createToken(email, password)]
        } catch (err) {
            console.log(err)
            return [false, false]
        }
    },

    findUser: async (email: string, password: string) => {

        const user = await User.findOne({email: email})

        console.log(user)

        if (!user) {
            return false
        }

        console.log(password, user.password)

        if (await bcrypt.compare(password, user.password)) {
            return user
        }

        return false

    },

    userAPI: (user: UserType) => {
        return {name: user.name, email: user.email, password: user.password, avatarURL: user.avatarURL}
    },
}