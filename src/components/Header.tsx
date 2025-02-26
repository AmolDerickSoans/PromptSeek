'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useAuth } from './auth/Providers'
import Link from 'next/link'
import './Header.css'
import { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import {motion} from "framer-motion"
import Logo from './logo/Logo'
import { Sun , Moon } from 'lucide-react'

export default function Header() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [animationComplete, setAnimationComplete] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        handleResize()
        window.addEventListener('resize', handleResize)
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setScrolled(scrollPosition > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Handle animation end
    const handleAnimationEnd = () => {
        setAnimationComplete(true)
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    const getUserInitials = (email: string) => {
        return email.substring(0, 2).toUpperCase()
    }

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', !isDarkMode ? 'true' : 'false');
    };

    return (
<header
  className={`w-full sticky top-0 z-50 transition-all duration-300 ${
    isMobile ? 'bg-white dark:bg-black' : 'backdrop-blur-md'
  }`}
  style={{
    ...(isMobile ? {} : {
      maskImage: 'linear-gradient(to top, transparent, black 50%)',
      WebkitMaskImage: 'linear-gradient(to top, transparent, black 50%)',
    }),
  }}
>        <div className={`mx-auto px-4 transition-all duration-300 ${
                scrolled ? 'py-2' : 'py-4'
            }`}>
                <div className="flex justify-between items-center relative">
                    {/* Left side - Logo and Title */}
                    <div className={`flex transition-all duration-300 ${
                        isMobile ? 'flex-col items-center' : 'items-center space-x-2'
                    } ${
                        scrolled && !isMobile ? 'transform translate-x-[calc(50vw-350px)]' : ''
                    }`}
                    onTransitionEnd={handleAnimationEnd}>
                        <div className={`transition-all duration-300 ${
                            scrolled ? 'scale-50' : 'scale-75'
                        } ${
                            animationComplete ? 'bg-white  dark:bg-black rounded-full p-2' : ''
                        } ${isMobile ? 'w-12 h-12' : ''}`}>
                            <Logo />
                        </div>
                        <Link href="/" className={`text-xl md:text-2xl font-bold text-black hover:opacity-80 transition-all duration-100 ${
                            scrolled ? 'md:opacity-0 md:invisible md:w-0' : ''
                        } ${
                            !scrolled ? 'mt-1 md:mt-0' : ''
                        } ${isMobile ? 'text-[12px] pl-10 pt-2' : ''}
                        text-black dark:text-white
                        `}>
                            PROMPT SEEK
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className={`hidden md:block transition-all duration-300 ${
                        scrolled ? 'absolute left-1/2 -translate-x-1/2' : 'absolute left-1/2 -translate-x-1/2'
                    }`}>
                        <ul className="flex space-x-8 bg-white/95 dark:bg-gray-900 rounded-full px-6 py-2 shadow-lg">
                            <li>
                                <Link href="/" className="relative group py-2 px-1">
                                    <span className="relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white font-semibold transition-colors duration-200">
                                        Courses
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/blogs" className="relative group py-2 px-1">
                                    <span className="relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white font-semibold transition-colors duration-200">
                                        Blogs
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="relative group py-2 px-1">
                                    <span className="relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white font-semibold transition-colors duration-200">
                                        BootCamps
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/extension-landing" className="relative group py-2 px-1">
                                    <span className="relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white font-semibold transition-colors duration-200">
                                        PromptSeer
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Right side - Auth buttons and Mobile Menu */}
                    <div className="flex items-center space-x-4">
                    <motion.button
            onClick={toggleDarkMode}
            className="relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg"
            whileHover={{ scale: 1.1, rotate: isDarkMode ? 15 : -15 }}
            whileTap={{ scale: 0.9, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
            <motion.div
                initial={{ rotate: 0, opacity: 1 }}
                animate={{ rotate: isDarkMode ? 360 : 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {isDarkMode ? (
                    <Moon className="w-6 h-6 text-blue-400" />
                ) : (
                    <Sun className="w-6 h-6 text-yellow-500" />
                )}
            </motion.div>
        </motion.button>
                        {!loading && !user && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    {/* <Button className="bg-black  dark:bg-black text-white hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">
                                        Get Started
                                    </Button> */}
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <Auth
                                        supabaseClient={supabase}
                                        appearance={{ theme: ThemeSupa }}
                                        providers={['google']}
                                        view="sign_in"
                                        showLinks={true}
                                        redirectTo={`${window.location.origin}/api/auth/callback?type=recovery`}
                                    />
                                </DialogContent>
                            </Dialog>
                        )}

                        {user && (
                            <div className="hidden md:flex items-center space-x-4">
                                <Link href="/dashboard">
                                    <Button variant="outline" className="hover:shadow-md transition-shadow">
                                        Dashboard
                                    </Button>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                                            <AvatarFallback>{getUserInitials(user.email)}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={handleSignOut}>
                                            Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100  dark:bg-black hover:bg-gray-200 transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <div className="w-4 h-4 flex flex-col justify-center items-center">
                                    <span 
                                        className={`block w-4 h-0.5 bg-black  dark:bg-white transform transition-all duration-300 ease-in-out 
                                        ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}
                                    />
                                    <span 
                                        className={`block w-4 h-0.5 bg-black   dark:bg-white  transition-all duration-300 ease-in-out
                                        ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                                    />
                                    <span 
                                        className={`block w-4 h-0.5 bg-black    dark:bg-white transform transition-all duration-300 ease-in-out
                                        ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div 
                    className={`md:hidden absolute left-0 right-0 bg-white dark:bg-black shadow-lg transform transition-all duration-300 ease-in-out origin-top
                    ${isMenuOpen 
                        ? 'opacity-100 scale-y-100 translate-y-0' 
                        : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'
                    }`}
                    style={{
                        top: '100%',
                        backgroundColor: 'white'
                    }}
                >
                    <div className="container mx-auto px-4 py-2">
                        <nav className="space-y-2">
                            <Link 
                                href="/" 
                                className="block py-2 text-base text-gray-600 hover:text-black border-b border-gray-100 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Courses
                            </Link>
                            <Link 
                                href="/blogs" 
                                className="block py-2 text-base text-gray-600 hover:text-black border-b border-gray-100 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blogs
                            </Link>
                            <Link 
                                href="/" 
                                className="block py-2 text-base text-gray-600 hover:text-black border-b border-gray-100 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                BootCamps
                            </Link>
                            <Link 
                                href="/extension-landing" 
                                className="block py-2 text-base text-gray-600 hover:text-black border-b border-gray-100 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                PromptSeer
                            </Link>
                            {user && (
                                <>
                                    <Link 
                                        href="/dashboard" 
                                        className="block py-2 text-base text-gray-600 hover:text-black border-b border-gray-100 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleSignOut()
                                            setIsMenuOpen(false)
                                        }}
                                        className="block w-full text-left py-2 text-base text-gray-600 hover:text-black transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}