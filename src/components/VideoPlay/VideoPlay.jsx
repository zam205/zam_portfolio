import { useState, useEffect, useRef } from "react";
import "./styles/VideoPlay.css";
import { FaPlay } from "react-icons/fa6";
import { IoIosPause } from "react-icons/io";
import { IoPause } from "react-icons/io5";
import { BiFullscreen } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
// Volum
import { BiSolidVolumeLow, BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";
import { MdPictureInPictureAlt } from "react-icons/md";
import Hls from 'hls.js';

export default function VideoPlay({ src }) {
  const videoRef = useRef(null);
  const tempVideoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hoverTime, setHoverTime] = useState(0); // لتتبع الوقت عند سحب الشريط
  const [playbackRate, setPlaybackRate] = useState(1); // سرعة التشغيل
  const [quality, setQuality] = useState("720p"); // الجودة
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeLoader, setActiveLoader] = useState(false);

  // useEffect(() => {
  //   // function blobUrl(video, videoUrl) {
  //   //   let xhr = new XMLHttpRequest();
  //   //   xhr.open("GET", videoUrl);
  //   //   xhr.responseType = "arraybuffer";
  //   //   xhr.onload = (e) => {
  //   //     let blob = new Blob([xhr.response]);
  //   //     let url = URL.createObjectURL(blob);
  //   //     console.log('blob', blob)
  //   //     console.log('Url Blob', url)
  //   //     video.src = url;
  //   //   };
  //   //   xhr.send();
  //   // }

  //   // blobUrl(videoRef.current, src);
  //   // 'http://zamlocal.com/videos/secureVideo/output_0_500.m3u8'
  //   // useEffect(() => {
  //     if (Hls.isSupported()) {
  //       const hls = new Hls();
  //       hls.loadSource(src); // إدخال رابط الفيديو المؤقت هنا
  //       hls.attachMedia(videoRef.current);
  
  //       hls.on(Hls.Events.MANIFEST_PARSED, function () {
  //         console.log('HLS Manifest parsed');
  //         videoRef.current.play();
  //       });
  
  //       hls.on(Hls.Events.ERROR, function (event, data) {
  //         console.error('HLS error:', data);
  //       });

  //       return () => {
  //         hls.destroy();
  //       };
  //     } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
  //       videoRef.current.src = src; // لأجهزة iOS التي تدعم HLS بشكل افتراضي
  //     }
  // // }, [videoUrl]);
  // }, [])

  const handleMouseEnter = () => {
    setHovering(true)

    // setTimeout(() => {
    //   setHovering(false)
    // }, 1000)
  }

  // تشغيل/إيقاف الفيديو
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // تحديث الوقت الحالي
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // عند تحميل الفيديو
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  // useEffect(() => {
  //   console.log("videoRef", videoRef);
  // }, []);

  // تحويل الوقت إلى صيغة دقائق:ثواني
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // التحكم في شريط التقدم
  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // حساب الوقت عند تحريك شريط التقدم
  const handleHover = (e) => {
    const newHoverTime =
      (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    setHoverTime(newHoverTime);
  };

  // التحكم في كتم الصوت
  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  // التحكم في الصوت
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  // التحكم في سرعة التشغيل
  const handleSpeedChange = (e) => {
    const newRate = e.target.value;
    setPlaybackRate(newRate);
    videoRef.current.playbackRate = newRate;
  };

  // التحكم في الجودة (ببساطة مجرد تغيير العرض الوهمي للجودة)
  const handleQualityChange = (e) => {
    setQuality(e.target.value);
    // من الممكن في تطبيق حقيقي تغيير مصدر الفيديو بناءً على الجودة
  };

  // تكبير الفيديو
  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      tempVideoRef.current.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const hendleSmallScreen = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture(); // إغلاق وضع PiP إذا كان نشطًا
    } else {
      videoRef.current.requestPictureInPicture() // تشغيل وضع PiP
        .catch(error => {
          console.error("Error enabling Picture-in-Picture:", error);
        });
    }
  }
  
  // const handleFastVideo = (event) => {
  //   if (event.key === "ArrowRight") {
  //     videoRef.current.currentTime += 10;
  //     event.preventDefault(); // منع التأثير الافتراضي
  //   } else if (event.key === "ArrowLeft") {
  //     videoRef.current.currentTime -= 10;
  //     event.preventDefault(); // منع التأثير الافتراضي
  //   }
  // }

  // handle the dast video for click on btn right & left 
  useEffect(() => {
    let lastActionTime = 0; // لتجنب التكرار

    const handleKeyDown = (event) => {
      const currentTime = new Date().getTime();
  
      // السماح بمرور ثانية واحدة فقط بين التغييرات
      if (currentTime - lastActionTime < 300) return;
  
      if (event.key === "ArrowRight") {
        videoRef.current.currentTime += 10; // تقديم ثانية واحدة
      } else if (event.key === "ArrowLeft") {
        videoRef.current.currentTime -= 10; // إرجاع ثانية واحدة
      }

      if (event.code === "Space") {
        event.preventDefault(); // منع التمرير الافتراضي عند الضغط على Space
        if (videoRef.current.paused) {
          setIsPlaying(true);
          videoRef.current.play(); // تشغيل الفيديو
        } else {
          setIsPlaying(false);
          videoRef.current.pause(); // إيقاف الفيديو
        }
      }
  
      lastActionTime = currentTime; // تحديث وقت آخر إجراء
      event.preventDefault(); // منع التأثير الافتراضي
    };
  
    // إضافة مستمع الحدث
    document.addEventListener('keydown', handleKeyDown);
  
    // تنظيف المستمع عند التفكيك
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [])


  const handleSubtitleChange = (lang) => {
    const tracks = videoRef.current.textTracks;

    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].language === lang) {
        tracks[i].mode = "showing"; // عرض الترجمة
      } else {
        tracks[i].mode = "disabled"; // إخفاء الترجمة الأخرى
      }
    }
  }// hls_encryption.keyinfo
  return (
    <div
      className="temp-video relative w-full select-none max-w-2xl mx-auto bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovering(false)}
      ref={tempVideoRef}
    >
      <video
        ref={videoRef}
        // src={src}
        preload="metadata"
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setActiveLoader(true)}
        onCanPlay={() => setActiveLoader(false)}
        // onKeyDown={handleFastVideo}
        controlsList="nodownload" // منع تنزيل الفيديو
        controls={false} // إخفاء عناصر التحكم الافتراضية
      > 
        <source src={src} size="1080" type="video/mp4" />
        {/* <track label="Arabic" default kind="subtitles" src="/english.vtt" srclang="en" />
        <track  label="English" kind="subtitles" src="/arabic.vtt" srclang="ar" /> */}
      </video>

      { activeLoader && <div className="loader"></div> }

      {/* عناصر التحكم */}
      <div
        className={`controls-video ${
          hovering ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* زر التشغيل/الإيقاف */}
        <div className="buffer-video flex items-center space-x-4">
          {/* شريط التقدم */}
          <div className="relative flex-grow">
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              onMouseMove={handleHover} // عرض الوقت عند سحب الشريط
              className="custom-rang"
              style={{
                background: `linear-gradient(to right, #93c5fd ${
                  (currentTime / duration) * 100
                }%, gray 0%)`,
              }}
            />
            {/* عرض الوقت عند سحب الشريط */}

            <span
              className="hidden absolute text-white text-xs bg-black px-2 py-1 rounded "
              style={{
                left: `${(hoverTime / duration) * 100 - 2}%`,
                bottom: "20px",
              }}
            >
              {formatTime(hoverTime)}
            </span>
          </div>
        </div>

        <div className="controls-down">
          <div className="controle-right flex items-center gap-2">
            {/* Btn Pause & Play */}
            <button onClick={togglePlay} className="text-white text-xl">
              {isPlaying ? (
                <IoPause className="text-white text-2xl" />
              ) : (
                <FaPlay className="text-white text-2xl" />
              )}
            </button>
            {/* عرض الوقت الحالي والمدة */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* زر كتم الصوت */}
            <button onClick={toggleMute} className="text-white">
              {volume == 0 && (
                <BiSolidVolumeMute className='text-xl' />
              )}

              {
                volume <= 0.50 && volume != 0 && (
                  <BiSolidVolumeLow className='text-xl' />
                )
              }

              {
                volume > 0.50 && (
                  <BiSolidVolumeFull className='text-xl' />
                )
              }
            </button>

            {/* التحكم في الصوت */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              // style={{
              //   background: `linear-gradient(to right, #93c5fd ${
              //     (currentTime / duration) * 100
              //   }%, gray 0%)`,
              // }}
            />
          </div>

          {/* إعدادات السرعة والجودة */}
          <div className="controle-left flex gap-2 mt-2 text-white">
            {/* إعدادات السرعة */}
            {/* <div>
              <label htmlFor="speed">Speed: </label>
              <select
                id="speed"
                value={playbackRate}
                onChange={handleSpeedChange}
                className="bg-black text-white p-1 rounded"
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div> */}

            {/* إعدادات الجودة */}
            {/* <div>
              <label htmlFor="quality">Quality: </label>
              <select
                id="quality"
                value={quality}
                onChange={handleQualityChange}
                className="bg-black text-white p-1 rounded"
              >
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
              </select>
            </div> */}

            <button>
              <IoMdSettings className='text-xl' />
            </button>

            <button onClick={hendleSmallScreen}>
              <MdPictureInPictureAlt className='text-xl' />
            </button>

            {/* زر تكبير الشاشة */}
            <button onClick={handleFullScreen} className="text-white">
              {/* {isFullScreen ? "🖥️" : "⛶"} */}
              <BiFullscreen className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
ب. زيادة مدة الـ Timeout في Laravel:
إذا كنت لا ترغب في استخدام الـ Queue وتفضل تنفيذ العملية في الـ Controller، يمكنك زيادة وقت المهلة للـ Request عبر تعديل إعدادات الـ max_execution_time في ملف php.ini أو في الـ Laravel Middleware.

زيادة الوقت في php.ini: قم بفتح ملف php.ini وأضف أو عدل السطر التالي:

ini
Copy code
max_execution_time = 300
تعديل الوقت في Laravel Middleware: يمكنك زيادة الوقت في app/Http/Middleware/VerifyCsrfToken.php:

php
Copy code
public function handle($request, Closure $next)
{
    set_time_limit(300); // زيادة الوقت المسموح به إلى 5 دقائق
    return $next($request);
}
بعد تنفيذ هذه الحلول، يجب أن تتمكن من تشفير الفيديو بدون مشاكل متعلقة بالـ Timeout، ويمكنك تشغيل الفيديو باستخدام hls.js في React كما تم شرحه.

هل تحتاج إلى مساعدة إضافية في تنفيذ أي من هذه الحلول؟

  */
