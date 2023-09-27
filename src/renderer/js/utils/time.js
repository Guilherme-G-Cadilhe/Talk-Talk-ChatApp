import { Timestamp } from "../db/firestore";

export const createTimestamp = () => Timestamp.now().toMillis().toString();
