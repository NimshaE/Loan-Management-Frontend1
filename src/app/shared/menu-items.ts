import { Injectable } from "@angular/core";

export interface Menu{
    state:string;
    name:string;
    type:string;
    icon:string;
    role:string;
}

const MENUITEMS = [
    {state:'dashboard',name:'Dashboard',type:'link',icon:'dashboard',role:''},
    {state:'seller',name:'Manage Seller',type:'link',icon:'seller',role:'admin'} //category
]

@Injectable()
export class MenuItems{
    getMenuItem():Menu[]{
        return MENUITEMS;
    }
}