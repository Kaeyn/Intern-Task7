import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { plusIcon, importIcon, exportIcon, filterIcon, searchIcon, moreHorizontalIcon, pencilIcon, eyeIcon, trackChangesEnableIcon, trackChangesRejectIcon, undoIcon, redoIcon, checkOutlineIcon, minusOutlineIcon, trashIcon, xIcon, SVGIcon, inheritedIcon, groupCollectionIcon, shareIcon } from '@progress/kendo-svg-icons';
import { DTOAuthorCompany } from './dtos/DTOAuthorCompany';
import { CompanyData } from './data/companyData';
import { DTODepartment } from './dtos/DTODepartment';
import { DepartmentData } from './data/departmentData';
import { DTORole } from './dtos/DTORole';
import { DropDownData } from './data/dropdownData';
import { DTOSubSystem } from './dtos/DTOSubSystem';
import { SubSystemData } from './data/subSystemData';
import { SubSystemDataModule } from './data/subSystemDataModule';
import { SupervisorRoleData } from './data/supervisorRoleData';
import { Observable, of } from 'rxjs';
import { data } from 'jquery';

@Component({
  selector: 'app-config001-authorization',
  templateUrl: './config001-authorization.component.html',
  styleUrls: ['./config001-authorization.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Config001AuthorizationComponent {
  constructor(private cdr: ChangeDetectorRef) { }
  breadCrumpItems: BreadCrumbItem[] = [
    { text: 'QUẢN TRỊ HỆ THỐNG' },
    { text: 'VAI TRÒ' }
  ]
  icons = { plusIcon, importIcon, exportIcon, filterIcon, searchIcon, moreHorizontalIcon, pencilIcon, eyeIcon, trackChangesEnableIcon, trackChangesRejectIcon, redoIcon, checkOutlineIcon, minusOutlineIcon, trashIcon, undoIcon, xIcon, inheritedIcon, groupCollectionIcon, shareIcon }

  defaultCompanyDropDownValue: DTOAuthorCompany = { Bieft: '-- Chọn --', Code: null }
  defaultSubsystemDropDownValue: DTOSubSystem = { Vietnamese: 'Tất cả', Code: null }


  companyList: DTOAuthorCompany[] = CompanyData;
  departmentList: DTODepartment[] = DepartmentData;
  roleDropdownList: DTORole[] = DropDownData;
  subSystemList: DTOSubSystem[] = [this.defaultSubsystemDropDownValue, ...SubSystemData];
  moduleSubsystemList: DTOSubSystem[] = SubSystemDataModule;
  supervisorRoleList: DTORole[] = SupervisorRoleData;

  initiallyExpanded: boolean = true;

  columnList: any[] = []
  dropDownSelectedSubSystem : DTOSubSystem = this.subSystemList[0];
  dropDownSelectedRoles : DTORole[] = []
  dropDownSelectedDepartment: DTODepartment[] = []
  selectedRoles : DTORole[] = []

  handleCompanyDropDownFilter(term: string) {
    this.companyList = CompanyData.filter(
      (s) => s.Bieft.toLowerCase().indexOf(term.toLowerCase()) !== -1
    );
  }

  onCompanySelect(value: DTOAuthorCompany) {
    this.dropDownSelectedDepartment = []
    this.dropDownSelectedRoles = []
    this.selectedRoles = []
    this.columnList = []
    this.dropDownSelectedSubSystem = this.subSystemList[0];
    this.departmentList = DepartmentData.filter((department) => department.Company == value.Code)
    this.roleDropdownList = DropDownData.filter((data) => data.Company == value.Code)
  }

  onSubsystemSelect(value: any) {
    this.initiallyExpanded = true;
    if (value.Vietnamese && value.Vietnamese == 'Tất cả') {
      this.moduleSubsystemList = SubSystemDataModule
    }
    else {
      const nullcheck = this.getListSubSystemDataModuleByID(value, SubSystemDataModule)
      if(nullcheck){
        this.moduleSubsystemList = [this.getListSubSystemDataModuleByID(value, SubSystemDataModule)]
      }else{
        this.moduleSubsystemList = null
      }
    }
  }

  getListSubSystemDataModuleByID(object: any, list: any[]): any {
    for (let module of list) {
      if (module.Code == object.Code) {
        return module;
      }

      if (module.ListGroup) {
        const result = this.getListSubSystemDataModuleByID(object, module.ListGroup);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }


  onDepartmentSelect(value: DTODepartment[]) {
    this.initiallyExpanded = false
    let selectedRole: DTORole[] = [];
    value.forEach(department => {
      let positionList = department.ListPosition;
      positionList.forEach(position => {
        if (position.ListOfRoles) {
          const jsonList = JSON.parse(position.ListOfRoles);
          jsonList.forEach((role: any) => {
            if (typeof role == 'number') {
              const roleObject = DropDownData.find((data) => data.Code == role)

              if (roleObject && !selectedRole.some((obj) => obj.Code === roleObject.Code)) {
                selectedRole.push(roleObject);
              }
            }
          });
        }
      });
    });
    this.selectedRoles = selectedRole
    this.dropDownSelectedRoles = [];
    this.filterRoleDropDown(this.selectedRoles)
    const combinedList = [...this.selectedRoles, ...this.dropDownSelectedRoles];
    this.generateColumns(combinedList)
    // this.filterRoleDropDown(selectedRole)
    // const element = document.body as HTMLElement;
    // if (element) {
    //   const kendoPopup = element.querySelector('kendo-popup') as HTMLElement;

    //   if (kendoPopup) {
    //     const selected = kendoPopup.querySelectorAll('.k-treeview-mid');
    //     selected.forEach(element => {
    //       const toggle = element.querySelector('.k-treeview-toggle');
    //       const leaf = element.querySelector('.k-treeview-leaf');
    //       // if (toggle && left) {
    //       //   if (left.classList.contains('k-selected')) {
    //       //     const parentMid = element.parentElement;
    //       //     if (parentMid) {
    //       //       parentMid.classList.add('actived');
    //       //     }
    //       //   }
    //       // }
    //       if (toggle && leaf) {
    //         if (leaf.classList.contains('k-selected')) {           
    //             toggle.classList.add('actived');           
    //         }
    //       }
    //     });
    //   }
    // }
  }

  onSubSystemOpen(){
    this.initiallyExpanded = false
    
  }

  onRoleDropDownSelect(value: DTORole[]){
    // console.log(value)
    // value.forEach(element => {
    //   if(element.Code){
    //     const foundedRole = this.selectedRoles.findIndex((item) => item.Code == element.Code);
    //     if(foundedRole == -1){
    //       this.selectedRoles.push(element);
    //     }
    //   }
    // });
    const combinedList = [...this.selectedRoles, ...this.dropDownSelectedRoles];
    this.generateColumns(combinedList)
  }

  filterSubSystem(searchTerm : string){
    console.log(searchTerm)
    const nullcheck = this.getListFilterSubSystemDataModuleByTerm(searchTerm, SubSystemData)

      if(nullcheck){
        this.subSystemList = [this.getListFilterSubSystemDataModuleByTerm(searchTerm, SubSystemData)]

      }else{
        this.subSystemList = []
      }
  }

  getListFilterSubSystemDataModuleByTerm(term: string, list: any[]): any {
    for (let module of list) {
      if (module.Vietnamese.toLowerCase() == term.toLowerCase()) {
        
        return module;
      }

      if (module.ListGroup?.length >0) {
        const result = this.getListFilterSubSystemDataModuleByTerm(term, module.ListGroup);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  filterRoleDropDown(value: DTORole[]) {
    const codesToExclude = value.map(role => role.Code);
    this.roleDropdownList = DropDownData.filter((data) => !codesToExclude.includes(data.Code));
  }

  searchRoleDropDown(term :string){
    this.roleDropdownList = DropDownData.filter(
      (s) => s.RoleName.toLowerCase().indexOf(term.toLowerCase()) !== -1
    );
  }

  hasSubSystemChildren = (item: any) : boolean =>{
    return item.ListGroup?.length > 0
  }

  public fetchSubSystemChildren = (item: any): Observable<any[]> => {
    if (item.ListGroup) return of(item.ListGroup);

    return of([]);
  };

  public hasChildren = (item: any): boolean => {
    // if (item.ListGroup?.length > 0 || item.ListFunctions?.length > 0 || item.ListAction?.length > 0) {
    //   return true
    // }
    return item.ListGroup?.length > 0 || item.ListFunctions?.length > 0 || item.ListAction?.length > 0
  };

  public fetchChildren = (item: any): Observable<any[]> => {
    if (item.ListAction) return of(item.ListAction);

    else if (item.ListFunctions) return of(item.ListFunctions);

    else if (item.ListGroup) return of(item.ListGroup);

    return of([]);
  };

  generateColumns(data: DTORole[]) {
    let columns: any[] = [];
    data.forEach(role => {
      columns.push({ RoleName: role.RoleName, RoleID: role.RoleID, RoleCode: role.Code })
    });

    this.columnList = columns;
    this.initiallyExpanded = true;
  }

  inputCheckedCheck(ListOfRoles: DTORole[], checkedRoleID: number) : boolean {
    if(ListOfRoles){
      for(let role of ListOfRoles){
        if(role.RoleID.toString() == checkedRoleID.toString()){
          return true;
        }
      }
    }
    return false;
  }

  // onMultiSelectTreeOpen() {
  //   const element = document.body as HTMLElement;
  //   if (element) {
  //     const kendoPopup = element.querySelector('kendo-popup') as HTMLElement;

  //     if (kendoPopup) {
  //       const selected = kendoPopup.querySelectorAll('.k-treeview-item');
  //       selected.forEach(element => {
  //         if (element.ariaChecked == 'true') { element.classList.add('actived') }
  //       });
  //     }
  //   }
  // }
}