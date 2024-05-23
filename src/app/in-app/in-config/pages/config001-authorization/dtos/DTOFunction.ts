import { SVGIcon } from "@progress/kendo-svg-icons";
import { DTOAction } from "./DTOAction";
import { DTODataPermission } from "./DTODataPermission";
import { DTOSubFunction } from "./DTOSubFunction";

export class DTOFunction{
    ListDataPermission?: DTODataPermission[];
    ListAction?: DTOAction[];
    ListSubFunction?: DTOSubFunction[];
    ModuleName?: string;
    Breadcrumb?: string;
    Code?: number;
    ModuleID?: number;
    Vietnamese?: string;
    English?: string;
    Japanese?: string;
    Chinese?: string;
    OrderBy?: number;
    Hotkey?: string;
    TypeData?: number;
    DLLPackage?: string;
    ImageSetting?: string;
    Icon?: SVGIcon;
    PermissionConf?: string;
}