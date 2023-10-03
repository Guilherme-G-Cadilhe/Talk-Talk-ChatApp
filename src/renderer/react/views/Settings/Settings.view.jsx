import React from "react";
import { withBaseLayout } from "../../layouts/Base.component";
import { useSettingsStore } from "../../../js/store/settings";


const SettingsView = () => {
  const updateSettings = useSettingsStore((state) => state.updateSettings)
  const { isDarkTheme, showNotifications, playSound } = useSettingsStore((state) => state);

  const handleChange = ({ target: { name, checked } }) => updateSettings(name, checked);

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form className="centered-container-form">
          <div className="header">Adjust application settings</div>
          {/* <button type="button" onClick={notify}>Notify Me</button> */}
          <div className="form-container">
            <div className="my-3">
              <div className="form-check">
                <input
                  onChange={handleChange}
                  checked={isDarkTheme}
                  name="isDarkTheme"
                  type="checkbox"
                  className="form-check-input" />
                <label className="form-check-label">Dark Theme</label>
              </div>
              <div className="form-check">
                <input
                  onChange={handleChange}
                  checked={showNotifications}
                  name="showNotifications"
                  type="checkbox"
                  className="form-check-input" />
                <label className="form-check-label">Enable Notification</label>
              </div>
              <div className="form-check">
                <input
                  onChange={handleChange}
                  checked={playSound}
                  name="playSound"
                  type="checkbox"
                  className="form-check-input" />
                <label className="form-check-label">Sound notification</label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { }}
              className="btn btn-danger">
              Quit App
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withBaseLayout(SettingsView, { canGoBack: true });