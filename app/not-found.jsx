import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const notfound = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
    <p> 404 page not found </p>
   <br />
    <Link href="/"> <Button>Return to home</Button></Link>
   
    </div>
  )
}

export default notfound
