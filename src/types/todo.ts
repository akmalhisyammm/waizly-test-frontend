export type TodoPayload = {
  title: string;
};

export type Todo = {
  id: number;
  isCompleted: boolean;
} & TodoPayload;
