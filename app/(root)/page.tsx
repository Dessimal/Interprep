import InterviewCard from '@/components/interviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews, interviewCovers } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
      <h2>Get Interview-Ready with AI-Powered Practise & Feedback</h2>
      <p className='text-lg'>Practise on real interview questions & get instant feedbacks</p>

      <Button asChild className="btn-primary max-sm:w-full">
        <Link href="/interview"> Start an Interview</Link>
      </Button>
      </div>

      <Image src='/robot.png' alt='robot' width={400} height={400} className='max-sm:hidden'/>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your interviews</h2>

      <div className='interviews-section'>
        {dummyInterviews.map((interview)=>(
          <InterviewCard {...interview} key={interview.id}/>
        ))}               
      </div>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>  
      <div className='interviews-section'>
      {dummyInterviews.map((interview)=>(
          <InterviewCard {...interview} key={interview.id}/>
        ))}  
      </div>
    </section>
    </>
  )
}

export default page