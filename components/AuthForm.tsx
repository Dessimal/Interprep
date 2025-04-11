"use client"
import FormField from "./FormField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

const authFormSchema = (type: FormType) =>{
  return z.object({
    name: type === 'sign-up'? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  })
}

const AuthForm = ({type}: {type: Formtype}) => {
const router= useRouter();


  const formSchema = authFormSchema(type)
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        password: "",
    }
})

function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    if(type === "sign-up"){
      toast.success('Account created successfully. Please sign in.');
      router.push('/sign-in')
      
    }else{
      toast.success('Signed in successfully')
      router.push('/')
    }
    
  } catch (error) {
    console.log(error);
    toast.error("There was an error")
  }
}


const IsSignIn = type === "sign-in"

    return (
      <div className="card-border lg:min-w-[566px]">
          <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
              <Image src="/logo.svg" alt="logo" height={32} width={38} />
              <h2 className="text-primary-100">InterPrep</h2>
            </div>
              <h3>Pratice job interview with AI</h3>


              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                {!IsSignIn && <FormField 
                control= {form.control} name= "name" label="Name" placeholder="Your Name"
                />}
                <FormField 
                control= {form.control} name= "email" label="Email" placeholder="Your Email Address"
                />
                <FormField 
                control= {form.control} name= "password" label="Password" placeholder="Your Password"
                />
                
                  <Button className="btn"  type="submit">{IsSignIn ? "Sign in" : "Create an Account"}</Button>
                </form>
              </Form>

              <div className="flex flex-row w-full justify-center">
                <p className="text-center">{IsSignIn ? "No account yet?" : "Have an account already?"}</p>
                <Link href={!IsSignIn ? "/sign-in" : "/sign-up"} className="text-user-primary font-bold cursor-pointer ml-1">{!IsSignIn ? "Sign in" : "Sign up"}</Link>
              </div>
        </div>

      </div>

      )
}

export default AuthForm