import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "uniqueBarName"
})

export class UniqueBarNamePipe implements PipeTransform {
    transform(barsArray) {
        if (barsArray) {
            let temp = [];
            barsArray.forEach(item => {
                temp.push(item.Bar);
            });
            barsArray = temp.filter((item, pos) => {
                return temp.indexOf(item) == pos;
               });
            return barsArray
        }
        else {
            return [];
        }
        
    }
}