import Image from 'next/image'

import backgroundImage from './images/background-call-to-action.jpg'
import Container from './Container'
import { Button } from './Button'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="bg-blue-600 relative overflow-hidden py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-white font-display text-3xl tracking-tight sm:text-4xl">
            Get started today
          </h2>
          <p className="text-white mt-4 text-lg tracking-tight">
            It’s time to take control of your books. Buy our software so you can
            feel like you’re doing something productive.
          </p>
          <Button href="/register" color="white" className="mt-10">
            Get 6 months free
          </Button>
        </div>
      </Container>
    </section>
  )
}
