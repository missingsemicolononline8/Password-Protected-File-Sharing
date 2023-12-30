import React, { useState } from 'react'
import Hero from '../components/Hero'
import ShareFile from '../components/ShareFile'
import { AnimatePresence } from 'framer-motion'

const Home = () => {
    const [intro, setIntro] = useState(true)
    return (
        <AnimatePresence>
            <main>
                {intro ? <Hero startSharing={() => setIntro(false)} /> : <ShareFile handleBack={() => setIntro(true)} />}
            </main>
        </AnimatePresence>

    )
}

export default Home