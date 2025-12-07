import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskPhone',
})
export class MaskPhonePipe implements PipeTransform {
  transform(phone: string): string {
    return phone.replace(/(\d{2})\d{6}(\d{2})/, '$1******$2');
  }
}
