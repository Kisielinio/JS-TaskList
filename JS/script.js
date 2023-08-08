{
    let tasks = [];
    let hideTasks;

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent}];
        render();
    };

    const taskRemove = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];
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

    const toggleEventsDone = () => {
        const toggleButtonsDone = document.querySelectorAll(".js-done");

        toggleButtonsDone.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item ${task.done && hideTasks ? "list__item--hidden" : ""}">
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

        toggleEventsDone();
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="list__buttons js-toggleHideButtonsDone">
            ${hideTasks ? "Show" : "Hide"} Done </button>
            
        <button class="list__buttons js-allTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            All Done
        </button>
        `;
    };

    const bindButtons = () => {
        const allTasksDoneButton = document.querySelector(".js-allTasksDone");

        if (allTasksDoneButton) {
            allTasksDoneButton.addEventListener("click", () => {
                tasks = tasks.map((task) => ({
                    ...task,
                    done: true,
                }));
                render();
            });
        };

        const toggleHideButtonsDone = document.querySelector(".js-toggleHideButtonsDone");

        if (toggleHideButtonsDone) {
            toggleHideButtonsDone.addEventListener("click", () => {
                hideTasks = !hideTasks;
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
        bindButtons();
    };

    const init = () => {

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}