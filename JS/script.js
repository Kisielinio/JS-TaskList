{
    const tasks =  [];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
            <button class="list__buttonDone"> ${task.done ? "✔" : ""}</button>
            <span class="list__content
              ${task.done ? " list__content--done" : ""}">
              ${task.content}
            </span>
            <button class="list__buttonRemove">🗑</button>
            </li>
            `;
        }
        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    }

            

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);       
    };

    init();
}