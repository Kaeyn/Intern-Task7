import { DTODataPermission } from "./DTODataPermission";

export class DTOSubFunction{
    IsSelected?: boolean;
    ListDataPermission?: DTODataPermission[];
    Code?: number;
    DataID?: string;
    DataName?: string;
    DataDescription?: string;
    TypeData?: number;
    FunctionID?: number;
    OrderBy?: number;
    TypePopup?: number;
    Config?: string;
    DataPermission?: DTODataPermission;
    ReportConfig?: string;
}