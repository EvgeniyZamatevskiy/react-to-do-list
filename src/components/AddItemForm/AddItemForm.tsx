import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react'
import { AddBox } from '@mui/icons-material'
import { TextField, IconButton } from '@mui/material'
import { StatusType } from '../../redux/appReducer'

type AddItemFormPropsType = {
	addItem: (title: string) => void
	disabledStatus?: StatusType
}

export const AddItemForm: FC<AddItemFormPropsType> = memo(({ addItem, disabledStatus }) => {
	console.log('AddItemForm')

	const [value, setValue] = useState<string>('')
	const [error, setError] = useState<string>('')

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	const addItemHandler = () => {
		if (value.trim() !== '') {
			addItem(value.trim())
			setValue('')
		} else {
			setError('Title is required!')
		}
	}

	const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== '') {
			setError('')
		}
		if (e.key === 'Enter') {
			addItemHandler()
		}
	}

	return (
		<div>
			<TextField
				variant='outlined'
				label='Title'
				value={value}
				onChange={changeHandler}
				onKeyPress={keyPressHandler}
				error={!!error}
				helperText={error}
				disabled={disabledStatus === 'loading'}
			/>
			<IconButton color='primary' onClick={addItemHandler} disabled={disabledStatus === 'loading'} >
				<AddBox />
			</IconButton>
		</div>
	)
})