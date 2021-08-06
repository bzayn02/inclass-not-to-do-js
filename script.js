const taskList = [];

const badTaskList = [];

const hrWeek = 168;

let taskListHrs=0;
let badTaskListHrs=0;





const handleOnSubmit= e => {
    const formData = new FormData(e);
    const task = formData.get("task");
    const hr = +formData.get("hr");
    const newTask={
        // task:task,
        // hr:hr OR
        task,hr
    };

taskListHrs=taskList.reduce((subTotal,item)=>(subTotal+=item.hr),0);
if (taskListHrs + hr >hrWeek){
return alert("Sorry, you do not have enough hours to allocate this task in the list! Try reducing some other tasks.");
}

document.getElementById("totalHrs").innerText=taskListHrs+hr;
    
    // console.log(newTask)

//pushing list to the global array
taskList.push(newTask);
console.log(taskList)
    displayTaskList();
  
};

//displaying teh tasks lists
const displayTaskList = () =>{
let tasks = "";

    taskList.map((item,i)=>{
        tasks += `
        <li>
								<div class="items">
									<span class="item">
										<input type="checkbox" /><label for=""
											>${item.task}</label
										></span
									>
                                    <span class="hrs">${item.hr}hrs/w</span>
                                    <button onclick="markAsNotToDoTask(${i})">Mark Not To Do</button>
                                    <button onclick="deleteItem(${i})">Delete</button>
								</div>
							</li>
        `;
    });


    document.getElementById("to-do-list").innerHTML = tasks;
};



//displaying bad task list
const displayBadTaskList = () =>{
    let tasks = ""
    
        badTaskList.map((item,i)=>{
            tasks += `
            <li>
                                    <div class="items">
                                        <span class="item">
                                            <input type="checkbox" /><label for=""
                                                >${item.task}</label
                                            ></span
                                        >
                                        <span class="hrs">${item.hr}hrs/w</span>
                                        
                                        <button onclick="markToDoTask(${i})">Mark To Do</button>
                                    </div>
                                </li>
            `;
        });
    
    
    
        document.getElementById("bad-task-list").innerHTML = tasks;
        totalBadHours();
    };

//marks the task as not to do list function
const markAsNotToDoTask=i=>{
    //steps to shift to not to do list
    //1. find out which item is clicked
  

    //2. remove that item from the array and put in the variable

    const item = taskList.splice(i,1)[0];
    badTaskList.push(item);
    //3. we need to have the variable to store in not to do itemslist
    //4. 
    //5. loop through the array adn display in the bad task list
    displayTaskList();
    displayBadTaskList();
};


const markToDoTask=i=>{
    //steps to shift to not to do list
    //1. find out which item is clicked


    //2. remove that item from the array and put in the variable

    const item = badTaskList.splice(i,1)[0];
    taskList.push(item);
    //3. we need to have the variable to store in not to do itemslist
    //4. 
    //5. loop through the array adn display in the bad task list
    displayTaskList();
    displayBadTaskList();
};

//deleting items function
const deleteItem = (i) => {
    taskList.splice(i,1);
    
    displayTaskList();
    totalTaskHours();
};

//calculate bad hours

const totalBadHours = () => {
    const total = badTaskList.reduce((subTotal, item) => (subTotal += item.hr),0);
    document.getElementById("totalBadHrs").innerText = total;
};


//calculate total task hours
const totalTaskHours = () =>{
const total = taskList.reduce((subTotal,item)=>(subTotal += item.hr),0);
document.getElementById("totalHrs").innerText=total;
};