import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

const page = async() => {
  const session=await auth();
  const id=session.user.id;
  if(!session.user){
    redirect('/login');

  }
  if(!session.user.role){
    redirect('/select');
  }
  if(session.user.role==="SHOPKEEPER"){
    redirect(`/dashboard/shopkeeper/${id}`)
  }
  if(session.user.role==="CUSTOMER"){
    redirect(`/dashboard/student/${id}`)
  }
    //redirect('/dashboard/student')
  
}

export default page
