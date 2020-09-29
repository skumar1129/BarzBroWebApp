import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "uniqueRegName"
})

export class UniqueRegNamePipe implements PipeTransform {
    transform(barsArray) {
        if (barsArray) {
            let temp = [];
            barsArray.forEach(item => {
                temp.push(item.Region);
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