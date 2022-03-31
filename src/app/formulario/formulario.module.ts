import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListadoComponent } from './listado/listado.component';


@NgModule({
    declarations: [
        ListadoComponent
    ],
    exports: [
        ListadoComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]

})
export class FormularioComponent{}