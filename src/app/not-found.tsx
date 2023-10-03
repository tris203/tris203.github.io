import React from 'react';

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='mx-auto w-1/2'>
        <div className='mx-auto h-64 w-full border border-black bg-black subpixel-antialiased'>
          <div className='flex justify-between border-b border-gray-500 bg-white'>
            <div className='flex'>
              <p className='pt-1 text-xs text-black'>TrisK.gg</p>
            </div>
          </div>
          <div className='h-auto bg-black pl-1 pt-1 font-mono text-xs text-white'>
            <p className='pb-1'>Microsoft Windows [Versión 13.37]</p>
            <p className='pb-1'>(c) 2023 TrisK. All rights reserved.</p>
            <p className='pb-1'>&nbsp;</p>
            <span className='pb-1'>C:\public_html&gt;</span>
            <span>cd blog</span>
            <p className='text-sm text-red-600'>ERROR: 404 - Page Not Found</p>
            <p className='pb-1'>&nbsp;</p>
            <span className='pb-1'>C:\public_html&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
