import {React, useRef} from 'react'
import { useStart } from '../store'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap'
const StartPage = ({goTo}) => {
    const startButtonRef = useRef(null);
    const {startPage, setStartPage} = useStart();
    const handleStart = () =>{
        goTo("home");
        setTimeout(() => {
          setStartPage(false);
        }, (1000));
    }
    useGSAP(() => {
      if (startButtonRef.current){
        const tl = gsap.timeline();
        tl.fromTo(
          startButtonRef.current,
          { y: '1000%' }, 
          { 
            y: '0%',      
            duration: 0.6,
            ease: 'power2.out',
            delay: 1
          }
        )
        const el = startButtonRef.current;
        el.addEventListener('mouseenter', () => gsap.to(el, { y: '-8px', duration: 0.2 }))
        el.addEventListener('mouseleave', () => gsap.to(el, { y: '0px', duration: 0.2 }))

        return () => {
          el.removeEventListener('mouseenter', () => gsap.to(el, { y: '-8px', duration: 0.2 }))
          el.removeEventListener('mouseleave', () => gsap.to(el, { y: '0px', duration: 0.2 }))
        }
    }}, [startPage]);
  return (
    <div className="w-screen h-screen">
      <img src="/Virtual-pet/Start.png" className="absolute w-[65%] inset-x-0 top-1/8 mx-auto"/>
        <button ref={startButtonRef} onClick={handleStart} className="absolute text-4xl inset-x-0 bottom-1/4 mx-auto ">
            Press Start
        </button>
    </div>
  )
}

export default StartPage
