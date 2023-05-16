
import { type } from "@testing-library/user-event/dist/type";
import { useForm } from "react-hook-form";


// function ToDoList() {
//     const [toDo,setToDo] = useState("");
//     const [toDoError,setToDoError] = useState("");
//     const onChange = (event:React.FormEvent<HTMLInputElement>)=>{
//         const {currentTarget:{value},
//     } = event;
//     setToDoError("");
//     setToDo(value);
//     };
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if(toDo.length < 10){
//             return setToDoError("To do should be longer ");
//         }
//         console.log("submit");
//     };
//     return <div>
//         <form onSubmit={onSubmit}>
//             <input onChange={onChange} value={toDo} placeholder="Write a todo" />
//             <button>Add</button>
//             {toDoError !== ""? toDoError:null}
//         </form>
//     </div>;
// }
interface IFormData {
    errors: {
        email: {
            message: string;
        }
    };
    firstName: string;
    lastName: string;
    Username: string;
    Password: string;
    Password1: string;
    email: string;
    extraError:string;
}
function ToDoList() {
    const { register, handleSubmit, formState: { errors },setError } = useForm<IFormData>({
        defaultValues:{
            email:"@naver.com",
        }
    });
    const onValid = (data: IFormData) => {
        if(data.Password !== data.Password1){
            setError("Password1",{
                message:"Password are not the same"
            },{shouldFocus:true})
        }
        //setError("extraError",{message:"Server Offline"});
        
    };
    console.log(errors);
    return (<div>
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)} >
            <input {...register("email", {
                required: "write here",
                pattern: {
                    value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                    message: "Only naver.com emails allowed",
                },
            })} placeholder="Email" />
            <span> {errors?.email?.message}</span>

            <input {...register("firstName", { required: "write here",validate:{
               noNico : (value) => value.includes("nico")?"no nicos allowed":true,
               noNick : (value) => value.includes("nick")?"no nicos allowed":true
            } })} placeholder="First Name" />
            <span> {errors?.firstName?.message}</span>
            <input {...register("lastName", { required: "write here" })} placeholder="Last Name" />
            <span> {errors?.lastName?.message}</span>
            <input {...register("Username", {
                required: "write here",
                minLength: {
                    value: 10,
                    message: "Your Username is too short "
                }
            })}
                placeholder="Username" />
            <span> {errors?.Username?.message}</span>
            <input {...register("Password", {
                required: "write here", minLength: {
                    value: 5,
                    message: "Your password is too short "
                }
            })} placeholder="Password" />
            <span> {errors?.Password?.message}</span>
            <input {...register("Password1", { required: "write here", minLength: 5 })} placeholder="Password1" />
            <span> {errors?.Password1?.message}</span>
            <button>Add</button>
            <span> {errors?.extraError?.message}</span>

        </form>
    </div>);
}
export default ToDoList;