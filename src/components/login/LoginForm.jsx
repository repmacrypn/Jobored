import React from 'react'
import { Eye, EyeOff } from 'tabler-icons-react'
import { useForm } from '@mantine/form'
import { useDispatch } from 'react-redux'
import { TextInput, Button, PasswordInput } from '@mantine/core'
import s from './LoginPage.module.css'
import { setIsAuth, useLazyLoginQuery } from '../../redux/authSlice'

export const LoginForm = () => {
    const dispatch = useDispatch()
    const [getLoginData, { isFetching }] = useLazyLoginQuery()

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    })

    const onSubmitButtonClick = async ({ email, password }) => {
        const { data: { access_token, refresh_token }, isSuccess } = await getLoginData({ email, password })

        if (isSuccess) {
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('refresh_token', refresh_token)

            dispatch(setIsAuth(true))
        }
    }

    return <LoginFormInfo
        onSubmitButtonClick={onSubmitButtonClick}
        form={form}
        isLoading={isFetching}
    />
}

const LoginFormInfo = ({ form, isLoading, onSubmitButtonClick }) => {
    return (
        <form
            className={s.loginForm}
            onSubmit={form.onSubmit((values) => onSubmitButtonClick(values))}
        >
            <TextInput
                inputWrapperOrder={['label', 'error', 'input']}
                radius="md"
                label="Email"
                type='email'
                placeholder="Enter your email"
                {...form.getInputProps('email')}
            />
            <PasswordInput
                label="Password"
                visibilityToggleIcon={({ reveal }) =>
                    reveal ? <Eye /> : <EyeOff />}
                placeholder="Enter your password"
                {...form.getInputProps('password')}
            />
            <Button
                disabled={isLoading}
                radius='md'
                type="submit"
            >
                Login
            </Button>
        </form>
    )
}
