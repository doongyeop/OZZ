'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Loading from '@/app/closet/loading'
import Image from 'next/image'
import AlertModal from '@/components/Modal/AlertModal'

const FormSchema = z.object({
  userId: z.string().min(1, { message: '아이디를 입력해 주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해 주세요.' }),
})

export function InputForm({ mall }: { mall: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태 추가
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string[]>([])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true) // 요청 시작 시 로딩 상태를 true로 설정
    try {
      const response = await fetch(`/apis/${mall}-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      // console.log(result)

      if (result.error) {
        // alert(result.error)
        setAlertMessage(['다시 시도해주세요'])
        setIsAlertOpen(true)

        setIsLoading(false) // 에러 발생 시 로딩 상태를 false로 설정
      } else {
        router.push('/closet')
      }
    } catch (error) {
      // alert('아이디 또는 비밀번호를 확인하세요.')
      setAlertMessage(['아이디 또는', ' 비밀번호를 확인하세요.'])
      setIsAlertOpen(true)

      setIsLoading(false) // 에러 발생 시 로딩 상태를 false로 설정
    }
  }

  if (isLoading) {
    return <Loading /> // 로딩 중일 때 로딩 컴포넌트를 표시
  }

  const handleAlertClose = () => {
    setIsAlertOpen(false)
  }

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-3">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Input placeholder="아이디 (이메일)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="비밀번호" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="bg-black text-white rounded-sm py-2 w-full"
        >
          로그인
        </button>
      </form>

      {isAlertOpen && (
        <AlertModal onClose={handleAlertClose} messages={alertMessage} />
      )}
    </Form>
  )
}

export default function MallLoginForm({ mall }: { mall: string }) {
  const styles: { [key: string]: string } = {
    musinsa: 'bg-black text-white',
    ably: 'border-y-2',
    zigzag: 'bg-[#FA6EE3]',
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`my-1 w-full h-10 px-6 py-2 flex items-center justify-center ${styles[mall]}`}
      >
        <Image
          src={`/images/malls/logo_${mall}.png`}
          alt={mall.toUpperCase()}
          width={0}
          height={0}
          sizes="100%"
          className="h-3 w-auto pe-0.5"
        />
        에서 옷 가져오기
      </div>
      <h1 className="text-lg my-3">로그인</h1>
      <InputForm mall={mall} />
    </div>
  )
}
