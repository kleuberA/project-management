"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import useSupabase from '@/hooks/useSupabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
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
        console.log(data);
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
                        background: '#333',
                        color: '#fff',
                        border: '1px solid #3d3d3d'
                    },
                });
        } else {
            toast.error(error?.message + '!' || 'Invalid Credentials!',
                {
                    style: {
                        borderRadius: '5px',
                        background: '#333',
                        color: '#fff',
                        border: '1px solid #3d3d3d'
                    },
                });
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit(submitHandler)}>
                <input {...register('email')} type='email' />
                {errors.email?.message && <p>{errors.email?.message}</p>}
                <input type="password" {...register('password')} />
                {errors.password?.message && <p>{errors.password?.message}</p>}
                <input type="submit" />
            </form>
        </section>
    )
}