import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";


export default function TypingEffect({
  className
}) {
  // style={{ fontSize: "2rem", textAlign: "center", margin: "20px" }}

  const [classNameState, setClassNameState] = useState('');

  useEffect(() => {
    if (className) {
      setClassNameState(className);
    }
  }, [className])

  return (
    <div  className={`type-effect  text-[22px] flex gap-1 text-center
      text-white font-extrabold select-none ${classNameState}`}>
      <h1>{'<'}</h1>
      <div className="text-indigo-700"> 

        <Typewriter
          options={{
            strings: [
              "I made clone facebook",
              "I'm a Fullstack Developer.",
              "Let's collaborate on amazing projects!"
            ],
            autoStart: true, // يبدأ الكتابة تلقائيًا
            loop: true,      // التكرار المستمر
            delay: 75,       // تأخير الكتابة
            cursor: "|",     // تعيين المؤشر (يمكنك تخصيصه كما ترغب)
            deleteSpeed: 50, // سرعة مسح النص
            pauseFor: 1000,  // الوقت بين كل جملة
            skipAddStyles: true, // تجنب إضافة أنماط CSS إضافية
          }}
          
        />
      </div>
      <h1>{'>'}</h1>
    </div>
  );
}
