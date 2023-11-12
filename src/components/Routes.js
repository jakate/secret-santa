import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import NotFound from '../pages/NotFound'
import ThankYou from '../pages/ThankYou'
import FormPage from '../pages/FormPage'

const RouteWrapper = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Welcome />} />
        <Route path="start" element={<FormPage />} />
        <Route path="thank_you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default RouteWrapper
