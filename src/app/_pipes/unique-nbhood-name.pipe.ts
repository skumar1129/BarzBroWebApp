import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "uniqueNbhoodName"
})

export class UniqueNbhoodNamePipe implements PipeTransform {
    transform(barsArray) {
        if (barsArray) {
            let temp = [];
            barsArray.forEach(item => {
                temp.push(item.Neighborhood);
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