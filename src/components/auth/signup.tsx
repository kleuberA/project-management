"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import useSupabase from '@/hooks/useSupabase';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Link from 'next/link';
import { Button } from '../ui/button';

const schema = z.object({
    name: z.string().min(3, { message: "O nome deve ter no minimo 3 caracteres." }),
    lastName: z.string().min(4, { message: "O Sobrenome deve ter no minimo 4 caracteres." }),
    email: z.string().email({ message: "Email inválido." }),
    password: z.string().min(8, { message: "A senha deverá conter no mínimo 8 caracteres." }),
});

type UserFormData = z.infer<typeof schema>


export default function SignUpComponent() {

    const supabase = useSupabase();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(schema),
    });

    async function submitHandler(dataForm: UserFormData) {

        const { data, error } = await supabase.auth.signUp({
            email: dataForm.email,
            password: dataForm.password,
            options: {
                data: {
                    first_name: dataForm.name,
                    last_name: dataForm.lastName,
                }
            }
        })

        console.log(data);
        console.log(error);

    }

    return (
        <section className='w-full h-full flex flex-col gap-8 justify-center items-center'>
            <div className='flex items-start w-[25dvw] flex-col gap-2 pb-1'>
                <h1 className='text-2xl text-white font-bold font-mono'>Bem vindo</h1>
                <span className='text-sm text-[#6f6f6f] font-mono font-medium'>Criar uma nova conta</span>
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-5 w-[25dvw] h-[50dvh] justify-center'>
                <div className='flex flex-row gap-2'>
                    <div className=''>
                        <Label htmlFor='firstName' className='text-[#6e6e6e]'>Firs Name</Label>
                        <Input id='firstName' type="text" placeholder='John' {...register('name')} className={`${errors.name?.message && 'border-[#d25151] bg-[#d25151] bg-opacity-20 transition-all duration-200'}`} />
                        {errors.name?.message && <span className='text-xs text-[#d25151]'>{errors.name?.message}</span>}
                    </div>
                    <div>
                        <Label htmlFor='lastName' className='text-[#6e6e6e]'>Last Name</Label>
                        <Input placeholder='Doe' id='lastName' type="text" {...register('lastName')} className={`${errors.lastName?.message && 'border-[#d25151] bg-[#d25151] bg-opacity-20 transition-all duration-200'}`} />
                        {errors.lastName?.message && <span className='text-xs text-[#d25151]'>{errors.lastName?.message}</span>}
                    </div>
                </div>
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
                <Button type="submit" variant="signIn" >Sign Up</Button>
                <div>
                    <span className='text-[#6e6e6e] text-sm font-semibold font-mono'>Possui uma conta? <Link href="/auth/signin" className='text-white hover:underline transition-all duration-150'>Faça seu login agora mesmo</Link></span>
                </div>
            </form>
            <div className='w-[25dvw] text-[#6e6e6e] font-mono flex items-end text-xs text-justify pt-3'>
                <span>
                    Ao continuar, você concorda com os Termos de Serviço e Política de Privacidade da [Sem nome] e em receber e-mails periódicos com atualizações.
                </span>
            </div>
        </section>
    )
}