import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "barName"
})

export class BarNamePipe implements PipeTransform {
    transform(name: string): string {
        if (name) {
            name = name.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
            return name;
        }
        else {
            return '';
        }
    }
}