import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from 'src/app/api/contacts.service';
import { Contact, ContactId } from 'src/app/models/contacts';

@Component({
  selector: 'af-contacts',
  template: `
  <div class="container">

<ng-container *ngIf="visible; else contactForm;">
<af-contact-list
[contacts]="contacts"
(selectedContactsId)="selectionContactId($event)"
(editContactsId)="editContactId($event)"
(removeContactsId)="removeContactId($event)"
></af-contact-list>



<div class="btn-add">
<button (click)="toggleVisible()"  mat-raised-button color="primary" class="newContact">Nuovo Contatto</button>
</div>
</ng-container>



<ng-template #contactForm>
<button mat-stroked-button (click)="toggleVisibleBack()" class="back-btn">Indietro</button>
<af-contact-form
[initialContact]="selectedContact"
[readOnly]="btnDisabled"
(saveContact)="save($event)"
>
</af-contact-form>
</ng-template>

</div>



  `,
  styles: [

    `
  .container{
  display: flex;
  margin: 20px;
  flex-direction: column;
  border-radius: 10px;
  justify-content: center;


}

.btn{
  width: 100%;
}



.card-content{
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.icon-card{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.card-info-container{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.card-info{
  display: flex;
}

.type{
  margin-left: 5px;
}


.btn-delete, .btn-edit{
  margin-left: 10px;
}


.fa-card{
  background-color: lightblue;
  border-radius: 10px;
}



.btn-delete, .btn-check, .btn-edit{
  display: flex;
  justify-content: center;
  align-items: center;
}


.newContact{
  width: 100%;
}


.back-btn{
  margin-bottom: 5px
}

  `
  ]
})
export class ContactsComponent implements OnInit {

contacts : Contact [] = [];

selectedContact : Contact | null = null;


visible: boolean = true;

btnDisabled: boolean = true;





constructor(
  private contactsService : ContactsService, private http: HttpClient,
  public dialogRef: MatDialogRef<ContactsComponent>

) { }

ngOnChanges(changes: SimpleChanges): void {
  console.log(changes);

}

ngOnInit(): void {
  this.getAllContacts();
}

getAllContacts(){
  this.contactsService.getAllContacts().subscribe(data => {
    this.contacts = data;
  })
}



save(form: Partial<Contact>){
  console.log(form);
  if(this.selectedContact){
    this.toggleVisible();
    this.contactsService.editContact(this.selectedContact._id,form)
    .subscribe(data => {
      console.log('editfin',data);
      this.contacts = this.contacts.map(n => {
        return n._id === this.selectedContact?._id ? data : n;
      })
    })

  } else {
    this.contactsService.createContact(form).subscribe(data => {
      this.contacts = [...this.contacts, data];
      console.log('add', this.contacts);
      this.toggleVisible();
    })

  }
}



selectionContactId(contactId : ContactId){
  this.btnDisabled = true;
  console.log('SelectContactId', contactId.selectedContactId._id);
  this.selectedContact = this.contacts.find(x => x._id == contactId.selectedContactId._id) as Contact;
  this.toggleVisible();
  this.dialogRef.close(this.selectedContact._id);
}


editContactId(contactId : ContactId){
  this.btnDisabled = false;
  console.log('EditContactId', contactId.selectedContactId._id);
  this.selectedContact = this.contacts.find(x => x._id == contactId.selectedContactId._id) as Contact;
  this.toggleVisible();

}


removeContactId(contactId : ContactId){
  console.log('RemoveContactId', contactId.selectedContactId._id);

  this.contactsService.deleteContact(contactId.selectedContactId._id)
  .subscribe(data => {
    this.contacts = this.contacts.filter
    (n =>  n._id !== contactId.selectedContactId._id)
  });
}



toggleVisible(){
  this.visible = !this.visible;
}

toggleVisibleBack(){
  this.visible = !this.visible;
  this.selectedContact = null;
}


}
