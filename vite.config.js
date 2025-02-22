import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

export default {
  plugins: [
    react(),
    vike(),
  ],
  resolve: {
    alias: {
      '#': '/src',
      '@': '/renderer',
    },
  },
  css: {
    postcss: './postcss.config.js',
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      hashPrefix: 'my-app',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`,
      },
    },
  },
  // optimizeDeps: {
  //   include: ['react-icons'],
  // },
  // optimizeDeps: {
  //   include: ['@splinetool/react-spline'],
  // },
  optimizeDeps: {
    include: ['typewriter-effect']
  },
  build: {
    // ssr: true,
    // outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        format: 'esm',
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return 'vendor'; // وضع جميع المكتبات في ملف `vendor.js`
        //   }
        // },
      },
    },
  },
  server: {
    port: 3000, // استخدم المتغير من .env أو 3000 افتراضيًا
    host: true, // للسماح لـ Vercel أو أي سيرفر خارجي بقراءة السيرفر
  }
};

/*
ظ**

manualChunks: {
  vendor: ['react', 'react-dom'],
},
*/