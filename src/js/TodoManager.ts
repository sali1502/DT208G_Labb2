/* DT208G TypeScript, Moment 2. Åsa Lindskog sali1502@student.miun.se */

//  Interface som används (ej implementeras)
export interface Todo {
    task: string;
    priority: number;
    completed: boolean;
}

// Klass som använder interfacet, men som ej implementerar det
export class TodoList {

    // Array med uppgifter att utföra
    private todos: Todo[] = [];

    // Konstruktor som laddar uppgifter från LocalStorage vid skapande av ett nytt TodoList-objekt
    constructor() {
        this.loadFromLocalStorage();
    }

    // Lägg till nya uppgifter med prioritet 1-3
    public addTodo(task: string, priority: number): { success: boolean, message: string } {

        // Validera uppgift och prioritet
        if (typeof task === "string" && task.trim() !== "") {
            if (typeof priority === "number" && [1, 2, 3].includes(priority)) {
                const newTodo: Todo = {
                    // Ta bort mellanslag
                    task: task.trim(),
                    priority: priority,
                    completed: false
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
        } else {
            return { success: false, message: "Vänligen skriv in en uppgift!" };
        }
    }

    // Markera en uppgift som slutförd baserat på index
    public markTodoCompleted(todoIndex: number): void {
        // Kontrollera att index är giltigt
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            // Markera som slutförd
            this.todos[todoIndex].completed = true;
            // Spara uppdaterad lista till LocalStorage
            TodoList.saveToLocalStorage(this.todos);
        }
    }

    // Spara array med uppgifter till LocalStorage
    static saveToLocalStorage(todos: Todo[]): void {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Hämta array med uppgifter från LocalStorage
    public loadFromLocalStorage(): void {
        const todoStr = localStorage.getItem("todos");
        if (todoStr) {
            this.todos = JSON.parse(todoStr) as Todo[];
        } else {
            // Om inga uppgifter finns - skapa en tom array
            this.todos = [];
        }
    }

    public getTodos(): Todo[] {
        return this.todos;
    }
}
