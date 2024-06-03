import { atom } from "recoil";
export const blogAtom = atom({
    key:"blog",
    default:{
        title:"Untitled",
        description:"",
        image:"",
        category:""
    }
})