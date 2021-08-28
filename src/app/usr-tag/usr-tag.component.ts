import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-usr-tag',
  templateUrl: './usr-tag.component.html',
  styleUrls: ['./usr-tag.component.scss'],
})
export class UsrTagComponent implements OnInit {
  tags: Tag[] = [];
  type!: string;
  closeResult!: string;
  user: Usr = {
    id: 0,
    firstName: '',
    lastName: '',
    location: "",
    phone: "",
    gender: "",
    createdAt: "",
    updatedAt: "",
  };
  name!: string;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getUserTags();
  }

  getUserTags() {
    return this.http
      .get<any>('http://iacenter.victortalamantes.com/users')
      .subscribe((response) => {
        console.log(response);
        this.tags = response;
        //console.log(this.tags[0]);
      });
  }

  getUserTag(id: number) {
    return this.http
      .get<any>('http://iacenter.victortalamantes.com/user/' + id)
      .subscribe((response) => {
        // console.log(response);
        this.user = response[0];
        // console.log( this.user);
        
        //Llenar la informacion
        (<HTMLInputElement>document.getElementById('firstname')).value = this.user.firstName;
        (<HTMLInputElement>document.getElementById('lastname')).value = this.user.lastName;
        (<HTMLInputElement>document.getElementById('ubicacion')).value = this.user.location;
        (<HTMLInputElement>document.getElementById('celular')).value = this.user.phone;
        (<HTMLInputElement>document.getElementById('firstname')).value = this.user.firstName; 
        if(this.user.gender == 'h'){
          (<HTMLInputElement>document.getElementById('hombre')).checked = true;
        }else{
          (<HTMLInputElement>document.getElementById('mujer')).checked = true;
        }
      });
  }



  open(content: any, type: string, id: number) {
    this.getUserTag(id);
    this.type = type;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
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
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
