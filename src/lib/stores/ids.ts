import { persistentWritable } from "./localStorage";

export const courseIdStore = persistentWritable<number | null>(
    "courseId",
    null
);
export const sessionIdStore = persistentWritable<number | null>(
    "sessionId",
    null
);
export const taskIdStore = persistentWritable<number | null>("taskId", null);
