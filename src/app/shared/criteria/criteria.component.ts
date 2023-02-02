import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }
  hitcountMessage: string;
 
  
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('filterElement') filterElement: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.filterElement)
      this.filterElement.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const hitcountChanges = changes['hitCount'];
    if (hitcountChanges && !hitcountChanges.currentValue)
      this.hitcountMessage = 'No matches found';
    else
      this.hitcountMessage = `Hits: ${hitcountChanges.currentValue}`;
  }

}
