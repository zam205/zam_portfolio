// LaptopModel.jsx
// import React, {useEffect, useState} from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import * as THREE from 'three';

// export default function LaptopModel(props) {
//   const { scene, animations } = useGLTF("/laptop_with_code.glb");
//   const { actions, names } = useAnimations(animations, scene);

//   useEffect(() => {
//     // تشغيل أول Animation موجود (أو اسم معين إن كنت تعرفه)
//     const action = actions[names[0]]; // استخدم أول Animation
//     if (action) {
//       // تشغيل مرة واحدة فقط
//       action.setLoop(THREE.LoopOnce); // يعمل مرة واحدة
//       action.clampWhenFinished = true; // يتوقف عند النهاية
//       action.enableInterpolation = true; // تفعيل التداخل التدريجي
//       action.fadeIn(0.5); // مزج تدريجي عند البداية
//       action.fadeOut(0.5); // مزج تدريجي عند النهاية
//       action.time = 1.5; // بداية الـ animation
//       action.setDuration(1); // مدة الـ animation (بالثواني)
//       action.play();
//     }
//   }, [actions, names]);
//   return <primitive object={scene} {...props} />;
// }

// LaptopModel.jsx
import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function LaptopModel(props) {
  // تحميل النموذج والـ animations
  const { scene, animations } = useGLTF("/laptop_with_code.glb");
  const { actions, names } = useAnimations(animations, scene);


  useEffect(() => {
    if (names.length > 0) {
      const action = actions[names[0]]; // اختر أول Animation
      if (action) {
        // تأخير تشغيل الـ animation
        const delay = 1000; // التأخير بالميلي ثانية (2000 = 2 ثانية)
        setTimeout(() => {
          action
            .setLoop(THREE.LoopOnce) // يعمل مرة واحدة فقط
            .setDuration(1) // مدة الـ animation (بالثواني)
            .fadeOut(0.5) // مزج تدريجي عند النهاية
            .fadeIn(0.5); // مزج تدريجي عند البداية

          action.clampWhenFinished = true; // توقف عند النهاية
          // action.time = 1.5; // بداية الـ animation

          action.play(); // تشغيل الـ animation
        }, delay);

        // تنظيف الـ timeout عند إزالة المكون
        // return () => clearTimeout(timeout);
      }
    }
  }, [actions, names]);

  return <primitive object={scene} {...props} />;
}
