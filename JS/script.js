{
    const tasks = [ 
        {
            content: "zrobić zadanie",
            done: false,
        },
        {
            content: "przesłuchać moduł",
            done: true,
        },
    ];
    
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString +=`
            <li>
            ${task.content}
            </li>`
        }
        document.querySelector(".js-list").innerHTML = htmlString;
    };
    
    
    const init = () => {
    render();
    }
    init();
}