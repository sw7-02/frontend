export enum Role {
    STUDENT = 0,
    TEACHER = 1,
    TA = 2,
}

export type _CourseOverview = {
    course_id: number;
    title: string;
    user_role: Role;
}[];

export type _CourseFull = {
    course_id: number;
    title: string;
    sessions: _Session[];
};

type _Session = {
    session_id: number;
    title: string;
    exercises: _ExerciseIdentifier[];
};

type _ExerciseIdentifier = {
    title: string;
    exercise_id: number;
};

export type _Leaderboard = {
    username: string;
    total_points: number;
}[];

export type _Exercise = {
    exercise_id: number;
    title: string;
    description: string;
    code_template: string;
    programming_language: string;
    points: number;
    hints: string[];
    test_cases: string[];
    examples: { input: string; output: string }[];
};
