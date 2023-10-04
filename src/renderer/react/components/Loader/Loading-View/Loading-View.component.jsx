import React from 'react'
import LoadingSpinner from '../Loading-Spinner/Loading-Spinner.component'
import { useSettingsStore } from '../../../../js/store/settings';

function LoadingView({ message = 'Just one moment please...' }) {
  const isDarkTheme = useSettingsStore((state) => state.isDarkTheme);
  return (
    <div className={`${isDarkTheme ? 'dark' : 'light'}`}>
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
    </div>
  )
}

export default LoadingView