import React from 'react'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'

export default function fourohone () {
  return (
    <div className="relative flex items-top justify-center min-h-screen bg-gray-50 dark:bg-gray-900 sm:items-center sm:pt-0">
      <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
          <div className="px-4 text-4xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 border-r border-purple-300 tracking-wider">
                401
          </div>
          <div className="ml-4 text-4xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 uppercase tracking-wider">
                Unauthorised
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
  context.res.statusCode = 401
  return { props: {} }
}
