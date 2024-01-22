"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import useSupabase from '@/hooks/useSupabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import Link from 'next/link';

const schema = z.object({
    email: z.string().email({ message: "Email inválido." }),
    password: z.string().min(8, { message: "A senha deverá conter no mínimo 8 caracteres." }),
});

type UserFormData = z.infer<typeof schema>

export default function SignInComponent() {

    const supabase = useSupabase();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(schema),
    });

    async function isAuthenticated() {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
            router.push('/home')
        }
    }

    isAuthenticated();

    async function submitHandler(dataForm: UserFormData) {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: dataForm.email,
            password: dataForm.password,
        })

        if (data.session?.user) {
            toast.success('Login successful!',
                {
                    style: {
                        borderRadius: '5px',
                        background: '#1c1c1c',
                        color: '#fff',
                        border: '1px solid #2e2e2e'
                    },
                });
        } else {
            toast.error(error?.message + '!' || 'Invalid Credentials!',
                {
                    style: {
                        borderRadius: '5px',
                        background: '#1c1c1c',
                        color: '#fff',
                        border: '1px solid #2e2e2e'
                    },
                });
        }
    }

    return (
        <section className='w-full h-full flex flex-col justify-center items-center'>
            <div className='flex items-start w-[25dvw] flex-col gap-2'>
                <h1 className='text-2xl text-white font-bold font-mono'>Bem vindo de volta</h1>
                <span className='text-sm text-[#6f6f6f] font-mono font-medium'>Faça login em sua conta</span>
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-10 w-[25dvw] h-[50dvh] justify-center'>
                <div>
                    <div className='pb-2'>
                        <Label htmlFor='email' className='text-[#6e6e6e]'>Email</Label>
                    </div>
                    <Input
                        {...register('email')}
                        type='email'
                        placeholder='youemail@example.com'
                        id='email'
                        className={`${errors.email?.message && 'border-[#d25151] bg-[#d25151] bg-opacity-20 transition-all duration-200'}`} />
                    {errors.email?.message &&
                        <span
                            className='text-xs text-[#d25151]'
                        >
                            {errors.email?.message}
                        </span>
                    }
                </div>

                <div>
                    <div className='flex justify-between pb-2'>
                        <Label htmlFor='password' className='text-[#6e6e6e]'>Password</Label>
                        <Link href="/forgot-password" className='text-[#6e6e6e] text-sm font-semibold font-mono'>Esqueceu a Senha?</Link>
                    </div>
                    <Input
                        type="password"
                        id='password'
                        {...register('password')}
                        placeholder='********'
                        className={`${errors.password?.message && 'border-[#d25151] bg-[#d25151] bg-opacity-20 transition-all duration-200'}`}
                    />
                    {errors.password?.message && <span className='text-xs text-[#d25151]'>{errors.password?.message}</span>}
                </div>
                <Button type="submit" variant="signIn" >Sign In</Button>
                <div>
                    <span className='text-[#6e6e6e] text-sm font-semibold font-mono'>Não tem uma conta? <Link href="/auth/signup" className='text-white hover:underline transition-all duration-150'>Inscreva-se agora</Link></span>
                </div>
            </form>
            <div className='w-[25dvw] text-[#6e6e6e] font-mono h-[15dvh] flex items-end text-xs text-justify'>
                <span>
                    Ao continuar, você concorda com os Termos de Serviço e Política de Privacidade da [Sem nome] e em receber e-mails periódicos com atualizações.
                </span>
            </div>
        </section>
    )
}