import { buildDayTable } from '@fullcalendar/timegrid/TimeGridView';
import { MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { LanguageClassesService } from '../../services/language-classes.service';
import { from } from 'rxjs';
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.css']
})
export class TestReportComponent implements OnInit {

  public class;
  constructor(
    private languageClassesService: LanguageClassesService,
  ) { }

  ngOnInit() {
    this.getClass();
  }
  public getClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.class = result;
    }, error => {
    });
  }
  DownloadReport() {
    let row: any[] = []
    let rowD: any[] = []
    let col = ['Name', 'CourseFee']; // initialization for headers
    let title = "Sample Report" // title of report
    for (let a = 0; a < this.class.length; a++) {
      row.push(this.class[a].name)
      row.push(this.class[a].courseFee)
      rowD.push(row);
      row = [];
    }
    this.getReport(col, rowD, title);
  }

  getReport(col: any[], rowD: any[], title: any) {
    const totalPagesExp = '{total_pages_count_string}';
    let pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(51, 156, 255);
    pdf.text('Sample1', 450, 40);
    pdf.text('Email:', 450, 60); // 450 here is x-axis and 80 is y-axis
    pdf.text('Phone:', 450, 80); // 450 here is x-axis and 80 is y-axis
    pdf.text('' + title, 435, 100);  //
    pdf.setLineWidth(1.5);
    pdf.line(5, 107, 995, 107)
    var pageContent = function (data) {
      // HEADER

      // FOOTER
      var str = 'Page' + data.pageCount;
      // Total page number plugin only available in jspdf v1.0+
      if (typeof pdf.putTotalPages === 'function') {
        str = str + 'of' + totalPagesExp;
      }
      pdf.setFontSize(10);
      var pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
      pdf.text(str, data.settings.margin.left, pageHeight - 10); // showing current page number
    };
    pdf.autoTable(col, rowD,
      {
        addPageContent: pageContent,
          margin: { top: 110 },
      });
    // for adding total number of pages // i.e 10 etc
    if (typeof pdf.putTotalPages === 'function') {
      pdf.putTotalPages(totalPagesExp);
    }
    pdf.save(title + '.pdf');
  }
}
