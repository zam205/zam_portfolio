import { useState, useEffect, useRef } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import LaptopModel from '../../components/LaptopModel';
import TypingEffect from '../../components/TypingEffect/TypingEffect';
import './styles/home.css';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { useMediaQuery } from 'react-responsive';
import { FaCircleDot } from "react-icons/fa6";
import VideoPlay from '../../components/VideoPlay/VideoPlay';
import { IoCaretBackCircleSharp } from "react-icons/io5";
// #####
import { FaHtml5 } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { SiSass } from "react-icons/si";
import { FaReact } from "react-icons/fa6";
import { RiNextjsFill } from "react-icons/ri";
import { SiPusher } from "react-icons/si";
import { SiSocketdotio } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { FaLaravel } from "react-icons/fa";
import { RiPhpLine } from "react-icons/ri";
import { SiMysql } from "react-icons/si";
import { DiRedis } from "react-icons/di";
import { IoLogoDocker } from "react-icons/io5";
import { SiWebrtc } from "react-icons/si";
import { SiRedux } from "react-icons/si";
import { SiNginx } from "react-icons/si";

export function Page() {
  const container3D = useRef(null);
  const cameraRef = useRef(null); 

  const [sizeCamera, setSizeCamera] = useState(35);

  const activeMenu = useMediaQuery({ query: '(max-width: 700px)' });

  // useEffect(() => {
  //   if (activeMenu) {
  //     setSizeCamera(35);
  //     console.log('Big LapTop')
  //   } else {
  //     setSizeCamera(30)
  //     console.log('Small LapTop')
  //   }
  // }, [activeMenu])

  // حساب الـ FOV بناءً على عرض الشاشة
  function calculateFov(width) {
    if (width > 1000) return 35; // شاشة عريضة
    if (width > 773) return 55; // شاشة متوسطة
    return 35; // شاشة صغيرة
  }

  useEffect(() => {
    setSizeCamera(calculateFov(window.innerWidth));

    // تحديث الـ fov عند تغيير عرض النافذة
    const handleResize = () => {
      const newFov = calculateFov(window.innerWidth);
      setSizeCamera(newFov);

      // تحديث الكاميرا يدويًا
      if (cameraRef.current) {
        cameraRef.current.fov = newFov;
        cameraRef.current.updateProjectionMatrix(); // إعادة تحديث الـ projection
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className='relative'>
      <div className="section-one mt-[-58px] pt-[50px]">

        
        {/* <NavBar /> */}
  
        <div className="back-icon-left select-none">{'<'}</div>
        <div className="back-icon-right select-none">{'>'}</div>
  
        <div className="[@media(max-width:773px)]:h-[100vh]">
    
          <div className="cover-landing z-10">
            
            <div className="displaying">
              <h1 className='text-3xl text-white font-bold'>Hi, It's 
                <span className='text-indigo-700'>
                  { ' Ziad'}
                </span>
              </h1>
              <TypingEffect  />
  
              <p className='px-[75px] text-center text-white'>As a Full-Stack Developer, I specialize in building user-centric applications from scratch to deployment. Whether it's creating interactive UIs or optimizing server-side performance, 
                I love solving complex problems and delivering elegant solutions</p>
  
              <div className="social-links">
                <a href="" className='link-social' target='_blank'>
                  <FaLinkedin />
                </a>
                <a href="" className='link-social' target='_blank'>
                  <FaGithub />
                </a>
                <a href="" className='link-social' target='_blank'>
                  <FaXTwitter />
                </a>
              </div>
  
              <a href="/ZamResume.pdf" download="ZamResume.pdf">
                <button className='btn-down-resume'>Download Resume</button>
              </a>
            </div>
    
    
              <div ref={container3D} id="container3D" className='
                '>
                <Canvas
                  onCreated={({ camera }) => {
                    cameraRef.current = camera; 
                  }}
                  camera={{ position: [-5, 2, 5], fov: sizeCamera }}
                  style={{ width: "40vw", height: "calc(100vh - 58px)" }}
                  // className='w-[50vw] h-[clac(100vh-58px)]'
                  className='canva-model'
                  >
                  {/* إضاءة */}
                  <ambientLight intensity={8} />
                  <directionalLight position={[30, 20, 500]} intensity={1} />
                  {/* الموديل */}
                  <LaptopModel scale={0.5} position={[0, -1, 0]} />
                  {/* التحكم في الكاميرا */}
                  <OrbitControls  
                    enableDamping
                    dampingFactor={0.1} // معدل التخميد لتحسين الانتقالات
                    enableZoom={false}
                    />
                </Canvas>
              </div>
            </div>
        </div>

      </div>

      <SectionTwo />

      <SectionThree />

      <SectionFour />
    </div>
  )
}

function SectionTwo() {

  const [statusShowClone, setStatusShowClone] = useState(false);

  const handleShowVideo = () => {
    setStatusShowClone(true)
  }

  return (
    <div className="section-two flex [@media(max-width:773px)]:flex-col relative w-full h-screen pt-[58px]" id='about' >
        <h1 className='mx-auto text-indigo-700 text-[150px] select-none'>
          {'<'} 
            <span className='text-[100px] text-white'>Ziad</span>
          {'>'}
        </h1>
        
        { !statusShowClone && (
          <div className="content-about w-[70%] mx-auto mt-[20%] [@media(max-width:773px)]:mt-[20px] flex flex-col gap-5">
            <h1 className='text-5xl mt-[10px] font-extrabold text-white '>About 
              <span className='text-indigo-700'> Me</span>
            </h1>
            <h1 className='text-indigo-700 text-xl'>Full-Stack Developer</h1>
            <div className='text-white flex flex-col gap-2'>
              <div className='flex gap-2 items-center'>
                <FaCircleDot className='text-indigo-700' />
                <p>I started my journey as a developer in 2 years . Since then, I have been creating modern, 
                  user-friendly websites and applications that solve real-world problems.</p>
              </div>
              <div className='flex gap-2 items-center'>
                <FaCircleDot className='text-indigo-700' />
                <p>I thrive on challenges and constantly set goals for myself to learn new skills. 
                  I’m always looking for opportunities to improve and grow.</p>
              </div>
            </div>
  
            <button className='btn-show-clone' onClick={handleShowVideo}>Show Me Clone Facebook</button>
          </div>
        )}

        {
          statusShowClone && (
            <div className='w-[70%] flex flex-col gap-[15px] mx-auto mt-[10%] [@media(max-width:773px)]:mt-[20px]'>
              <div>
                <button onClick={() => setStatusShowClone(false)} 
                className='text-indigo-700 hover:text-indigo-800 flex gap-2 items-center'>
                  <IoCaretBackCircleSharp className='text-3xl' />
                  <h1 className='text-2xl front-extrabold'>Back</h1>
                </button>
              </div>
              <div className='flex gap-2 items-center text-white mb-[15px]'>
                <FaCircleDot className='text-indigo-700' />
                <p>Discover all that this unique site I developed has to offer - similar to Facebook in its features and more! 
                  Watch the video to learn about my skills in building professional projects.</p>
              </div>
              <div className='w-[400px] [@media(max-width:500px)]:w-[320px]'>
                <VideoPlay src={'/clone_facebook.mp4'} />
              </div>
            </div>
          )
        }
      </div>
  )
}

function BoxService({
  header,
  body
}) {
  const [TextBody, setTextBody] = useState([]);

  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body])

  return (
    <div className='box-service p-2.5 bg-neutral-950 w-[250px] h-[250px] rounded-md border-[1px] border-gray-500 hover:border-indigo-600 hover:shadow-lg
      hover:shadow-indigo-700 flex flex-col gap-3 overflow-y-auto'>
        <h1 className='text-indigo-700 font-bold text-xl text-center'>{ header }</h1>
        {
          TextBody.length > 0 && TextBody.map((text, i) => {
            return <div className='flex gap-2 text-base items-center text-white p-1' key={i}>
              <FaCircleDot className='text-indigo-700 text-[13px]' />
              <p>{ text }</p>
            </div>
        })  
      }
    </div>
  )
}

function SectionThree() {

// border-2 border-gray-500 960px
  return (
    <div className="section-three bg-neutral-900 relative w-full min-h-screen  pt-[58px] pb-[30px]" >
      <h1 className='text-5xl mt-[10px] font-extrabold text-white text-center my-[20px]'>Our
      <span className='text-indigo-700'> Service</span></h1>
      <div className="container-boxs grid justify-items-center [@media(min-width:960px)]:grid-cols-3 [@media(min-width:632px)]:grid-cols-2
      [@media(max-width:632px)]:grid-cols-1 gap-2 w-[80%] mx-auto">
        <BoxService header={'Web Development'} body={['Design and develop responsive websites that work efficiently on all devices.',
          'Build SEO-Friendly websites to increase reach and visibility.', 'Integration of websites with electronic payment and shipping systems.',
          'Develop attractive and user-friendly user interfaces (UI/UX Design).']} />
          {/* ##### */}
        <BoxService header={'Backend Development'} body={['Develop robust server applications using framework like Laravel',
          'Building and designing RESTful APIs to facilitate communication between systems.', 'Create Database Management Systems to protect and organize information.',
          'Developing Automated Email Sending Systems to manage customer communication.']}/>
          {/* ##### */}
        <BoxService header={'WebSocket Integration'} body={['Develop interactive applications based on real-time communication.', 
          'WebSocket integration to create applications such as live chat, instant updates.', 'Improve application performance using technologies like Socket.IO & Pusher.']}/>
          {/* ##### */}
        <BoxService header={'E-Commerce Solutions'} body={['Integration with electronic payment systems such as PayPal, Stripe, Fawry, MyFatoorah.',
          "Manage and customize e-store templates to suit the client's brand identity."]} />
          {/* ##### */}
        <BoxService header={'Maintenance & Support'} body={['Providing periodic maintenance services to ensure the continuity of websites and applications.']} />
          {/* ##### */}
        <BoxService header={'Custom Software Solutions'} body={['Develop custom software based on unique business needs.', 
          , 'Create custom content management systems (CMS) to facilitate content management.', 'Develop management tools to improve internal corporate processes.']} />
          {/* ##### */}
        <BoxService header={'Cloud Integration'} body={['Efficiently manage cloud databases and store files.', ]} />
          {/* ##### */}
        <BoxService header={'Performance Optimization'} body={['Improve website and app loading speed to enhance user experience.',
          'Reduce server response time by using caching techniques.', 'Improve database performance to ensure fast access to information.']} />
          {/* ##### */}
        <BoxService header={'Security Solutions'} body={['Implement security best practices to protect applications from hacks.', 
          'Implement data encryption systems to protect sensitive information.']} />
      </div>
    </div>
  )
}

function SectionFour() {

  function BoxService({
    children,
    title
  }) {
  
    return (
      <div className='box-service p-2.5 bg-neutral-950 w-[100px] h-[100px] rounded-md border-[1px] border-gray-500 hover:border-indigo-600 hover:shadow-lg
        hover:shadow-indigo-700 flex flex-col gap-3 overflow-y-auto items-center text-white hover:text-indigo-700'>
          <div>{ children }</div>

          <h1>{ title }</h1>
      </div>
    )
  }

  return (
    <div className="section-four relative w-full h-screen pt-[58px]" >
      <h1 className='text-5xl mt-[10px] font-extrabold text-white text-center my-[20px]'>My
      <span className='text-indigo-700'> Skills</span></h1>

      <h1 className='mx-auto text-indigo-700 text-[45px] select-none'>
        {'<'} 
          <span className='text-[45px] text-white'>Technologies</span>
        {'>'}
      </h1>
      
      <div className="container-skills">
        <BoxService title={'Html'}>
          <FaHtml5 className='icon-tech text-orange-500'/>
        </BoxService>

        <BoxService title={'JavaScript'}>
          <FaJsSquare className='icon-tech text-yellow-400'/>
        </BoxService>

        <BoxService title={'Css'}>
          <FaCss3Alt className='icon-tech text-blue-600'/>
        </BoxService>

        <BoxService title={'Sass'}>
          <SiSass className='icon-tech text-pink-500'/>
        </BoxService>

        <BoxService title={'React'}>
          <FaReact className='icon-tech text-blue-600'/>
        </BoxService>

        <BoxService title={'Nextjs'}>
          <RiNextjsFill className='icon-tech text-black text-5xl'/>
        </BoxService>

        <BoxService title={'Pusher'}>
          <SiPusher className='icon-tech text-green-500'/>
        </BoxService>

        <BoxService title={'Socketio'}>
          <SiSocketdotio className='icon-tech'/>
        </BoxService>

        <BoxService title={'TypeScript'}>
          <BiLogoTypescript className='icon-tech text-blue-700'/>
        </BoxService>

        <BoxService title={'Laravel'}>
          <FaLaravel className='icon-tech text-red-500'/>
        </BoxService>

        <BoxService title={'PHP'}>
          <RiPhpLine className='icon-tech text-[#140c50]'/>
        </BoxService>

        <BoxService title={'MySQL'}>
          <SiMysql className='icon-tech text-orange-500'/>
        </BoxService>

        <BoxService title={'Redis'}>
          <DiRedis className='icon-tech text-red-500'/>
        </BoxService>

        <BoxService title={'Docker'}>
          <IoLogoDocker className='icon-tech text-blue-700'/>
        </BoxService>

        <BoxService title={'Nginx'}>
          <SiNginx className='icon-tech text-green-700'/>
        </BoxService>

        <BoxService title={'WebRTC'}>
          <SiWebrtc className='icon-tech'/>
        </BoxService>

        <BoxService title={'Redux'}>
          <SiRedux className='icon-tech text-purple-700'/>
        </BoxService>       
        
      </div>
    </div>
  )
}

/*
FaHtml5
FaJsSquare
FaCss3Alt
SiSass
FaReact
RiNextjsFill
SiPusher
SiSocketdotio
BiLogoTypescript
FaLaravel
RiPhpLine
SiMysql
DiRedis
IoLogoDocker
SiWebrtc
SiRedux


*/