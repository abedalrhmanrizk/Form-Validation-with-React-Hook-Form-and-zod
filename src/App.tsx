import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function App() {
  return (
    <main className=''>
      <Navbar />
      <Form />
    </main>
  )
}

export function Navbar() {
  return (
    <nav className='border-b border-gray-300 bg-black/5'>
      <div className='container max-w-screen-2xl p-4 m-auto'>
        <h1 className='text-lg'>LOGO</h1>
      </div>
    </nav>
  )
}

export function Form() {
  const formSchema = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Password do not match',
      path: ['confirmPassword'],
    })

  type FormData = {
    firstName: string
    lastName: string
    email: string
    age: number
    password: string
    confirmPassword: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  function submit(data: FormData) {
    console.dir('It work!', data)
    console.dir(data)
  }

  return (
    <form
      noValidate
      className='container mt-20 p-4 m-auto flex flex-col gap-2 max-w-[300px]'
      onSubmit={handleSubmit(submit)}
    >
      <h1 className='text-3xl'>Form</h1>
      <div className='flex flex-col gap-1'>
        <label className='text text-l text-black/80' htmlFor=''>
          First Name
        </label>
        <input
          id=''
          className='border border-gray-300 shadow-sm backdrop-blur rounded-md px-3 py-1 focus:outline-black/50 transition-all'
          type='text'
          {...register('firstName')}
        />
        {errors.firstName && (
          <span className='text-red-500'>
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text text-l text-black/80' htmlFor=''>
          Last Name
        </label>
        <input
          id=''
          className='border border-gray-300 shadow-sm backdrop-blur rounded-md px-3 py-1 focus:outline-black/50 transition-all'
          type='text'
          {...register('lastName')}
        />
        {errors.lastName && (
          <span className='text-red-500'>
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text text-l text-black/80' htmlFor=''>
          Email
        </label>
        <input
          id=''
          className='border border-gray-300 shadow-sm backdrop-blur rounded-md px-3 py-1 focus:outline-black/50 transition-all'
          type='email'
          {...register('email')}
        />
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text text-l text-black/80' htmlFor=''>
          Age
        </label>
        <input
          id=''
          className='border border-gray-300 shadow-sm backdrop-blur rounded-md px-3 py-1 focus:outline-black/50 transition-all'
          type='text'
          {...register('age', { valueAsNumber: true })}
        />
        {errors.age && (
          <span className='text-red-500'>{errors.age.message}</span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text text-l text-black/80' htmlFor=''>
          Password
        </label>
        <input
          id=''
          className='border border-gray-300 shadow-sm backdrop-blur rounded-md px-3 py-1 focus:outline-black/50 transition-all'
          type='password'
          {...register('password')}
        />
        {errors.password && (
          <span className='text-red-500'>
            {errors.password.message}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text text-l text-black/80' htmlFor=''>
          Confirm Password
        </label>
        <input
          id=''
          className='border border-gray-300 shadow-sm backdrop-blur rounded-md px-3 py-1 focus:outline-black/50 transition-all'
          type='password'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span className='text-red-500'>
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button className='bg-green-500 mt-6 text-white p-2 rounded-md shadow-sm backdrop-blur-lg scale-100 focus:scale-[99%] hover:bg-green-400 transition-all'>
        Sign up
      </button>
    </form>
  )
}
