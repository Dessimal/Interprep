"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Control, FieldValues, Path } from "react-hook-form"


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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

interface FormFieldProps <T extends FieldValues>{
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    type?: 'text'|'email'| 'password' | 'file';
}



const FormField = <T extends FieldValues>({control, name, label, placeholder, type='text' }: FormFieldProps<T>) => {

  

  return (
    <Controller
  name={name} control={control} 
  render={({ field }) => (
    <FormItem>
      <FormLabel className="label">{name}</FormLabel>
      <FormControl>
        <Input className="input" placeholder={placeholder} {...field} />
      </FormControl>
      
      <FormMessage />
    </FormItem>
  )}
/>
  )
}

export default FormField