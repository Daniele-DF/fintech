import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {


  url = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) { }


 getAllContacts(): Observable<Contact[]>{
   return this.http.get<Contact[]>(this.url);
 }

 createContact(contactDTO: Partial<Contact>): Observable<Contact> {
  return this.http.post<Contact>(this.url, contactDTO);
}


deleteContact(contactdId: string): Observable<boolean> {
  return this.http.delete<boolean>(`${this.url}/${contactdId}`);
}

editContact(contactId: string,contactDTO: Partial<Contact>){
 return this.http.put<Contact>(`${this.url}/${contactId}`, contactDTO);
}


}
