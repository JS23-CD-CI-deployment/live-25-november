import { http, HttpResponse } from "msw";

const todos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
];

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/todos", () => {
    return HttpResponse.json(todos);
  }),

  http.post(
    "https://jsonplaceholder.typicode.com/todos",
    async ({ request }) => {
      const { todo } = await request.json(); // Hämta ut vår body

      const newTodo = {
        id: todos.length,
        title: todo,
        userId: 1,
        completed: false,
      };

      todos.push(newTodo);

      return HttpResponse.json(todos);
    }
  ),

  http.put("https://jsonplaceholder.typicode.com/todos/:id", () => {
    return HttpResponse.json({ success: true });
  }),

  http.delete(
    "https://jsonplaceholder.typicode.com/todos/:id",
    ({ params }) => {
      const { id } = params; // Plocka ut vilket id

      const deletedTodo = todos.filter((todo) => {
        if (todo.id === id) {
          return todo;
        }
      });

      if (deletedTodo.length === 0) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(deletedTodo);
    }
  ),
];
