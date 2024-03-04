import { type UserInterface } from "../interfaces/user.inteface"

interface InitialUserInterface {
    user: UserInterface | undefined
}

export const initialUser: InitialUserInterface = {
    user: undefined,
}