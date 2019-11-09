import { Component, OnInit } from '@angular/core';
export interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-creat-receipt',
  templateUrl: './creat-receipt.component.html',
  styleUrls: ['./creat-receipt.component.css']
})

export class CreatReceiptComponent implements OnInit {
  displayedColumns = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
  constructor() { }

  ngOnInit() {
  }

}
