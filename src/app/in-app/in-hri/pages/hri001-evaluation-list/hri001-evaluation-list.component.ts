import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { plusIcon, importIcon, exportIcon, filterIcon, searchIcon, moreHorizontalIcon, pencilIcon, eyeIcon, trackChangesEnableIcon, trackChangesRejectIcon, undoIcon, redoIcon, checkOutlineIcon, minusOutlineIcon, trashIcon, xIcon,SVGIcon } from '@progress/kendo-svg-icons';
import { DTOEvaluationSession } from '../shared/dtos/DTOEvaluationSession.dto';
import { EvaluationData } from './test-data/EvaluationData';
import { Align, Collision } from '@progress/kendo-angular-popup';
import { GridComponent, PagerPageSizesComponent, RowArgs, SelectionEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';
@Component({
  selector: 'app-hri001-evaluation-list',
  templateUrl: './hri001-evaluation-list.component.html',
  styleUrls: ['./hri001-evaluation-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Hri001EvaluationListComponent implements OnInit, AfterViewInit {
  @ViewChild('pageSize') pager: PagerPageSizesComponent;
  @ViewChild('grid') grid: GridComponent;

  constructor(private renderer: Renderer2) { }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.applyFilter();
  }


  filterValue: CompositeFilterDescriptor = { logic: "and", filters: [] };
  searchTerm: string = '';
  startDate: Date = null;
  endDate: Date = null;
  loadingState: boolean = false;

  public collision: Collision = { horizontal: 'flip', vertical: 'fit' };
  anchorAlign: Align = { horizontal: "left", vertical: "top" };
  popupAlign: Align = { horizontal: "right", vertical: "top" };

  icons = { plusIcon, importIcon, exportIcon, filterIcon, searchIcon, moreHorizontalIcon, pencilIcon, eyeIcon, trackChangesEnableIcon, trackChangesRejectIcon, redoIcon, checkOutlineIcon, minusOutlineIcon, trashIcon, undoIcon, xIcon }
  statusButtons = [
    { id: 0, text: 'Đang soạn thảo', actived: true },
    { id: 1, text: 'Gửi duyệt', actived: true },
    { id: 2, text: 'Đã duyệt', actived: true },
    { id: 3, text: 'Ngưng đánh giá', actived: false },
    { id: 4, text: 'Trả về', actived: true },
  ]

  defaultItems={
    defaultStatus: [
      { id: 0, text: 'Đang soạn thảo', actived: true },
      { id: 1, text: 'Gửi duyệt', actived: true },
      { id: 2, text: 'Đã duyệt', actived: true },
      { id: 3, text: 'Ngưng đánh giá', actived: false },
      { id: 4, text: 'Trả về', actived: true },
    ],
    defaultEvaStatus:[
      { id: 0, text: 'Hoàn tất', actived: false },
      { id: 1, text: 'Phúc khảo', actived: false }
    ]
  }

  multiToolFuncList=[
      { id: 2, icon: redoIcon, text: "Gửi duyệt", ofStatus: ['Đang soạn thảo', 'Trả về'] },
      { id: 3, icon: checkOutlineIcon, text: "Phê duyệt", ofStatus: ['Gửi duyệt', 'Ngưng áp dụng'] },
      { id: 4, icon: minusOutlineIcon, text: "Ngưng hiển thị", ofStatus: ['Duyệt áp dụng'] },
      { id: 5, icon: undoIcon, text: "Trả về", ofStatus: ['Gửi duyệt', 'Ngưng áp dụng'] },
      { id: 6, icon: trashIcon, text: "Xoá câu hỏi", ofStatus: ['Đang soạn thảo'] }
  ];
  

  evaluationStatusButtons = [
    { id: 0, text: 'Hoàn tất', actived: false },
    { id: 1, text: 'Phúc khảo', actived: false }
  ]
  breadCrumpItems: BreadCrumbItem[] = [
    { text: 'ĐÁNH GIÁ NHÂN SỰ' },
    { text: 'QUẢN LÝ ĐỢT ĐÁNH GIÁ' }
  ]
  evaluationList: DTOEvaluationSession[] = EvaluationData;

  selectedEvaluationList: DTOEvaluationSession[] = [];
  selectedEvaluationListStr: string[] = [];
  selectedItemToolTip: DTOEvaluationSession = null;
  multiToolTipFunc : { id: number; icon: SVGIcon; text: string; ofStatus: string[] }[] = [];
  toolTipFuncList: { sessionFuncLst?: { icon: SVGIcon, text: string }[], stateFuncLst?: { icon: SVGIcon, text: string }[] } = null
  anchorRef: HTMLElement = null;
  previousTrElement: HTMLElement | null = null;

  pagingList : any = [1,25,50,100]

  @HostListener("document:click", ["$event"])
  public documentClick(event: KeyboardEvent): void {
    if (this.anchorRef && !this.anchorRef.contains(event.target as Node)) {
      this.selectedItemToolTip = null;
    }
  }

  

  disabledStartDates = (date: Date): boolean => {
    if (this.endDate != null) {
      return date > this.endDate
    }
    return false
  };

  disabledEndDates = (date: Date): boolean => {
    if (this.startDate != null) {
      return date < this.startDate
    }
    return false
  };

  selectToolTipItem(object: DTOEvaluationSession, element: HTMLElement, event: MouseEvent) {
    if (this.selectedItemToolTip)
      this.selectedItemToolTip.Code == object.Code ? this.selectedItemToolTip = null : this.selectedItemToolTip = object;
    else {
      this.selectedItemToolTip = object
    }

    const buttonElement = event.target as HTMLElement;
    const trElement = this.findParentByTagName(buttonElement, 'tr');

    if (trElement) {
      // Remove the class from the previously selected <tr> element if any
      if (this.previousTrElement) {
        this.renderer.removeClass(this.previousTrElement, 'popup');
      }

      // Add the class to the current <tr> element
      this.renderer.addClass(trElement, 'popup');

      // Update the reference to the current <tr> element
      this.previousTrElement = trElement;
    }
    this.toolTipFuncList = this.getToolTipFunction(object);
    this.anchorRef = element;
  }

  getToolTipFunction(object: DTOEvaluationSession) {
    switch (object.State) {
      case 'Đang soạn thảo':
        return {
          sessionFuncLst: [
            { icon: this.icons.pencilIcon, text: 'Thiết lập đợt đánh giá' }
          ]
          ,
          stateFuncLst: [
            { icon: this.icons.redoIcon, text: 'Gửi duyệt' },
            { icon: this.icons.trashIcon, text: 'Xoá đợt đánh giá' },
          ]
        }
      case 'Gửi duyệt':
        return {
          sessionFuncLst: [
            { icon: this.icons.pencilIcon, text: 'Thiết lập đợt đánh giá' }
          ]
          ,
          stateFuncLst: [
            { icon: this.icons.checkOutlineIcon, text: 'Phê duyệt' },
            { icon: this.icons.undoIcon, text: 'Trả về' },
          ]
        }
      case 'Duyệt áp dụng':
        if (object.SessionStatus == 'Chưa mở' || object.SessionStatus == null) {
          return {
            sessionFuncLst: [
              { icon: this.icons.trackChangesRejectIcon, text: 'Xem chi tiết đợt đánh giá' }
            ]
            ,
            stateFuncLst: [
              { icon: this.icons.checkOutlineIcon, text: 'Ngưng đợt đánh giá' }
            ]
          }
        } else if (object.SessionStatus == 'Đang diễn ra') {
          return {
            sessionFuncLst: [
              { icon: this.icons.trackChangesRejectIcon, text: 'Xem chi tiết đợt đánh giá' },
              { icon: this.icons.eyeIcon, text: 'Giám sát đợt đánh giá' }
            ]
            ,
            stateFuncLst: [
              { icon: this.icons.checkOutlineIcon, text: 'Ngưng đợt đánh giá' }
            ]
          }
        } else if (object.SessionStatus == 'Kết thúc đợt đánh giá') {
          return {
            sessionFuncLst: [
              { icon: this.icons.trackChangesRejectIcon, text: 'Xem chi tiết đợt đánh giá' },
              { icon: this.icons.eyeIcon, text: 'Giám sát đợt đánh giá' },
              { icon: this.icons.trackChangesEnableIcon, text: 'Chấm điểm tự luận' }
            ]
            ,
            stateFuncLst: [
              { icon: this.icons.checkOutlineIcon, text: 'Ngưng đợt đánh giá' }
            ]
          }
        }
        else if (object.SessionStatus == 'Hoàn tất' || object.SessionStatus == 'Kết thúc thi') {
          return {
            sessionFuncLst: [
              { icon: this.icons.trackChangesRejectIcon, text: 'Xem chi tiết đợt đánh giá' },
              { icon: this.icons.eyeIcon, text: 'Giám sát đợt đánh giá' },
              { icon: this.icons.trackChangesEnableIcon, text: 'Chấm câu điểm tự luận' }
            ]
            ,
            stateFuncLst: [
              { icon: this.icons.checkOutlineIcon, text: 'Ngưng đợt đánh giá' }
            ]
          }
        }
        else if (object.SessionStatus == 'Yêu cầu phúc khảo') {
          return {
            sessionFuncLst: [
              { icon: this.icons.trackChangesRejectIcon, text: 'Xem chi tiết đợt đánh giá' },
              { icon: this.icons.eyeIcon, text: 'Giám sát đợt đánh giá' },
              { icon: this.icons.trackChangesEnableIcon, text: 'Chấm điểm câu tự luận' },
              { icon: this.icons.trackChangesEnableIcon, text: 'Chấm phúc khảo' }
            ]
            ,
            stateFuncLst: [
              { icon: this.icons.checkOutlineIcon, text: 'Ngưng đợt đánh giá' }
            ]
          }
        }
        else {
          return {
            sessionFuncLst: [
              { icon: this.icons.trackChangesRejectIcon, text: 'Xem chi tiết đợt đánh giá' },
              { icon: this.icons.eyeIcon, text: 'Giám sát đợt đánh giá' },
              { icon: this.icons.trackChangesEnableIcon, text: 'Chấm điểm câu tự luận' },
              { icon: this.icons.trackChangesEnableIcon, text: 'Chấm phúc khảo' }
            ]
            ,
            stateFuncLst: [
              { icon: this.icons.checkOutlineIcon, text: 'Ngưng đợt đánh giá' }
            ]
          }
        }


      case 'Ngưng áp dụng':

        if (object.SessionStatus == 'Chưa mở') {
          return {
            sessionFuncLst: [
              { icon: this.icons.trackChangesRejectIcon, text: 'Xem chi tiết đợt đánh giá' }
            ]
            ,
            stateFuncLst: [
              { icon: this.icons.checkOutlineIcon, text: 'Phê duyệt' },
              { icon: this.icons.undoIcon, text: 'Trả về' }
            ]
          }
        }

        return {
          sessionFuncLst: [
            { icon: this.icons.trackChangesRejectIcon, text: 'Xem chi tiết đợt đánh giá' }
          ]
          ,
          stateFuncLst: [
            { icon: this.icons.checkOutlineIcon, text: 'Phê duyệt' }
          ]
        }

      case 'Trả về':
        return {
          sessionFuncLst: [
            { icon: this.icons.pencilIcon, text: 'Thiết lập đợt đánh giá' }
          ]
          ,
          stateFuncLst: [
            { icon: this.icons.redoIcon, text: 'Gửi duyệt' }
          ]
        }
      default:
        return {}
    }
  }

  getMultiToolTipFunc(){
    this.multiToolTipFunc = [];
    if (this.selectedEvaluationList.length > 0) {
      let funcList: { id: number; icon: SVGIcon; text: string; ofStatus: string[] }[] = []
      this.multiToolFuncList.forEach(func => {
        this.selectedEvaluationList.forEach(evaluationItem => {
          if (func.ofStatus.includes(evaluationItem.State)) {
            if (!funcList.includes(func)) {
              funcList.push(func);
            }
          }
        })
      });
      this.multiToolTipFunc = funcList;
    }
  }

  closeMultiToolFunc(){
    this.multiToolTipFunc = []
    this.selectedEvaluationListStr = []
    this.selectedEvaluationList = []
  }

  private findParentByTagName(element: HTMLElement, tagName: string): HTMLElement | null {
    while (element) {
      if (element.tagName.toLowerCase() === tagName.toLowerCase()) {
        return element;
      }
      element = element.parentElement as HTMLElement;
    }
    return null;
  }

  onSelectItemList() {
    const tempList: DTOEvaluationSession[] = []
    this.selectedEvaluationListStr.forEach(string => {
      const objectEvaluation = this.evaluationList.find(evaluation => evaluation.Code == string);
      if (objectEvaluation) tempList.push(objectEvaluation);
    })
    this.selectedEvaluationList = tempList;
    this.selectedItemToolTip = null;
    this.getMultiToolTipFunc();
  }

  onSelectState() {
    if (this.statusButtons[0].actived) {
      this.statusButtons[4].actived = true
    } else if (!this.statusButtons[0].actived) {
      this.statusButtons[4].actived = false;
    }
    console.log(JSON.parse(JSON.stringify(this.defaultItems.defaultStatus)));

  }

  getStateFilters() {
    const tempFilter: CompositeFilterDescriptor = { logic: 'or', filters: [] };
    this.statusButtons.forEach(button => {
      if (button.actived) {
        let logicText = button.text;
        logicText == 'Ngưng đánh giá' ? logicText = 'Ngưng áp dụng' : button.text;
        logicText == 'Đã duyệt' ? logicText = 'Duyệt áp dụng' : button.text;
        tempFilter.filters.push({ field: 'State', operator: 'eq', value: logicText })
      }
    });   
    return tempFilter;
  }

  getSessionFilters() {
    const tempFilter: CompositeFilterDescriptor = { logic: 'or', filters: [] };
    this.evaluationStatusButtons.forEach(button => {
      if (button.actived) {
        let logicText = button.text;
        logicText == 'Phúc khảo' ? logicText = 'Hoàn tất phúc khảo' : button.text;
        tempFilter.filters.push({ field: 'SessionStatus', operator: 'eq', value: logicText })
      }
    });
    return tempFilter;
  }

  getSearchFilters(): CompositeFilterDescriptor {
    return { logic: 'or', filters: [{ field: 'Name', operator: 'contains', value: this.searchTerm }] };
  }

  getDateStartEndFilters(): CompositeFilterDescriptor{
    const tempFilter : CompositeFilterDescriptor = {logic:'and', filters:[]};
    if(this.startDate)
    tempFilter.filters.push({field:'StartDate', operator: 'gte', value: this.startDate})
    if(this.endDate)
    tempFilter.filters.push({field:'EndDate', operator: 'lte', value: this.endDate})
    return tempFilter
  }

  formatDateToDDMMYYYY(date : Date) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  applyFilter() {
    let stateFilter = this.getStateFilters();
    let sessionFilter = this.getSessionFilters();
    let searchFilter = this.getSearchFilters();
    let dateFilter = this.getDateStartEndFilters();
    this.loadingState = true;
    if (stateFilter.filters.toString() == "" && sessionFilter.filters.toString() == "" && dateFilter.filters.toString() == "") {
      
      setTimeout(() => {
        this.evaluationList = EvaluationData;
        this.loadingState = false;

      }, 300);
    }
    else if (stateFilter.filters.toString() == "" && sessionFilter.filters.toString() == "" && dateFilter.filters.toString() != ""){
      setTimeout(() => {
        this.evaluationList = filterBy(EvaluationData,
          {
            logic: 'and',
            filters: [
              searchFilter,
              dateFilter
            ]
          }
        )
        this.loadingState = false;
      }, 300);
    }
    else {
      setTimeout(() => {
        this.evaluationList = filterBy(EvaluationData,
          {
            logic: 'and',
            filters: [
              {
                logic: 'or',
                filters: [stateFilter, sessionFilter]
              },
              searchFilter,
              dateFilter
            ]
          }
        )
        this.loadingState = false;
      }, 300);
      
    }
  }

  onEnterKeyPressed(){

  }

  resetFilter(){
    console.log(this.defaultItems.defaultEvaStatus);
    this.statusButtons = [...this.defaultItems.defaultStatus];
    this.evaluationStatusButtons = [...this.defaultItems.defaultEvaStatus];
    this.searchTerm = '';
    this.startDate = null;
    this.endDate = null;
    this.applyFilter();
  }
}
