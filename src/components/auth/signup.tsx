"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import useSupabase from '@/hooks/useSupabase';

const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
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
                }
            }
        })

        console.log(data);
        console.log(error);

    }

    return (
        <section>
            <form onSubmit={handleSubmit(submitHandler)}>
                <input type="text" {...register('name')} />
                {errors.name?.message && <p>{errors.name?.message}</p>}
                <input {...register('email')} type='email' />
                {errors.email?.message && <p>{errors.email?.message}</p>}
                <input type="password" {...register('password')} />
                {errors.password?.message && <p>{errors.password?.message}</p>}
                <input type="submit" />
            </form>
        </section>
    )
}