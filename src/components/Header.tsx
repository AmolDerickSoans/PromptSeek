'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useAuth } from './auth/Providers'
import Link from 'next/link'
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
import { getURL } from '@/lib/supabase/auth-config'

export default function Header() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    const getUserInitials = (email: string) => {
        return email.substring(0, 2).toUpperCase()
    }

    return (
        <header className="w-full py-4 px-6 flex items-center justify-between border-b">
            <div className="flex items-center space-x-4">
                <Link href="/" className="text-xl font-bold">
                    Your Logo
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                {!loading && !user && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Get Started</Button>
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
                    <>
                        <Link href="/dashboard">
                            <Button variant="outline">Dashboard</Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarFallback>{getUserInitials(user.email)}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleSignOut}>
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
            </div>
        </header>
    )
}