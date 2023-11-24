import { writable } from "svelte/store";

type Jwt_auth = {
    jwt_token: string;
};

type Is_teacher_auth = {
    is_teacher: boolean;
};

type User_role = {
    user_role: number;
};

export const jwtAuth = writable<Jwt_auth>({
    jwt_token: "",
});

export const teacherAuth = writable<Is_teacher_auth>({
    is_teacher: false,
});

export const userRole = writable<User_role>({
    user_role: 0,
});