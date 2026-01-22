import { TodoListItemProps, TodoListProps, TodoListUpdateDto } from "@/app/components/Todo.types";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = 'https://assignment-todolist-api.vercel.app/api/cncn0069/items/'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
    return NextResponse.json({ error: "id 없음" }, { status: 400 });
  }

    const response = await fetch(`${BACKEND_URL + id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const result:TodoListProps = await response.json();
    return NextResponse.json(result, {status: response.status});
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
    return NextResponse.json({ error: "id 없음" }, { status: 400 });
  }

    const response = await fetch(`${BACKEND_URL + id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    let result = null;

    return NextResponse.json(result ?? { success: true },{status: response.status});
}

export async function PATCH(req: NextRequest) {
    const body:TodoListItemProps = await req.json();
    const {id } = body;
    const updateData: TodoListUpdateDto = {
        name: body.name,
        memo: body.memo ?? "",
        imageUrl: body.imageUrl ?? "",
        isCompleted: body.isCompleted
    };
    const response = await fetch(`${BACKEND_URL + id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(updateData)
    })
    let result = await response.json();

    if (!response.ok) {
            console.error("백엔드 API 에러 발생:", result); 
            return NextResponse.json(result, { status: response.status });
        }

    return NextResponse.json(result,{status: response.status});
}