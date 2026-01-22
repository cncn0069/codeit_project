'use client'
import { deleteTodo, updateTodo, uploadTodoImage } from '@/app/action';
import MemoCRUDButton from '@/app/components/ui/MemoCRUDButton';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

function EditTodoForm({initialData,id}:any) {
    
    const [todoDetail, setTodoDetail] = useState(initialData);
    const [memo, setMemo] = useState('');
    const [editFlag, setEditFlag] = useState(false);
    const [imageFlag, setImageFlag] = useState(false);
    
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        if (!selectedFile.type.startsWith("image/")) {
            alert("이미지 파일만 업로드 가능합니다.");
            return;
        }
        setFile(selectedFile);
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
            setPreview(reader.result as string);
        };
        setImageFlag(true);
    };


    const handleDelete = async () => {
        await deleteTodo(id);
        router.push('/');
    };

    const handleSave = async () => {
        let imageUrl = todoDetail.imageUrl;

        if (file) {
            const formData = new FormData();
            formData.append('image',file);

            const res = await uploadTodoImage(formData);
            imageUrl = res.url;
        }

        await updateTodo({...todoDetail, imageUrl});
        
        router.push('/')
    };

    useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 패딩을 0으로 잠시 초기화해서 순수 콘텐츠 높이를 측정
    textarea.style.paddingTop = '0px';
    const contentHeight = textarea.scrollHeight;
    const containerHeight = 311; // 부모 컨테이너 높이

    // 컨테이너 높이에서 콘텐츠 높이를 뺀 나머지의 절반을 상단 패딩으로 설정 (수직 중앙 정렬 효과)
    // 단, 제목(Memo) 공간과 최소 패딩(16px)을 고려함
    let calculatedPadding = Math.floor((containerHeight - contentHeight) / 2);
    
    // 최소 40px(제목 공간) ~ 최대 120px 사이로 조절
    const finalPadding = Math.max(Math.min(calculatedPadding, 120), 40);

    textarea.style.paddingTop = `${finalPadding}px`;
}, [memo]);

    useEffect(() => {
        if (!todoDetail || !initialData) return;
        const isChanged =
        todoDetail.name !== initialData.name ||
        todoDetail.memo !== initialData.memo ||
        todoDetail.isCompleted !== initialData.isCompleted ||
        preview !== null;

        setEditFlag(isChanged);
    }, [todoDetail, preview, initialData]);

  return (
    <div className='flex flex-col gap-4 bg-white'>
      {/* 상단 */}
      <div className={`flex border-2 rounded-2xl w-full h-[64px] items-center justify-center gap-2 px-4 ${todoDetail?.isCompleted ? "bg-[#ddd6fe]" : "bg-white"}`} >        
        <Image 
          onClick={()=>setTodoDetail({...todoDetail, isCompleted:!todoDetail.isCompleted})} 
          src={todoDetail?.isCompleted ? '/ic/checkbox/checkbox.svg' : '/ic/checkbox/emptybox.svg'} 
          alt='todo' height={32} width={32} 
          className='cursor-pointer'
        />
        <input 
          style={{ fieldSizing: 'content' }} // 글자 길이에 맞춰 너비 자동 조절
          className='min-w-[50px] max-w-full text-[20px] font-bold underline outline-none bg-transparent text-center'
          value={todoDetail?.name ?? ""} 
          onChange={(e) => {
            if (!todoDetail) return;
            setTodoDetail({ ...todoDetail, name: e.target.value });
          }}
        />
      </div>

      {/* 중간 */}
      <div className='grid grid-cols-1 lg:grid-cols-[384fr_588fr] gap-4'>
        <div className="relative border-3 rounded-3xl border-dashed border-[#cbd5e1] h-[311px] bg-[#f8fafc] overflow-hidden">
          <input id="image-upload" type="file" accept="image/*" hidden onChange={handleImageChange} />
          
          {preview ? (
            <Image src={preview} alt="preview" fill className="object-cover" />
          ) : todoDetail?.imageUrl ? (
            <Image src={todoDetail.imageUrl} alt="detail" fill className="object-cover" />
          ) : (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Image src='/ic/defaultView.svg' alt="defaultView" height={64} width={64} />
            </div>
          )}

          <label htmlFor="image-upload" className="absolute right-3 bottom-3 cursor-pointer">
            <Image
              src={(imageFlag || todoDetail?.imageUrl ? "/img/btn/edit.svg" : "/img/btn/plus.svg")}
              alt="action button"
              width={64}
              height={64}
            />
          </label>
        </div>

        <div className='border rounded-3xl border-none h-[311px] relative overflow-hidden'>
          {/* 배경 */}
          <Image className='object-cover' src={'/img/memo.svg'} alt='memo' fill />
          {/* 작성영역 */}
          <div className="absolute top-4 left-4 right-4">
            <h2 className="text-[#92400e] text-lg font-bold truncate text-center">Memo</h2>
          </div>

          <div className="absolute top-12 bottom-4 left-4 right-4 flex flex-col">
            <textarea
              ref={textareaRef}
              value={todoDetail?.memo ?? ""}
              onChange={(e) => {
                setMemo(e.target.value);
                if (todoDetail) setTodoDetail({ ...todoDetail, memo: e.target.value });
              }}
              placeholder="메모를 입력하세요"
              className="w-full h-full resize-none outline-none bg-transparent text-center leading-6 px-4 overflow-y-auto scrollbar-hide"
            />
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div className='flex gap-4 justify-end items-stretch'>
        <MemoCRUDButton 
          action="edit" 
          stat={editFlag ? "active" : "default"} 
          onClick={handleSave} 
          className="h-[168px] w-[168px] shrink-0"
        />
        <MemoCRUDButton 
          action="delete" 
          stat="default" 
          onClick={handleDelete} 
          className="h-[168px] w-[168px] shrink-0"
        />
      </div>
    </div>
  )
}

export default EditTodoForm