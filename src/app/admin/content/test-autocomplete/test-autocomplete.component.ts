import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PaySlipTypeService } from '../../services/pay-slip-type.service';
@Component({
  selector: 'app-test-autocomplete',
  templateUrl: './test-autocomplete.component.html',
  styleUrls: ['./test-autocomplete.component.css']
})
export class TestAutocompleteComponent implements OnInit {
  public paySlipType;

  public paySlipTypeId;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private paySlipTypeService: PaySlipTypeService
  ) { }

  ngOnInit() {
    this.getPaySlipTypes();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  public getPaySlipTypes() {
    // tslint:disable-next-line: variable-name
    this.paySlipTypeService.getAllPaySlipTypes().subscribe(result => {
      this.paySlipType = result;
    }, error => {
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.paySlipType.filter(option => option.toLowerCase().includes(filterValue));
  }
}
