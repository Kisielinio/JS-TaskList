{
    const tasks =  [];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li
             ${task.done ? "style=\"text-decoration: line-through\"" : ""}
            >
            ${task.content}
            </li>`
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

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    }

    const clearFrom = (newTaskContent) => {
        newTaskContent.forEach(newTaskContent => newTaskContent.value = " ");

    };             



    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        const button = document.querySelector(".js-button");

        form.addEventListener("submit", onFormSubmit);
        button.addEventListener("click", clearFrom);
    };

    init();
}