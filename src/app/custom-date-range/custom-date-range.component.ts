import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NgbDateStruct, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-date-range',
  templateUrl: './custom-date-range.component.html',
  styleUrls: ['./custom-date-range.component.scss']
})
export class CustomDateRangeComponent implements OnInit {
  from: moment.Moment;
  to: moment.Moment;
  hoveredDate: Date;
  startDate: NgbDate;
  // ranges: any = {
  //   'Today': [moment(), moment()],
  //   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  //   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  //   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  //   'This Month': [moment().startOf('month'), moment().endOf('month')],
  //   'Last Month': [
  //     moment()
  //       .subtract(1, 'month')
  //       .startOf('month'),
  //     moment()
  //       .subtract(1, 'month')
  //       .endOf('month')
  //   ],
  //   'Custom Range':[]
  // };

  placeholder : string = "Choose range..";
  displayText : string = null;

  rangeArray : Array<{name: string, label : string, value : {startdate: moment.Moment, enddate: moment.Moment}}>
  selectedRange: string;
  CustomRangeLabel : string = 'CustomRange';


  constructor( calendar: NgbCalendar) { 
    this.rangeArray = [];
    this.rangeArray.push({name: 'Today', label : 'Today', value : {startdate: moment(), enddate: moment()}});
    this.rangeArray.push({name: 'Yesterday', label : 'Yesterday', value : {startdate: moment().subtract(1, 'days'), enddate: moment().subtract(1, 'days')}});
    this.rangeArray.push({name: 'Last7Days', label : 'Last 7 Days', value : {startdate: moment().subtract(6, 'days'), enddate: moment()}});
    this.rangeArray.push({name: 'Last30Days', label : 'Last 30 Days', value : {startdate: moment().subtract(29, 'days'), enddate: moment()}});
    this.rangeArray.push({name: 'ThisMonth', label : 'This Month', value : {startdate:moment().startOf('month'), enddate: moment().endOf('month')}});
    this.rangeArray.push({name: 'LastMonth', label : 'Last Month', value : {startdate: moment().subtract(1, 'month').startOf('month'), enddate:  moment().subtract(1, 'month').endOf('month')}});
    this.rangeArray.push({name: this.CustomRangeLabel, label : this.CustomRangeLabel, value : {startdate: moment(), enddate: moment()}});

    this.selectedRange = "Yesterday";
    this.from = moment().subtract(1, 'days');
    this.to = moment().subtract(1, 'days');
  }

  ngOnInit() {
  }

  onRangeClicked(range){
    this.selectedRange = range.name;
    if(range.name !== "CustomRange"){
      this.from = range.value.startdate;
      this.to = range.value.enddate;
      this.displayText = this.from.format("DD.MM.YYYY").toString();
    } else {
      // do on custom range selected
      this.startDate = new NgbDate(new Date(this.from.toString()).getFullYear(), new Date(this.from.toString()).getMonth()+1, new Date(this.from.toString()).getDay());
    }
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

    const fromFormatted = moment(this.from).format('DD.MM.YYYY');

    return this.to
      ? `${fromFormatted}`
      + ` - `
      + `${moment(this.to).format('DD.MM.YYYY')}`
      : `${fromFormatted}`;

  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.from && !this.to) {
      this.from = this.toMoment(date);
    } else if (this.from && !this.to && this.toMoment(date).isAfter(this.from)) {
      this.to = this.toMoment(date);
      // this.emit(true);
      this.displayText = `${this.from.format("DD.MM.YYYY").toString()} - ${this.to.format("DD.MM.YYYY").toString()}`;
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
