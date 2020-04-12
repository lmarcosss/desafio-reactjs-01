import React from 'react'
import { TextInput } from './TextInput'
export function Form({ inputs, onClick, textButton }) {
    return (
        <form action="submit">
            {inputs.map(({ id, label, onChange, value }) => (
                <TextInput id={id} label={label} onChange={onChange} value={value} />
            ))}
            <button onClick={onClick}>{textButton} </button>
        </form>
    )
}
