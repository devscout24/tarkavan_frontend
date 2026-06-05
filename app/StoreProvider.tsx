'use client'
import { AppStore, makeStore } from '@/lib/store'
import { useRef } from 'react'
import { Provider } from 'react-redux' 

export default function StoreProvider({
    children,
    user
}: {
    children: React.ReactNode
    user: {
        image: string
    }
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    
  }

    return <Provider store={storeRef.current}>{children}</Provider>
}