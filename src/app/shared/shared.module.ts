import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule} from '@angular/flex-layout';
import { CommonModule } from '../../../node_modules/@angular/common';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule
    ]
})
export class SharedModule{

}
