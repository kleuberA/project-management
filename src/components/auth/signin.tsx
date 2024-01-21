"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import useSupabase from '@/hooks/useSupabase';
import { redirect, useRouter } from 'next/navigation';

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

    async function teste() {
        const { data } = await supabase.auth.getSession();
        console.log(data.session?.user)
        if (data.session?.user) {
            router.push('/home')
        }
    }

    teste()

    async function submitHandler(dataForm: UserFormData) {
        console.log(dataForm);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: dataForm.email,
            password: dataForm.password,
        })

        console.log(data);
        console.log(error);

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