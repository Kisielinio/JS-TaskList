{
    let tasks = [];
    let hideDoneTasks;


    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const taskRemove = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const removeEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                taskRemove(index);
            });
        });
    };

    const toggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item" ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
            <button class="list__buttonDone js-done">
             ${task.done ? "✔" : ""}
             </button>
            <span class="list__content ${task.done ? "list__content--done" : ""}" >
            ${task.content}
            </span>
            <button class="list__buttonRemove js-remove">🗑</button>
            </li>
            `;
        }
        document.querySelector(".js-list").innerHTML = htmlString;

        removeEvents();

        toggleDoneEvents();
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="list__buttons js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Show" : "Hide"} Done </button>
            
        <button class="list__buttons js-markAllTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            All Done
        </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDone");

        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", () => {
                tasks = tasks.map((task) => ({
                    ...task,
                    done: true,
                }));
                render();
            });
        };

        const toggleHideDoneTasksButtons = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButtons) {
            toggleHideDoneTasksButtons.addEventListener("click", () => {
                hideDoneTasks = !hideDoneTasks;
                render();
            });
        };
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

    const render = () => {
        renderTask();
        renderButtons();
        bindButtonsEvents();
    };



    const init = () => {

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}