import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
    selector: 'ngb-multi-date-picker',
    templateUrl: 'multi-date-picker.html',
    styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
    .custom-day.selected{  
      background-color: rgba(255, 255, 0, .5);
        
    }
    .custom-day.day-disabled {
      color: lightgrey;
    }
    .custom-day.day-disabled:hover {
      background-color: transparent;
    }
  `]
})
export class MultiDatePicker {

    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;

    hoveredDate: NgbDateStruct;

    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;

    displayNum = 2;

    _datesSelected: NgbDateStruct[] = [];

    @Input()
    set datesSelected(value: NgbDateStruct[]) {
        this._datesSelected = value;
    }
    get datesSelected(): NgbDateStruct[] {
        return this._datesSelected ? this._datesSelected : [];
    }

    @Output() datesSelectedChange = new EventEmitter<NgbDateStruct[]>();

    constructor(calendar: NgbCalendar) {

        const current = new Date();
        this.minDate = { year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate() };
        this.maxDate = { year: current.getFullYear(), month: current.getMonth() + 3, day: current.getDate() }
    }

    ngOnInit() {
        let that = this;

        window.addEventListener("resize", function() {
            if (window.innerWidth <= 760)
                that.displayNum = 1;
            else
                that.displayNum = 2;
        });
    }

    onDateSelection(event: any, date: NgbDateStruct) {

        event.target.parentElement.blur();  //make that not appear the outline
        if (!this.fromDate && !this.toDate) {
            if (event.ctrlKey == true)  //If is CrtlKey pressed
                this.fromDate = date;
            else
                this.addDate(date);

            this.datesSelectedChange.emit(this.datesSelected);

        } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
            this.toDate = date;
            this.addRangeDate(this.fromDate, this.toDate);
            this.fromDate = null;
            this.toDate = null;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    addDate(date: NgbDateStruct) {
        let index = this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year);
        if (index >= 0)       //If exist, remove the date
            this.datesSelected.splice(index, 1);
        else   //a simple push
            this.datesSelected.push(date);
    }
    addRangeDate(fromDate: NgbDateStruct, toDate: NgbDateStruct) {
        //We get the getTime() of the dates from and to
        let from = new Date(fromDate.year + "-" + fromDate.month + "-" + fromDate.day).getTime();
        let to = new Date(toDate.year + "-" + toDate.month + "-" + toDate.day).getTime();
        for (let time = from; time <= to; time += (24 * 60 * 60 * 1000)) //add one day
        {
            let date = new Date(time);
            //javascript getMonth give 0 to January, 1, to February...
            this.addDate({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
        }
        this.datesSelectedChange.emit(this.datesSelected);
    }
    //return true if is selected
    isDateSelected(date: NgbDateStruct) {
        return (this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year) >= 0);
    }
    isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
    isInside = date => after(date, this.fromDate) && before(date, this.toDate);
    isFrom = date => equals(date, this.fromDate);
    isTo = date => equals(date, this.toDate);
}
