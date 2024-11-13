export enum USER_ROLES {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    READER = "READER",
    CLIENT = "CLIENT"
}

export type UserRolesType = USER_ROLES.ADMIN | USER_ROLES.CLIENT | USER_ROLES.READER | USER_ROLES.SUPER_ADMIN


export const JWT_SECRET = process.env.JWT_SECRET || "123"