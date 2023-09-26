import React from 'react'
import LoadingSpinner from '../Loading-Spinner/Loading-Spinner.component'

function LoadingView({ message = 'Just one moment please...' }) {
  return (
    <div className="loading-screen">
      <div className="loading-view">
        <div className="loading-view-container">
          <div className="mb-3">
            {message}
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingView