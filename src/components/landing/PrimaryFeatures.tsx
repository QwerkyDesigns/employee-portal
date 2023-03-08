import { useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import backgroundImage from './images/background-features.jpg'
import screenshotExpenses from './images/screenshots/expenses.png'
import screenshotPayroll from './images/screenshots/payroll.png'
import screenshotReporting from './images/screenshots/reporting.png'
import screenshotVatReturns from './images/screenshots/vat-returns.png'
import Container from './Container'

const features: FeatureType[] = [
  {
    title: 'Image',
    description:
      "Create and manage images for your online store.",
    image: screenshotPayroll,
  },
  {
    title: 'Text',
    description:
      "Manage all of your text generation needs - from copywriting to prompt engineering.",
    image: screenshotExpenses,
  },
  {
    title: 'Audio',
    description:
      "We might be able integrate audio services",
    image: screenshotVatReturns,
  },
  {
    title: 'Apply your own styles',
    description:
      'Are you an artist? Upload your work and generate images in your own style.',
    image: screenshotReporting,
  },
]

type FeatureType = {
  title: string
  description: string
  image: StaticImageData
}

export function PrimaryFeatures() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="bg-blue-600 relative overflow-hidden pt-20 pb-28 sm:py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="text-white font-display text-3xl tracking-tight sm:text-4xl md:text-5xl">
            All of your creative generation needs in one place.
          </h2>
          <p className="text-blue-100 mt-6 text-lg tracking-tight">
            Every single AI service you could ever want
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        'group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-white/10 lg:ring-1 lg:ring-inset'
                          : 'hover:bg-white/10 lg:hover:bg-white/5'
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg [&:not(:focus-visible)]:focus:outline-none',
                            selectedIndex === featureIndex
                              ? 'text-blue-600 lg:text-white'
                              : 'text-blue-100 hover:text-white lg:text-white'
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 hidden text-sm lg:block',
                          selectedIndex === featureIndex
                            ? 'text-white'
                            : 'text-blue-100 group-hover:text-white'
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="bg-white/10 ring-white/10 absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] ring-1 ring-inset sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="text-white relative mx-auto max-w-2xl text-base sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="bg-slate-50 shadow-blue-900/20 mt-10 w-[45rem] overflow-hidden rounded-xl shadow-xl sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        className="w-full"
                        src={feature.image}
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  )
}
