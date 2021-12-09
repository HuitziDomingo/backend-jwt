import Role from '../models/Role'

export const createRoles = async () => {
    try {
        let count = await Role.estimatedDocumentCount()

        if (count > 0) return;
        let values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderador' }).save(),
            new Role({ name: 'save' }).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }

}