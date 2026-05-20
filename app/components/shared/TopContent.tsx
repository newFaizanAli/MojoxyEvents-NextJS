import React from 'react'
import { H3 } from './Typography'

const PageHeader = ({ title, description }: {
    title: string;
    description: string;
}) => {
    return (
        <div className="px-2 pr-14">
            <H3 useTiltNeon className="mb-2 text-2xl font-semibold ">
                {title || "Title"}
            </H3>
            <p className="mb-6 text-sm text-gray-600  lg:mb-7">
                {description || "Description"}
            </p>
        </div>
    )
}

export default PageHeader
