export interface UpdateService<T> {
    success: boolean;
    code: number;
    data: T;
}