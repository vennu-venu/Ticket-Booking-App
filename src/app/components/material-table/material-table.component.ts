import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})

export class MaterialTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'user', 'movieName', 'theatre', 'date', 'show', 'noOfTickets', 'actions'];
  dataSource: any;
  editableIds: string[] = [];
  constructor(private http: HttpService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit() {
    if(localStorage.getItem("adminLogin") === null) {
      this.router.navigate(['/admin']);
    }
    this.http.getShows().subscribe(data => {
      data = data.map((item: any) => {
        item.theatre = item.theatre.toUpperCase();
        item.show = item.show.toUpperCase();
        return item;
      })
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  addId(id: string) {
    if(this.editableIds.findIndex(currId => currId === id) !== -1) {
      return;
    }
    this.editableIds.push(id);
  }

  findId(id: string) {
    return this.editableIds.join('-').search(id) !== -1;
  }

  removeId(id: string) {
    this.editableIds = this.editableIds.filter(currId => currId !== id);
  }

  updateRow(element: any) {
    this.http.updateBooing(element).subscribe((data: any) => console.log(data));
    this.editableIds = this.editableIds.filter(currId => currId !== element.id);
  }

}
