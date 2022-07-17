import React, { ChangeEvent, FC, KeyboardEvent, memo, ReactElement, useState } from 'react'
import TextField from '@mui/material/TextField'
import s from './EditableItem.module.css'
import { EMPTY_STRING } from 'constants/base'

type EditableItemPropsType = {
	currentValue: string
	changeCurrentValue: (newValue: string) => void
	isDisabled?: boolean
}

export const EditableItem: FC<EditableItemPropsType> = memo(({ currentValue, changeCurrentValue, isDisabled }): ReactElement => {

	const [editMode, setEditMode] = useState<boolean>(false)
	const [newValue, setNewValue] = useState<string>(EMPTY_STRING)

	const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setNewValue(event.currentTarget.value)
	}

	const onActivateEditModeClick = (): void => {
		setEditMode(true)
		setNewValue(currentValue)
	}

	const onChangeCurrentValueBlur = (): void => {
		setEditMode(false)
		changeCurrentValue(newValue)
	}

	const onChangeCurrentValueKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === 'Enter') {
			setEditMode(false)
			changeCurrentValue(newValue)
		}
	}

	return (
		<>
			{editMode && !isDisabled
				? <TextField
					variant={'standard'}
					value={newValue}
					onChange={onInputChange}
					autoFocus
					onBlur={onChangeCurrentValueBlur}
					onKeyDown={onChangeCurrentValueKeyDown} />
				: <span className={s.span} onClick={onActivateEditModeClick}>{currentValue}</span>}
		</>
	)
})