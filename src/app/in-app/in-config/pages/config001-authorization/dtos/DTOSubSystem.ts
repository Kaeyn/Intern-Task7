import { SVGIcon } from "@progress/kendo-svg-icons";
import { DTOFunction } from "./DTOFunction";

export class DTOSubSystem {
    ListGroup?: DTOSubSystem[];
    ListFunctions?: DTOFunction[];
    ListAPI?: [];
    Company?: number;
    Code?: number;
    ProductID?: number;
    ModuleID?: string;
    Vietnamese?: string;
    English?: string;
    Japanese?: string;
    Chinese?: string;
    OrderBy?: number;
    GroupID?: number;
    IsVisible?: boolean;
    TypeData?: number;
    ImageSetting?: string;
    Icon?: SVGIcon;
}