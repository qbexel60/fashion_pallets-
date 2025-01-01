'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function Gallery() {
  const {section} = useParams()
  return (
    <div>Gallery, {section}</div>
  )
}
