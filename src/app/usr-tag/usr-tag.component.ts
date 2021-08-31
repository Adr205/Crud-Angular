import {HttpClient} from "@angular/common/http";
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FileWatcherEventKind} from "typescript";

export class Tag {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public location!: string;
  public phone!: string;
  public gender!: string;
  public createdAt!: string;
  public updatedAt!: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    location: string,
    phone: string,
    gender: string,
    createdAt: string,
    updatedAt: string
  ) {}
}

export class Usr {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public location!: string;
  public phone!: string;
  public gender!: string;
  public createdAt!: string;
  public updatedAt!: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    location: string,
    phone: string,
    gender: string,
    createdAt: string,
    updatedAt: string
  ) {}
}

@Component({
  selector: "app-usr-tag",
  templateUrl: "./usr-tag.component.html",
  styleUrls: ["./usr-tag.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UsrTagComponent implements OnInit {
  tags: Tag[] = [];
  tagsSave: Tag[] = [];
  filteredTags: Tag[] = [];
  id!: number;
  type!: string;
  closeResult!: string;
  user: Usr = {
    id: 0,
    firstName: "",
    lastName: "",
    location: "",
    phone: "",
    gender: "",
    createdAt: "",
    updatedAt: "",
  };
  name!: string;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  public ngOnInit(): void {
    this.getUserTags();
  }

  public updateUser() {
    const bod = {
      firstName: (<HTMLInputElement>document.getElementById("firstname")).value,
      lastName: (<HTMLInputElement>document.getElementById("lastname")).value,
      location: (<HTMLInputElement>document.getElementById("ubicacion")).value,
      phone: (<HTMLInputElement>document.getElementById("celular")).value,
      gender: (<HTMLInputElement>document.getElementById("hombre")).checked
        ? "m"
        : "f",
    };
    // console.log(body);
    const headers = {"content-type": "application/json"};
    const bodY = JSON.stringify(bod);
    console.log(bodY);
    return this.http
      .put<any>(
        "http://iacenter.victortalamantes.com/user",
        {
          id: this.id,
          firstName: (<HTMLInputElement>document.getElementById("firstname"))
            .value,
          lastName: (<HTMLInputElement>document.getElementById("lastname"))
            .value,
          location: (<HTMLInputElement>document.getElementById("ubicacion"))
            .value,
          phone: String(
            (<HTMLInputElement>document.getElementById("celular")).value
          ),
          gender: (<HTMLInputElement>document.getElementById("hombre")).checked
            ? "m"
            : "f",
        },
        {headers: headers}
      )
      .subscribe((data) => {
        console.log(data);
        this.modalService.dismissAll();
        this.getUserTags();
      });
  }

  public getUserTags() {
    return this.http
      .get<any>("http://iacenter.victortalamantes.com/users")
      .subscribe((response) => {
        console.log(response);
        this.tags = response;
        this.tagsSave = this.tags;
        //console.log(this.tags[0]);
      });
  }

  public async getUserTags2(t: number) {
    await setTimeout(() => {
      return this.http
        .get<any>("http://iacenter.victortalamantes.com/users")
        .subscribe((response) => {
          console.log(response);
          this.tags = response;
          //console.log(this.tags[0]);
          console.log("2 sec");
        });
    }, 200);
  }

  getUserTag(id: number) {
    return this.http
      .get<any>("http://iacenter.victortalamantes.com/user/" + id)
      .subscribe((response) => {
        // console.log(response);
        this.user = response[0];
        // console.log( this.user);

        //Llenar la informacion
        (<HTMLInputElement>document.getElementById("firstname")).value =
          this.user.firstName;
        (<HTMLInputElement>document.getElementById("lastname")).value =
          this.user.lastName;
        (<HTMLInputElement>document.getElementById("ubicacion")).value =
          this.user.location;
        (<HTMLInputElement>document.getElementById("celular")).value =
          this.user.phone;
        if (this.user.gender == "m") {
          (<HTMLInputElement>document.getElementById("hombre")).checked = true;
        } else {
          (<HTMLInputElement>document.getElementById("mujer")).checked = true;
        }
      });
  }

  filter() {
    let filterText = (<HTMLInputElement>(
      document.getElementById("searchText")
    )).value.toLowerCase();

    if (filterText == "") {
      this.tags = this.tagsSave;
    } else {
      let filterTags = this.tagsSave.filter(
        (t) =>
          t.firstName.toLowerCase().indexOf(filterText) != -1 ||
          t.lastName.toLowerCase().indexOf(filterText) != -1 ||
          t.location.toLowerCase().indexOf(filterText) != -1 ||
          t.phone.indexOf(filterText) != -1
      );
      this.tags = filterTags;
      // console.log(filterTags);
    }

    // console.log(filterText);

    // this.tags.forEach(t => {
    //   if (
    //     t.firstName.toLowerCase().indexOf(filterText) //||
    //     //tag.lastName.toLowerCase().indexOf(filterText) ||
    //     // tag.location.toLowerCase().indexOf(filterText) ||
    //     // tag.phone.toLowerCase().indexOf(filterText)
    //   ) {
    //     this.filteredTags.push(t);
    //   }
    // });
    
  }

  open(content: any, type: string, id: number) {
    this.getUserTag(id);
    this.type = type;
    this.id = id;
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
