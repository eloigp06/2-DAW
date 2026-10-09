export interface UpdateService<T> {
    success: boolean;
    code: number;
    index: number;
    data: T;

}