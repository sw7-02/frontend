import { persistentWritable } from "./localStorage";

export const courseIdStore = persistentWritable("courseId", null); // You can replace null with the default value you want
export const sessionIdStore = persistentWritable("sessionId", null); // You can replace null with the default value you want
export const taskIdStore = persistentWritable("taskId", null); // You can replace null with the default value you want
