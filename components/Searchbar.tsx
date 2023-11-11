// client side component
"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React from 'react'
import {FormEvent,useState} from 'react'

const isValidAmazonProductURL=(url:string)=>{
  try{
    const parsedURL=new URL(url);
    const hostname=parsedURL.hostname;
    if(hostname.includes('amazon.com')||hostname.includes('amazon.')||hostname.endsWith('amazon'))
    {
      return true;
    }
  }catch(error)
  {
    return false;
  }
  return false;
}
const Searchbar = () => {
  const [searchprompt, setsearchprompt] = useState('');
  const [isloading, setisloading] = useState(false);
  const handleSubmit=async(event: FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const isValidlink=isValidAmazonProductURL(searchprompt);
      console.log(searchprompt);
      if(!isValidlink) return alert('Invalid amazon link')
      try{
        setisloading(true);
        //scarping here
        const product= await scrapeAndStoreProduct(searchprompt);
    }catch(error){
      console.log(error);
    }
    finally{
        setisloading(false);
    }
  }
  return (

    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input type="text" value={searchprompt} onChange={(e)=>setsearchprompt(e.target.value)} placeholder='Enter product link'className='searchbar-input'/>
      <button type="submit" className='searchbar-btn' disabled={searchprompt===''}>{isloading?'Searchin...':'Search'}</button>
    </form>
  )
}

export default Searchbar