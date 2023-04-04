{
    const tasks =  [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const taskRemove = (index) => {
        tasks.splice(index,1);
                render();
    };

    const toggleDoneTask = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    bindsEvent = () => {
        const buttonRemove = document.querySelectorAll(".js-remove");
        
        buttonRemove.forEach((buttonRemove, index) => {
            buttonRemove.addEventListener("click", () => {
                taskRemove(index);
            })
        });

        const toggleDone = document.querySelectorAll(".js-done");
        
        toggleDone.forEach((toggleDone, index) => {
            toggleDone.addEventListener("click", () => {
                toggleDoneTask(index);
            })
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
            <button class="list__buttonDone js-done"> ${task.done ? "✔" : ""}</button>
            <strong class="list__content ${task.done ? "list__content--done" : ""}"
            >
            ${task.content}
            </strong>
            <button class="list__buttonRemove js-remove">🗑</button>
            </li>
            `;
        }
        document.querySelector(".js-list").innerHTML = htmlString;

        bindsEvent();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

            

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);       
    };

    init();
}