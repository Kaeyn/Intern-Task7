import { DTODataPermission } from "./DTODataPermission";

export class DTOAction{
    ListAction?: DTOAction[];
    ListDataPermission?: DTODataPermission[];
    ModuleName?: string;
    FunctionName?: string;
    ModuleID?: number;
    Code?: number;
    FunctionID?: number;
    ActionName?: string;
    TypeData?: number;
    ParentID?: number;
    IsVisible?: boolean;
    CreateBy?: string;
    CreateTime?: string;
    LastModifiedBy?: string;
    LastModifiedTime?: string;
    PermissionConf?: string;
}
  