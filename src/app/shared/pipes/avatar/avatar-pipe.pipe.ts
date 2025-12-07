import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarPipe',
})
export class AvatarPipePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '?';
    // remove Spaces
    value = value.trim();

    //Split the name by space
    const nameParts = value.split(' ');
    let initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
    if (initials.length > 2) {
      initials = initials.substring(0, 2);
    }
    return initials;
  }
}
