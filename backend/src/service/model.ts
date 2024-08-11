export interface Project {
    id: number
    name: string
    tasks: Task[]
  }
  export interface Task {
    id: number
    name: string // 任务名称
    // detail: string; // 任务详情
    // ddl: string; // 截止日期，以字符串形式
    // file: File | null; // 附件，可以是一个File对象，或者为null表示没有附件
    isTaskCompleted: boolean // 任务是否已完成
  }
export interface User {
    username: string
    password: string
  }