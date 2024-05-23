export class DTODataPermission{
    Code?: number;
    StaffID?: number;
    RoleID?: number;
    ActionID?: number;
    DataPermission?: string;
    Remark?: string;
    Permitted?: boolean;
    ListSubFunction?: [];
    FunctionName?: string;
    ActionName?: string;
    FunctionID?: number;
    ListDataPermission?: DTODataPermission[];
    Company?: number;
}