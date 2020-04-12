import React from 'react'

export function TextInput({ id, label, onChange, value }) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                value={value}
                required
                id={id}
                type="text"
                onChange={(event) => onChange(event.target.value)}
            />
        </>
    )
}
