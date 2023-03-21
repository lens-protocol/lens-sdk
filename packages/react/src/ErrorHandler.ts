/**
 * A function that handles an error.
 */
export type ErrorHandler<T extends Error> = (error: T) => void;
