/*IT GETS AN ARGUMENT AND STORES IT INTO A VARIABLE, THUS IT CAN GET HIS PARENT THE ELEMENT AND REMOVE FROM DOM THE ELEMENT ITSELF*/
function deleteItem(e){
    var element = e.currentTarget.closest('.taskSingle')
    var parent = element.parentElement
    parent.removeChild(element)
    addListToMemory()
}


/*FIRST IT GETS THE input#newTask VALUE AND CREATE AN ELEMENT WITH IT, THEN IT SETS IT'S innerHTML WITH THE REMAINING ELEMENTS AND ADDS IT TO THE DOM. AFTER THIS WE RUN THE all() FUNCTION. THIS FUNCTION STORAGES ALL THE OTHERS FUNCTIONS AND BY RUNNING IT AFTER ADDING OUR ELEMENT TO THE DOM WE CAN SET OUR NEWEST DYNAMICALLY ADDED ELEMENTS*/
function addTask(e){
    e.preventDefault()
    var task = document.querySelector("#newTask").value

    var newDiv = document.createElement("div")
    newDiv.classList.add('taskSingle')
    newDiv.innerHTML = `
    <form action="">
        <div class="checkBox">
            <input type="checkbox" name="check" id="check">
        </div>
        <p>
            ${task} 
        </p>
        <textarea name="tasks" oninput="auto_grow(this)" onfocus="auto_grow(this)">${task}</textarea>
        <div class="action">
            <div class="pencil">
                <i class="bx bxs-pencil"></i>
            </div>
            <div class="trashCan">
                <i class="bx bxs-trash-alt"></i>
            </div>
        </div>
    </form>
    `
    document.querySelector('.toDo .tasksContainer').appendChild(newDiv)
    all()

    document.querySelector("#newTask").value = ''
    addListToMemory()
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

/*AFTER THE PAGE IS LOADED, THIS FUNCTION RUNS A LOOP OF OUR LOCALSTORAGE ELEMENTS MAKING EACH ONE OF THEM BECOME A TASK. IT ALSO VERIFIES IF THE TASK IS EITHER DONE OR NOT ADDING IT INTO DIFFERENT CONTAINERS*/
function fillList(){
    var tasks = JSON.parse(localStorage.getItem("tasks"))
    if(tasks){
        tasks.forEach((p, index)=>{
            obj = Object.entries(p)

            let text = obj[0][1]
            let checked = obj[1][1]
            
            let taskSingle = document.createElement('div')
            taskSingle.setAttribute("class", 'taskSingle')

            if(checked == "false"){
                var pencil = `<div class= 'pencil'>
                                <i class='bx bxs-pencil'></i>
                            </div>`

                var p = `
                        <p>
                        ${text}
                        </p>
                        <textarea name="tasks" oninput="auto_grow(this)" onfocus="auto_grow(this)">${text}</textarea>
                `

                var checkBox = ""
            }else{
                var pencil = ""
                var p = `<p><del>${text}</del></p>`
                var checkBox = "checked"
            }

            taskSingle.innerHTML = `
                    

                    <form action="">
                        <div class="checkBox">
                            <input type="checkbox" name="check" id="check" ${checkBox}>
                        </div>
                        ${p}
                        <div class="action">
                            ${pencil}
                            <div class="trashCan">
                                <i class='bx bxs-trash-alt' ></i>
                            </div>
                        </div>
                    </form>
            
    
            `

            if(checked == "false"){
                document.querySelector(".toDo .tasksContainer").appendChild(taskSingle)
            }else if(checked == "true"){
                document.querySelector(".done .tasksContainer").appendChild(taskSingle)
            }

        })
    }   
}

/*IT TOGGLES OUR TASK </p> TAG WITH A TEXTAREA CONTAINING THE SAME TEXT. BY CLICKING ON THE PENCIL ICON E TYPING INTO OUR TEXTAREA, WE UPDATE OUR </p> TAG AND THE TASK AS WELL */
function editTask(e){
    e.closest("form").classList.toggle('taskEdit')
    var textarea = e.closest("form").querySelector('[name=tasks]')
    var p = e.closest("form").querySelector('p')
    textarea.focus()
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    
    textarea.addEventListener('blur', function(){
        p.innerHTML = textarea.value.trim()
        e.closest("form").classList.remove('taskEdit')
        addListToMemory()
    })
}

/*STORAGES THE TASKS INTO A LOCALHOST ITEM*/
function addListToMemory(){
    localStorage.setItem("tasks", JSON.stringify(currentList()));
}

/*THIS FUNCTION RUNS A LOOP OF OUR CURRENT TASK ITEMS, VERIFIES WHETHER THE TASK IS EITHER DONE OR NOT AND RETURNS AN ARRAY OF OUR TASKS*/
function currentList(){
    const currentTasks = []
    const taskAll = document.
    querySelectorAll('input[type=checkbox]')
    taskAll.forEach((task, index)=>{
        const taskSingle = {}
        let nome = task.closest('form').querySelector("p").innerText
        taskSingle["text"] = nome

        
        task.checked == true ? taskSingle["checked"] = "true" : taskSingle["checked"] = "false"
        currentTasks.push(taskSingle)

    })
    return currentTasks
}

/*STORAGES ALL EVENT LISTENERS, SO WE CAN RUN THIS TASK AFTER DYNAMICALLY ADDED ELEMENTS AND HANDLE THEM*/
function all(){
    document.querySelectorAll('.trashCan i').forEach((i)=>{
        i.addEventListener('click', deleteItem)
    })
    
    $(function(){
        $('#submitTask').unbind().click(function(e){
            addTask(e)
        })
    })

    document.querySelectorAll('input[type=checkbox]').forEach((input)=>{
        input.addEventListener('change', addListToMemory)
    })

    $(function(){
        $('.pencil i').unbind().click(function(e){
            editTask(e.currentTarget)
        })
    })

    
}

fillList()
all()