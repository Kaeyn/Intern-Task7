import { DTOPosition } from "./DTOPosition";

export class DTODepartment{
    StatusName?: string;
    ParentCode?: string;
    ListLocationCode?: [];
    ListLocation?: [];
    ListDepartment?: DTODepartment[];
    ListPosition ?: DTOPosition[];
    IsTree?: boolean;
    Company?: number;
    Code?: number;
    ParentID?: number;
    DepartmentID?: string;
    Department?: string;
    Brieft?: string;
    Phone?: string;
    Fax?: string;
    Remark?: string;
    Config?: string;
    TypeData?: number;
    OrderBy?: number;
    StatusID?: number;
}