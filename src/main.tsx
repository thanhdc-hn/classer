import router from '@src/routers/routers';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" limit={1} />
    </RecoilRoot>
  </React.StrictMode>,
);
