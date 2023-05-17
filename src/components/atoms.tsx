import {atom, selector} from "recoil";
import { recoilPersist } from "recoil-persist";


export enum Categories {
    "TO_DO",
    "DOING",
    "DONE"
}

export interface IToDo {
    text: string;
    category: Categories;
    id: number;

}
const { persistAtom } = recoilPersist();
export const categoryState =atom<Categories>({
key:"category",
default:Categories.TO_DO,
effects_UNSTABLE:[persistAtom],

})

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const toDoSelector =selector({
    key:"toDoSelector",
    get: ({get}) =>{
            const toDos =get(toDoState);
            const category=get(categoryState);
            return toDos.filter(toDo => toDo.category === category );
            
          
    
    }
});

