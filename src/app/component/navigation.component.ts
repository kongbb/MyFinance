import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'navigation',
    templateUrl: "../../pages/template/navigation.html"
})

export class NavigationComponent {
    @Output() navigation = new EventEmitter();
    setPage(page: string){
        this.navigation.next(page);
    }
}