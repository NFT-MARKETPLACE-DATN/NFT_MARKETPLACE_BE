export class BaseResponse {
    success: boolean;
    message: string;
    message_code: number;
}

export class GenericBaseResponse<T> extends BaseResponse{
    data: T | null
}
export class UserBalance extends BaseResponse{
    balance:number | null;
}