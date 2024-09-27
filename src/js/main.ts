/* DT208G TypeScript, Moment 2. Åsa Lindskog sali1502@student.miun.se */

import { TodoList } from "./TodoManager"; // Importera klass
import { Todo } from "./TodoManager"; // Importera Interface

const todoList = new TodoList();  // Skapa nytt TodoList-objekt

// Använd TypeScript-typer
const todoForm = document.getElementById("todo-Form") as HTMLFormElement;
const errorMessage = document.getElementById("errorMessage") as HTMLElement;
const todosDiv = document.getElementById("todo-List") as HTMLElement;

// Händelselyssnare för att lägga till uppgifter
todoForm.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    // Hämta värden från formulär med TypeScript-typer
    const task = (document.getElementById("task") as HTMLInputElement).value;
    const priority = parseInt((document.getElementById("priority") as HTMLInputElement).value);

    // Använd metoden addTodo från TodoList
    const result = todoList.addTodo(task, priority);

    // Om tillägget lyckas, rensa formulär och felmeddelanden
    if (result.success) {
        errorMessage.textContent = "";
        todoForm.reset(); // Rensa formulär
        displayTodos(); // Visa en uppdaterad lista med uppgifter att göra
    } else {
        // Om tillägget misslyckas, visa felmeddelande på skärmen
        errorMessage.textContent = result.message;
    }
});

// Funktion för att visa uppgifter
function displayTodos(): void {
    const todos: Todo[] = todoList.getTodos();
    todosDiv.innerHTML = ""; // Rensa tidigare visade uppgifter

    // Sordera uppgifter efter prioritet
    todos.sort((a, b) => a.priority - b.priority);

    todos.forEach((todo, index) => {
        const todoElement = document.createElement("div");
        todoElement.textContent = `${todo.task}, Prio: ${todo.priority}`;
        // Skapa en knapp för att markera uppgift som slutförd
        const completeButton = document.createElement("button");
        completeButton.textContent = "Slutförd";
        completeButton.addEventListener("click", function () {
            todoList.markTodoCompleted(index); // Markera uppgiften som slutförd
            displayTodos(); // Uppdatera todo-listan
        });

        // Om uppgiften är slutförd, markera den visuellt
        if (todo.completed) {
            todoElement.classList.add("completed");
        }

        todoElement.appendChild(completeButton); // Lägg till knappen "Slutförd" till todoElement
        todosDiv.appendChild(todoElement); // Lägg till todoElementet i todosDiv
    });
}

// Visa de uppgifter som finns vid sidladdning
displayTodos();
