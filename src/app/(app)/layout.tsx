import Navbar from '@/components/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
          <Navbar/>
      <div className="wrapper flex-1">
        {children}
      </div>
      <footer className='md:p-6 p-4 text-center bg-gray-100'>
        <p>&copy; 2024 QuickQuips. All rights reserved.</p>
      </footer>
    </div>
  );
}