import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListadoComponent } from './listado/listado.component';
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
    declarations: [
        ListadoComponent
    ],
    exports: [
        ListadoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule
    ]

})
export class FormularioComponent{}