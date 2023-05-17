import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const category = useRecoilValue(categoryState);
    const setToDos = useSetRecoilState(toDoState);

    const { register, handleSubmit, setValue } = useForm<IForm>();
    const onSubmit = ({ toDo }: IForm) => {
        setToDos(oldToDos => [
            { text: toDo, id: Date.now(), category },
             ...oldToDos
            ]);
        setValue("toDo", "");
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("toDo", {
                required: "Pleas Writer a To Do",

            })} placeholder="Write a todo" />
            <button>Add</button>

        </form>
    );
}
export default CreateToDo;