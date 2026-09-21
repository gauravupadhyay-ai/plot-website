'use client'

import { useState } from 'react'

const fieldClass =
  'w-full rounded-2xl border-none bg-gray-50/50 px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-brand-primary/30'
const labelClass = 'mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary'

export function ComboField({
  label,
  value,
  onChange,
  options,
  required,
  placeholder = 'Type a custom value',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  required?: boolean
  placeholder?: string
}) {
  const preset = options.includes(value)
  const [custom, setCustom] = useState(Boolean(value) && !preset)

  return (
    <div className="space-y-2">
      <label className={labelClass}>{label}{required ? ' *' : ''}</label>
      <select
        required={required && !custom}
        value={custom ? '__custom__' : value}
        onChange={(event) => {
          if (event.target.value === '__custom__') {
            setCustom(true)
            if (preset) onChange('')
            return
          }
          setCustom(false)
          onChange(event.target.value)
        }}
        className={`${fieldClass} font-semibold text-brand-primary`}
      >
        <option value="">{required ? 'Select' : 'Not set'}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        <option value="__custom__">Custom…</option>
      </select>
      {custom ? (
        <input
          required={required}
          type="text"
          value={preset ? '' : value}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
          placeholder={placeholder}
        />
      ) : null}
    </div>
  )
}

export function ChoiceList({
  label,
  hint,
  presets,
  values,
  onChange,
}: {
  label: string
  hint: string
  presets: string[]
  values: string[]
  onChange: (values: string[]) => void
}) {
  const [custom, setCustom] = useState('')
  const selected = new Set(values)
  const extras = values.filter((value) => !presets.includes(value))

  const toggle = (item: string) => {
    onChange(selected.has(item) ? values.filter((value) => value !== item) : [...values, item])
  }

  const addCustom = () => {
    const next = custom.trim()
    if (!next || selected.has(next)) {
      setCustom('')
      return
    }
    onChange([...values, next])
    setCustom('')
  }

  return (
    <div className="space-y-3 md:col-span-2">
      <div>
        <label className={labelClass}>{label}</label>
        <p className="text-xs text-text-muted">{hint}</p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {presets.map((item) => (
          <label key={item} className="flex items-start gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={selected.has(item)}
              onChange={() => toggle(item)}
              className="mt-1 accent-brand-primary"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      {extras.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {extras.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-white"
            >
              {item} ×
            </button>
          ))}
        </div>
      ) : null}
      <div className="flex gap-2">
        <input
          type="text"
          value={custom}
          onChange={(event) => setCustom(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              addCustom()
            }
          }}
          className={fieldClass}
          placeholder="Add a custom line"
        />
        <button type="button" onClick={addCustom} className="shrink-0 rounded-2xl bg-brand-primary px-4 text-sm font-semibold text-white">
          Add
        </button>
      </div>
    </div>
  )
}
