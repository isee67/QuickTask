export interface Project {
    id: number
    name: string
    tasks: Task[]
  }
  export interface File {
    name: string;
    type: string;
    previewURL: string;
    // downloadURL: string;
  }

  export interface MyComment {
    id: number
    author: string
    content: string
    date: string
  }
  export interface TaskDetails {
    details: string
    ddl: string
    files: File[]
    comments: MyComment[]
  }

  export interface Task {
    id: number
    name: string // 任务名称
    isTaskCompleted: boolean // 任务是否已完成
    details: TaskDetails
  }
export interface User {
    username: string
    password: string
  }

