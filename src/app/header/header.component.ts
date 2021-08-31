import {Component, OnInit} from "@angular/core";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import {UsrTagComponent} from "../usr-tag/usr-tag.component";
import { FileWatcherEventKind } from "typescript";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  type!: string;
  body! : any;
  closeResult!: string;
  constructor(private http:HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {}
 
  addUser(){
    const bod = {
      firstName: (<HTMLInputElement>document.getElementById("firstname")).value,
      lastName: (<HTMLInputElement>document.getElementById("lastname")).value,
      location: (<HTMLInputElement>document.getElementById("ubicacion")).value,
      phone: (<HTMLInputElement>document.getElementById("celular")).value,
      gender: (<HTMLInputElement>document.getElementById("hombre")).checked? "m": "f"
    };
    // console.log(body);
    const headers = {"content-type": "application/json"};
    const bodY = JSON.stringify(bod);
    console.log(bodY);
    return this.http
      .post<any>(
        "http://iacenter.victortalamantes.com/user",
        {
          firstName: (<HTMLInputElement>document.getElementById("firstname"))
            .value,
          lastName: (<HTMLInputElement>document.getElementById("lastname"))
            .value,
          location: (<HTMLInputElement>document.getElementById("ubicacion"))
            .value,
          phone: String((<HTMLInputElement>document.getElementById("celular")).value),
          gender: (<HTMLInputElement>document.getElementById("hombre")).checked
            ? "m"
            : "f",
        },
        {headers: headers}
      )
      .subscribe((data) => {
        console.log(data);
        this.modalService.dismissAll();
      });
  }

  open(content: any, type: string) {
    this.type = type;
    this.modalService
      .open(content, {ariaLabelledBy: "modal-basic-title"})
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
