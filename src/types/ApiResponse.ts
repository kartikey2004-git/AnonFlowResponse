import { Message } from "@/models/User"
export interface ApiResponse{
 success: boolean 
 message: string
 isAcceptingMessages?: boolean

 // kuch api response is tarike se bhi honge, jaha pr sirf user ne msg bheja hai sirf , kayi msgs ayenge

 // ye apiResponse is tarike se bhi jaise ki apne database se bahut saare msgs collect kiye ho, usko aap show krwana chahte ho

 messages?: Array<Message>
}

