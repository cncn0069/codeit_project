import { TodoListProps } from "@/app/components/Todo.types";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const imageFile = data.get("image");

        if(!imageFile) {
            return NextResponse.json({error:"이미지가 없습니다."},{status:400});
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await fetch(
            `https://assignment-todolist-api.vercel.app/api/cncn0069/images/upload`,
            {
                method:"POST",
                body:formData,
            }
        )
        const result = await response.json();
    return NextResponse.json(result, { status: response.status });
    } catch (error) {
        return NextResponse.json({error:"전송 실패"},{status:500});
    }
}