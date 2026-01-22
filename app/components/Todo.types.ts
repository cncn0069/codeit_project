export interface TodoListItemProps {
      id : number,
      name : string,
      memo : string,
      imageUrl: string,
      isCompleted : boolean
}

export interface TodoListUpdateDto {
      name : string,
      memo : string,
      imageUrl: string,
      isCompleted : boolean
}

export interface TodoUrlDto {
    url:string
}

export interface TodoListProps {
    data: TodoListItemProps[];
}