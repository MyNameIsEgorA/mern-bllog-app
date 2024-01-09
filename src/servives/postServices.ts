import Post from '../data/blogsData'
import mongoose from "mongoose";

export const PostOptions = {

    createPost: async (title: string, text: string, tags: string, imageURL: string, userID: string) => {

        const tagsToArray = tags.split(' ')

        try {
            const doc = new Post({
                title: title,
                text: text,
                imageURL: imageURL,
                tags: tagsToArray,
                author: userID,
            })

            const post = await doc.save()

            if (post) {
                return post
            }

            return false

        } catch (err) {
            console.log(err)
            return false
        }
    },

    findAllPosts: async () => {
        try {
            const result = await Post.find().populate("author").exec()
            if (result) {
                return result
            }

            return false
        } catch (err) {
            console.log(err)
        }
    },

    findPostById: async (id: string) => {
        try {
            const doc: mongoose.Document | null = await Post.findOneAndUpdate(
                {_id: id},
                {$inc: {viewsCount: 1}},
                {new: true},
            )

            if (!doc) {
                return false
            }

            return await doc.save()

        } catch (err) {
            console.log(err)
            return false
        }
    },

    deleteById: async (id: string) => {
        try {
            await Post.findOneAndDelete({_id: id})

            return true

        } catch (err) {
            console.log(err)
            return false
        }

    },

    updatePost: async (id: string, title: string, text: string, tags: string, imageURL: string, userID: string) => {

        const tagsToArray = tags.split(' ')

        try {
            await Post.updateOne({_id: id},
                {
                    title: title,
                    text: text,
                    imageURL: imageURL,
                    tags: tagsToArray,
                    author: userID,
                })
            return true
        }
        catch(err) {
            console.log(err)
            return false
            }
        },
    }