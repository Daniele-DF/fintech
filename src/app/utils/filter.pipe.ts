import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contacts';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Contact[], searchText: string) {

    items.sort((a, b) => a.name.localeCompare(b.name));

    if(searchText === ''){
      return items;
    }

    return items.filter(item =>{
      return item.name.toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase());
    })
  }
}
