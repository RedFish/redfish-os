import { createSelector } from "reselect";

const getUserSettings = (state) => state.userSettings;

export const selectListPreferences = createSelector(
  getUserSettings,
  (userSettings) => userSettings.listPreferences
);

export const selectFavoriteMenuItems = createSelector(
  getUserSettings,
  (userSettings) => userSettings.favoriteMenuItems
);

const EMPTY_PDF_VIEWER_OPTIONS = {
  showBody: true
};

export const selectPdfViewerOptions = createSelector(
  getUserSettings,
  (userSettings) => (key) =>
    userSettings.pdfViewerOptions[key] || EMPTY_PDF_VIEWER_OPTIONS
);

export const selectPdfAnalysisOptions = createSelector(
  getUserSettings,
  (userSettings) => userSettings.pdfAnalysisOptions
);

export const selectDefaultSpecialCode = createSelector(
  getUserSettings,
  (userSettings) => userSettings.defaultSpecialCode
);

export const selectDefaultFormats = createSelector(
  getUserSettings,
  (userSettings) => userSettings.defaultFormats
);

export const selectDefaultPDFView = createSelector(
  getUserSettings,
  (userSettings) => userSettings.defaultPDFView
);
