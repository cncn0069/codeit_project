import { CreateDto } from "@/app/components/Dto.types";
import { TodoListProps } from "@/app/components/Todo.types";
import { NextResponse } from "next/server";


const BACKEND_URL = 'https://assignment-todolist-api.vercel.app/api/cncn0069'

export async function GET() {
    const response = await fetch(`${BACKEND_URL + '/items'}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const result:TodoListProps = await response.json();
    return NextResponse.json(result, {status: response.status});
}

// 할일 추가
export async function POST(request: Request) {
    const body:CreateDto = await request.json();

    const response = await fetch(`${BACKEND_URL + '/items'}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    const result = await response.json();

    return NextResponse.json(result, {status: response.status});
}

export async function DELETE() {
    
}

export async function PATCH() {
    
}