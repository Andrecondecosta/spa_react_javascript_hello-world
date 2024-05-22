import React from 'react'
import { PageLayout } from '../components/page-layout'
import PortfolioShowImage from '../components/portfolio-show-image'

function PortfolioPage() {
  return (
    <PageLayout>
    <div>
      <h1>Portfolio</h1>
      <PortfolioShowImage />
    </div>
    </PageLayout>
  )
}

export default PortfolioPage
