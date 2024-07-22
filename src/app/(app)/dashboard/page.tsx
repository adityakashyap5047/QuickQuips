'use client'

import  MessageCard  from '@/components/MessageCard'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Message } from "@/model/User"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { Loader2, RefreshCcw } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false)
  const [profileUrl, setProfileUrl] = useState<string>('')

  const {toast} = useToast();
  const router = useRouter();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter(message => message._id !== messageId))
  }

  const {data: session} = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })

  const {register, watch, setValue} = form;

  const acceptMessages = watch('acceptMessages');
  

  const fetchAcceptMessage = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get<ApiResponse>(`/api/accept-messages`)
      setValue('acceptMessages', response.data.isAcceptinMessage)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "An error occurred while fetching the messages",
        variant: "destructive"
      })
    } finally{
      setIsSwitchLoading(false)
    }
  }, [setValue, toast])

  const fetchMessages = useCallback( async (refresh: boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data.messages || [])
      if(refresh){
        toast({
          title: "Refreshed Messages",
          description: "Showing latest Messages",
        })
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "An error occurred while getting the messages",
        variant: "destructive"
      })
    } finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  }, [setIsLoading, setMessages, toast])

  useEffect(() => {
    if(!session || !session.user) return;
    fetchMessages()
    fetchAcceptMessage()
  }, [session, setValue, fetchAcceptMessage, fetchMessages, session?.user?.username])

  //handle switch change
  const handleSwichChange = async () => {
    try {
      const response = await axios.post<ApiResponse>(`/api/accept-messages`, {
        acceptMessages: !acceptMessages
      }) 
      setValue('acceptMessages', !acceptMessages)
      toast({
        title: response.data.message,
        variant: "default"
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "An error occurred while changing the state of accepting messages",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    const baseurl = `${window.location.protocol}//${window.location.host}`
    setProfileUrl(`${baseurl}/u/${session?.user?.username}`)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast({
      title: "URL Copied",
      description: "Profile URL has been copied to the clipboard",
    })
  }

  if(!session || !session.user){
    return router.push('/');
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded max-w-6xl">
      <h1 className="text-4xl font-bold mb-6">User Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Copy your Unique Link
        </h2>{' '}
        <div className="flex items-center">
          <input type="text" value={profileUrl} disabled className="input input-bordered w-full p-2 mr-2" />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch 
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwichChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">Accept Messages: {acceptMessages ? 'On' : 'Off'}</span>
      </div>
      <Separator/>
      <Button 
        className="mt-4" 
        variant="outline" 
        onClick={(e) => {
            e.preventDefault()
            fetchMessages(true)
          }
        }>
          { isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin"/>
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <MessageCard
                key={index}
                message={message}
                onMessageDelete={handleDeleteMessage} 
              />
            ))
          ) : (
            <p>No message to display.</p>
          )}
        </div>
    </div>
  )
}

export default Page