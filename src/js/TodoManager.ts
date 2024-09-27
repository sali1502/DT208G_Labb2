/* DT208G TypeScript, Moment 2. Åsa Lindskog sali1502@student.miun.se */

//  Interface som används (ej implementeras)
export interface Todo {
    task: string;
    priority: number;
    compleated: boolean;
}

// Klass som använder interfacet, men som inte implementerar det
export class TodoList {

    // Array med uppgifter att utföra
    private todos: Todo[] = [];

    // Konstruktor som laddar uppgifter från LocalStorage vid skapande av ett nytt TodoList-objekt
    constructor() {
        this.loadFromLocalStorage();
    }
}

// Lägg till nya uppgifter med prioritet 1-3
public addTodo(task: string, prioroty: number): { sucess: boolean, message: string } {

    // Validera uppgift och prioritet
    if (typeof task === "string" && task.trim() !== "") {
        if (typeof priority === "number" && [1, 2, 3].includes(priority)) {
            const newTodo: Todo = {
                // Ta bort mellanslag
                task: task.trim(),
                priority.priority,
                compleated: false
            };
            // Lägg till ny uppgift i listan
            this.todos.push(newTodo);
            // Spara i LocalStorage
            TodoList.saveToLocalStorage(this.todos);
            // Returnera true om inmatningen i formuläret korrekt (1-3)
            return { success: true, message: "" };
        } else {
            // Returnera false ocm inmatning i formuläret ej är korrekt 
            return { success: false, message: "Prio måste vara 1, 2 eller 3!" };
        }
    }


// Spara array med uppgifter till LocalStorage
static saveToLocalStorage(todos: Todo[]): void {
        // Sparar en array av Todo
        localStorage.setItem("todos", JSON.stringify(todos));
    }

// Hämta array med uppgifter från LocalStorage
public loadFromLocalStorage(): void {
        const todosStr = localStorage.getItem("todos");
        if(todoStr) {
            this.todos = JSON.parse(todoStr) as Todo[];
        } else {
            // Om inga uppgifter finns - skapa en tom array
            this.todos = [];
        }
    }

public getTodos(): todo[] {
        return this.todos;
    }