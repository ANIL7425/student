import { useState } from "react";

function StudentForm({onSubmit}){
    const [formdata,setFormData]=useState({
        name:"",
        roll:"",
        classDiv:"",
        allergiesList:[],
        photo:"",
        busRoute:"",
    })
    //handle changing the name
    const handleNameChange=((e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;

        setFormData((prev)=>({...prev,[name]:value}))
    })
    //photo change
    const handlePhotoChange=(e)=>{
        const file=e.target.files[0];
        console.log(file);
        const reader=new FileReader();
        reader.onloadend=()=>{
            setFormData((prev)=>({...prev,photo:reader.result}))
        }
        reader.readAsDataURL(file);

    }
    //handle submit
    const handleSubmit=(e)=>{
       
        e.preventDefault();
  
        const requiredFields = ["name", "roll", "classDiv", "busRoute", "photo"];
        const emptyFields = requiredFields.filter((field) => !formdata[field]);
      
        if (emptyFields.length > 0) {
          alert("Please fill all the required fields before generating the ID card.");
          return;
        }
      
        onSubmit(formdata); 
        const saved=JSON.parse(localStorage.getItem("studentData"))|| [];
        saved.push(formdata);         
        localStorage.setItem("studentData", JSON.stringify(saved));

    
    
    }

    //handling allergies
    const handleAllergies=((e)=>{
        const value=e.target.value;
        console.log(value);
        //check it is checked or not
        const checked=e.target.checked;
        var updated=[...formdata.allergiesList];
        if (checked) updated.push(value);
        else updated = updated.filter((a) => a !== value);
        setFormData({...formdata,allergiesList:updated});

    })
    const classes = ["1-A", "2-B", "3-C", "4-D"];
    const allergiesList = ["Peanuts", "Dairy", "Gluten", "Soy", "Shellfish"];
    const routes = ["Route 1", "Route 2", "Route 3"];
    return(
        <div className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-yellow-100 to-orange-200 p-6">
          
          <div className="w-full max-wd-2xl p-8  border border-amber-950 rounded-lg bg-white">
             <h1 className="text-2xl font-bold text-center text-amber-950 mb-6">student questionarie</h1>
             <form className="flex flex-col  space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="text-sm mb-2 mr-5 text-gray-700">Student Name</label>
                <input name="name" placeholder="enter the name" value={formdata.name} onChange={handleNameChange} className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm mb-2 mr-s text-gray-700">roll no:</label>
                <input type="number" placeholder="rollnumber" name="roll" onChange={handleNameChange} className="px-4 py-3 rounded-lg focums:outline-none focus:ring-2 focus:ring-amber-500"/>

                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">class & section</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" name="classDiv" onChange={handleNameChange}>
                        <option>select class&sectiom</option>
                        {classes.map((val)=>(<option value={val} key={val}>{val}</option>))}
                    </select>

                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allergies:</label>
                    {allergiesList.map((val)=>(
                        <label  className="block">
                            <input type="checkbox" value={val} className="px-4 py-2" onChange={handleAllergies}/>{val} 
                        </label>
                    ))}

                </div>
                <div>

                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" >Routes:</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" name="busRoute" onChange={handleNameChange}>
                        {routes.map((val)=>(<option className="block" value={val} key={val}>{val}</option>))}
                    </select>
                </div>
                <div className="flex flex-col">
                <label className="text-sm mb-2 mr-s text-gray-700">Photo Upload:</label>
                <input type="file" accept="image/*" className="input" onChange={handlePhotoChange} />

               
                </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Generate ID</button>
             </form>
          </div>
        </div>
    )
}
export default StudentForm;