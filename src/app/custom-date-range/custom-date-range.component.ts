import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NgbDateStruct, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-date-range',
  templateUrl: './custom-date-range.component.html',
  styleUrls: ['./custom-date-range.component.scss']
})
export class CustomDateRangeComponent implements OnInit {
  // Input starts
  rangeArray : Array<{name: string, label : string, value : {startdate: moment.Moment, enddate: moment.Moment, singleValue : boolean}}>
  selectedRange: string = null;
  showOnlyLabel : boolean;
  CustomRangeLabel : string = 'CustomRange';
  placeholder : string = "Select the range";
  defaultLabelIndex : number = 1;
  dateFormat : string ="DD.MM.YYYY";
  // Input ends
  
  from: moment.Moment;
  to: moment.Moment;
  hoveredDate: Date;
  startDate: NgbDate;
  isOpen: Boolean;
  displayText : string = null;

  constructor( calendar: NgbCalendar) { 
    this.rangeArray = [];
    this.rangeArray.push({name: 'Today', label : 'Today', value : {startdate: moment(), enddate: moment(), singleValue : true}});
    this.rangeArray.push({name: 'Yesterday', label : 'Yesterday', value : {startdate: moment().subtract(1, 'days'), enddate: moment().subtract(1, 'days'), singleValue : true}});
    this.rangeArray.push({name: 'Last7Days', label : 'Last 7 Days', value : {startdate: moment().subtract(6, 'days'), enddate: moment(), singleValue : false}});
    this.rangeArray.push({name: 'Last30Days', label : 'Last 30 Days', value : {startdate: moment().subtract(29, 'days'), enddate: moment(), singleValue : false}});
    this.rangeArray.push({name: 'ThisMonth', label : 'This Month', value : {startdate:moment().startOf('month'), enddate: moment().endOf('month'), singleValue : false}});
    this.rangeArray.push({name: 'LastMonth', label : 'Last Month', value : {startdate: moment().subtract(1, 'month').startOf('month'), enddate:  moment().subtract(1, 'month').endOf('month'), singleValue : false}});
    this.rangeArray.push({name: this.CustomRangeLabel, label : this.CustomRangeLabel, value : {startdate: moment(), enddate: moment(), singleValue : false}});
  }

  ngOnInit() {
    this.initialLoad();
  }

  initialLoad(){
    if(this.showOnlyLabel){
      if(this.selectedRange !== '' && this.selectedRange !== null){
        this.displayText = this.selectedRange;
      } else {
        this.displayText = this.rangeArray[this.defaultLabelIndex].label;
        this.selectedRange = this.rangeArray[this.defaultLabelIndex].label;
      }
      this.from = this.rangeArray.find(x=> x.label === this.selectedRange).value.startdate;
      this.to = this.rangeArray.find(x=> x.label === this.selectedRange).value.enddate;
    } else {
      if(this.selectedRange !== '' && this.selectedRange !== null){
        let currentRange = this.rangeArray.find(x=> x.label === this.selectedRange);
        if(currentRange){
          this.from = currentRange.value.startdate;
          this.to = currentRange.value.enddate;
          this.set_displayText(currentRange);
        }
      } else {
        this.from = this.rangeArray[this.defaultLabelIndex].value.startdate;
        this.to = this.rangeArray[this.defaultLabelIndex].value.enddate;
        this.set_displayText(this.rangeArray[this.defaultLabelIndex]);
        this.selectedRange = this.rangeArray[this.defaultLabelIndex].label;
      }
    }
  }

  onRangeClicked(range){
    this.selectedRange = range.name;
    if(range.name !== this.CustomRangeLabel){
      this.from = range.value.startdate;
      this.to = range.value.enddate;
      if(this.showOnlyLabel){
        this.displayText = range.label;
      } else {
        this.set_displayText(range);
      }
      this.isOpen = !this.isOpen;
      // emit
    } else {
      // do on custom range selected
      this.startDate = new NgbDate(new Date(this.from.toString()).getFullYear(), new Date(this.from.toString()).getMonth()+1, new Date(this.from.toString()).getDay());
    }
  }

  set_displayText(range){
    if(!range.value.singleValue)
    {
      this.displayText = this.from.format(this.dateFormat).toString() + '-' + this.to.format(this.dateFormat).toString();
    } else {
      this.displayText = this.from.format(this.dateFormat).toString();
    }
  }

  clearbutton_Clicked(){
    this.from = null;
    this.to = null;
    this.displayText = null;
  }

  applybutton_Clicked(){
    // emit
    this.set_displayText({label:this.CustomRangeLabel});
    this.isOpen = !this.isOpen;
  }

  /**
   * Check whether or not an element is a child of another element
   *
   * // @private
   * // @param {any} parent
   * // @param {any} child
   * // @returns if child is a descendant of parent
   * // @memberof DateRangeSelectionComponent
   */
  private isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }

  get formattedDateRange(): string {
    if (!this.from) {
      return `Select the range`;
    }

    const fromFormatted = moment(this.from).format(this.dateFormat);

    return this.to
      ? `${fromFormatted}`
      + ` - `
      + `${moment(this.to).format(this.dateFormat)}`
      : `${fromFormatted}`;

  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.from && !this.to) {
      this.from = this.toMoment(date);
    } else if (this.from && !this.to && this.toMoment(date).isAfter(this.from)) {
      this.to = this.toMoment(date);
      // this.emit(true);
    } else {
      this.to = null;
      this.from = this.toMoment(date);
    }
  }

  toDate(dateStruct: NgbDateStruct): Date {
    return dateStruct ? new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day) : null;
  }

  toMoment(dateStruct: NgbDateStruct): moment.Moment {
    return moment(this.toDate(dateStruct));
  }

  isHovered = (date: NgbDateStruct) => this.from && !this.to && this.hoveredDate
  && this.toMoment(date).isAfter(this.from) && this.toMoment(date).isBefore(this.hoveredDate)

  isInside = (date: NgbDateStruct) => this.toMoment(date).isAfter(moment(this.from).startOf('day'))
  && this.toMoment(date).isBefore(moment(this.to).startOf('day'))

  isFrom = (date: NgbDateStruct) => this.toMoment(date).isSame(this.from, 'd');
  
  isTo = (date: NgbDateStruct) => this.toMoment(date).isSame(this.to, 'd');
}
