import { v4 as uuidv4 } from "uuid";
import get from "lodash/get";
import { AuthActionTypes } from "redux/auth/auth.reducer";

//Action Types
const UserSettingsActionTypes = {
  //Drawer
  TOGGLE_MENU_ITEM: "TOGGLE_MENU_ITEM",
  OPEN_MENU_ITEM: "OPEN_MENU_ITEM",
  CLOSE_MENU_ITEM: "CLOSE_MENU_ITEM",
  ADD_FAVORITE_MENU_ITEM: "ADD_FAVORITE_MENU_ITEM",
  REMOVE_FAVORITE_MENU_ITEM: "REMOVE_FAVORITE_MENU_ITEM",
  CHANGE_ORDER_FAVORITE_MENU_ITEM: "CHANGE_ORDER_FAVORITE_MENU_ITEM",

  ON_CHANGE_LIST_PREFERENCE: "ON_CHANGE_LIST_PREFERENCE",
  ON_CLEAN_FILTERS: "ON_CLEAN_FILTERS",

  LIST_SAVE: "LIST_SAVE",
  LIST_DELETE: "LIST_DELETE",
  LIST_FAVORITE: "LIST_FAVORITE",

  SET_PDF_VIEWER_OPTIONS: "SET_PDF_VIEWER_OPTIONS",
  SET_PDF_ANALYSIS_OPTIONS: "SET_PDF_ANALYSIS_OPTIONS",
  SET_DEFAULT_SPECIAL_CODE: "SET_DEFAULT_SPECIAL_CODE",
  SET_DEFAULT_FORMATS: "SET_DEFAULT_FORMATS",
  SET_DEFAULT_PDF_VIEW: "SET_DEFAULT_PDF_VIEW"
};

const INITIAL_STATE = {
  openMenuItems: {},
  favoriteMenuItems: [],
  listPreferences: {
    /**
     * Contains a dictionary of each list preferences:
     * "NAME_LIST": {
     *
     *    displayList: {
     *        "favoriteListId": uuid,
     *        "uuid": {
     *            title: "Custom Title",
     *            columns: []
     *        }
     *    },
     *    favoriteDisplayListId: uuid, // DEPRECATED
     *
     *    filterList: {
     *        "favoriteListId": uuid,
     *        "uuid": {
     *            title: "Custom Title",
     *            filters: {}
     *            orderedColumnName: "name"
     *            orderedDirection: "desc"
     *        }
     *    },
     *    favoriteFilterListId: uuid, // DEPRECATED
     *
     *
     * }
     */
  },
  pdfViewerOptions: {
    //LETTERS
    //Reminder
    CUSTOMER_REMINDER: {
      reminderLevel: "",
      printAddress: false,
      printTextAbout: false,
      printInterest: true
    },
    //Bank statement
    CUSTOMER_BANKSTATEMENT: {
      printAddress: false,
      printTextAbout: false
    },
    //Holdback
    CUSTOMER_HOLDBACK: {
      printAddress: false,
      printTextAbout: false
    },
    //Documents
    PRICEREQUEST_EDIT: {
      showHeader: true,
      showCopyStamp: false,
      showBody: true,
      printType: "show_price", // or hide price
      referenceType: "provider" // or internal
    },
    PROVIDERORDER_EDIT: {
      showHeader: true,
      showCopyStamp: false,
      showBody: true,
      printType: "show_price", // or hide price
      orderType: "aggregated", // or alone
      referenceType: "provider", // or internal
      showGTC: false
    },
    PROVIDERDELIVERY_EDIT: {
      showBody: true,
      printType: "show_price" // or hide price
    },
    //NO OPT FOR ESTIMATERESQUEST
    ESTIMATE_EDIT: {
      showHeader: true,
      showCopyStamp: false,
      showBody: true,
      printType: "title_1",
      discountType: "show_discount",
      showGTC: false
    },
    CUSTOMERORDER_EDIT: {
      showHeader: true,
      showCopyStamp: false,
      showBody: true,
      printType: "show_price",
      discountType: "show_discount",
      showGTC: false
    },
    CUSTOMERDELIVERY_EDIT: {
      showHeader: true,
      showCopyStamp: false,
      showBody: true,
      printType: "show_price",
      discountType: "show_discount",
      showGTC: false
    },
    CUSTOMERINVOICE_EDIT: {
      showHeader: true,
      showCopyStamp: false,
      showBody: true,
      paymentType: "until_now",
      discountType: "show_discount",
      showGTC: false
    },
    CUSTOMERCREDIT_EDIT: {
      showHeader: true,
      showCopyStamp: false,
      showBody: true,
      paymentType: "until_now",
      discountType: "show_discount",
      showGTC: false
    }
  },
  pdfAnalysisOptions: {
    ESTIMATE_EDIT: {
      printType: "linear",
      displayType: "all"
    },
    CUSTOMERINVOICE_EDIT: {
      printType: "linear",
      displayType: "all"
    }
  },
  defaultSpecialCode: "",
  defaultFormats: {},
  defaultPDFView: "react-pdf"
};

/**
 * ACTIONS
 */
//MENU_ITEM
export const toggleMenuItem = (menuItem) => ({
  type: UserSettingsActionTypes.TOGGLE_MENU_ITEM,
  payload: menuItem
});

export const openMenuItem = (menuItem) => ({
  type: UserSettingsActionTypes.OPEN_MENU_ITEM,
  payload: menuItem
});

export const closeMenuItem = (menuItem) => ({
  type: UserSettingsActionTypes.CLOSE_MENU_ITEM,
  payload: menuItem
});

export const addFavoriteMenuItem = (content) => ({
  type: UserSettingsActionTypes.ADD_FAVORITE_MENU_ITEM,
  payload: { content }
});

export const removeFavoriteMenuItem = (content) => ({
  type: UserSettingsActionTypes.REMOVE_FAVORITE_MENU_ITEM,
  payload: { content }
});

export const changeOrderFavoriteMenuItem = (items) => ({
  type: UserSettingsActionTypes.CHANGE_ORDER_FAVORITE_MENU_ITEM,
  payload: { items }
});

//LIST_PREFERENCE
export const onChangeListPreference = (listType, preference) => ({
  type: UserSettingsActionTypes.ON_CHANGE_LIST_PREFERENCE,
  payload: { listType, preference }
});

export const onCleanFilters = (listType) => ({
  type: UserSettingsActionTypes.ON_CLEAN_FILTERS,
  payload: { listType }
});

//LIST
export const listSave = ({
  name,
  listType,
  title,
  isFavorite,
  ...dataToSave
}) => ({
  type: UserSettingsActionTypes.LIST_SAVE,
  payload: {
    name,
    listType,
    title,
    isFavorite,
    dataToSave
  }
});
export const listDelete = ({ name, listType, listId }) => ({
  type: UserSettingsActionTypes.LIST_DELETE,
  payload: { name, listType, listId }
});
export const listFavorite = ({ name, listType, listId }) => ({
  type: UserSettingsActionTypes.LIST_FAVORITE,
  payload: { name, listType, listId }
});

//OTHER PREFERENCES
//documentType, options
export const setPdfViewerOptions = (documentType, options) => ({
  type: UserSettingsActionTypes.SET_PDF_VIEWER_OPTIONS,
  payload: { documentType, options }
});

//documentType, options
export const setPdfAnalysisOptions = (documentType, options) => ({
  type: UserSettingsActionTypes.SET_PDF_ANALYSIS_OPTIONS,
  payload: { documentType, options }
});

export const setDefaultSpecialCode = (specialCode) => ({
  type: UserSettingsActionTypes.SET_DEFAULT_SPECIAL_CODE,
  payload: specialCode
});

export const setDefaultFormats = (formats) => ({
  type: UserSettingsActionTypes.SET_DEFAULT_FORMATS,
  payload: formats
});

export const setDefaultPDFView = (view) => ({
  type: UserSettingsActionTypes.SET_DEFAULT_PDF_VIEW,
  payload: view
});

//Reducer
const userSettingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserSettingsActionTypes.TOGGLE_MENU_ITEM: {
      const openMenuItems = { ...state.openMenuItems };
      openMenuItems[action.payload] = !openMenuItems[action.payload];
      return { ...state, openMenuItems };
    }
    case UserSettingsActionTypes.OPEN_MENU_ITEM: {
      const openMenuItems = { ...state.openMenuItems };
      openMenuItems[action.payload] = true;
      return { ...state, openMenuItems };
    }
    case UserSettingsActionTypes.CLOSE_MENU_ITEM: {
      const openMenuItems = { ...state.openMenuItems };
      openMenuItems[action.payload] = false;
      return { ...state, openMenuItems };
    }
    case UserSettingsActionTypes.ADD_FAVORITE_MENU_ITEM: {
      const { content } = action.payload;
      const { favoriteMenuItems } = state;
      let newFavoriteMenuItems = favoriteMenuItems;
      const contentName = get(content, "name");
      const contentId = get(content, "values._id");
      //Add only if not exist
      if (
        !favoriteMenuItems.find(
          (mi) => mi.name === contentName && get(mi, "values._id") === contentId
        )
      ) {
        const menuItem = {
          name: content.name,
          title: get(content, "title")
        };
        if (contentId) {
          menuItem.values = {
            _id: contentId
          };
          menuItem.subtitle = get(content, "subtitle");
        }
        newFavoriteMenuItems = [...favoriteMenuItems, menuItem];
      } else {
        newFavoriteMenuItems = [
          ...favoriteMenuItems.filter(
            (mi) =>
              !(mi.name === contentName && get(mi, "values._id") === contentId)
          )
        ];
      }

      return { ...state, favoriteMenuItems: newFavoriteMenuItems };
    }
    case UserSettingsActionTypes.REMOVE_FAVORITE_MENU_ITEM: {
      const { content } = action.payload;
      const { favoriteMenuItems } = state;
      const contentName = get(content, "name");
      const contentId = get(content, "values._id");

      const newFavoriteMenuItems = [
        ...favoriteMenuItems.filter(
          (mi) =>
            !(mi.name === contentName && get(mi, "values._id") === contentId)
        )
      ];

      return { ...state, favoriteMenuItems: newFavoriteMenuItems };
    }
    case UserSettingsActionTypes.CHANGE_ORDER_FAVORITE_MENU_ITEM: {
      const { items } = action.payload;
      return { ...state, favoriteMenuItems: items };
    }

    case UserSettingsActionTypes.ON_CHANGE_LIST_PREFERENCE: {
      const { listPreferences } = state;
      const { listType, preference } = action.payload;

      const oldListPreference = listPreferences[listType];
      const listPreference = { ...oldListPreference, ...preference };

      return {
        ...state,
        listPreferences: { ...listPreferences, [listType]: listPreference }
      };
    }

    case UserSettingsActionTypes.ON_CLEAN_FILTERS: {
      const { listPreferences } = state;
      const { listType } = action.payload;

      const oldListPreference = listPreferences[listType];
      const listPreference = {
        ...oldListPreference,
        filters: {},
        searchText: ""
      };

      return {
        ...state,
        listPreferences: { ...listPreferences, [listType]: listPreference }
      };
    }

    //LISTS
    case UserSettingsActionTypes.LIST_SAVE: {
      const { listPreferences } = state;
      const { name, listType, title, isFavorite, dataToSave } = action.payload;

      const listId = uuidv4();

      const oldListPreference = listPreferences[name] || {};
      const listPreference = {
        ...oldListPreference,
        [listType]: {
          ...oldListPreference[listType],
          [listId]: { title, ...dataToSave }
        }
      };

      if (isFavorite) {
        listPreference[listType].favoriteListId = listId;
      }

      return {
        ...state,
        listPreferences: { ...listPreferences, [name]: listPreference }
      };
    }
    case UserSettingsActionTypes.LIST_DELETE: {
      const { listPreferences } = state;
      const { name, listType, listId } = action.payload;

      const oldListPreference = listPreferences[name];
      const list = { ...oldListPreference[listType] };
      //Remove list id
      delete list[listId];

      //reset favorite if deleted
      if (list.favoriteListId === listId) {
        delete list.favoriteListId;
      }

      const listPreference = {
        ...oldListPreference,
        [listType]: list
      };

      return {
        ...state,
        listPreferences: { ...listPreferences, [name]: listPreference }
      };
    }
    case UserSettingsActionTypes.LIST_FAVORITE: {
      const { listPreferences } = state;
      const { name, listType, listId } = action.payload;

      const oldListPreference = listPreferences[name] || {};
      const list = { ...oldListPreference[listType] };
      list.favoriteListId = listId;

      const listPreference = {
        ...oldListPreference,
        [listType]: list
      };

      return {
        ...state,
        listPreferences: { ...listPreferences, [name]: listPreference }
      };
    }

    //OTHER OPTIONS
    case UserSettingsActionTypes.SET_PDF_VIEWER_OPTIONS: {
      const { documentType, options } = action.payload;
      if (!documentType) {
        console.error("SET_PDF_VIEWER_OPTIONS documentType is missing");
        return state;
      }
      if (!options) {
        console.error("SET_PDF_VIEWER_OPTIONS options is missing");
        return state;
      }
      return {
        ...state,
        pdfViewerOptions: { ...state.pdfViewerOptions, [documentType]: options }
      };
    }

    case UserSettingsActionTypes.SET_PDF_ANALYSIS_OPTIONS: {
      const { documentType, options } = action.payload;
      if (!documentType) {
        console.error("SET_PDF_VIEWER_OPTIONS documentType is missing");
        return state;
      }
      if (!options) {
        console.error("SET_PDF_VIEWER_OPTIONS options is missing");
        return state;
      }
      return {
        ...state,
        pdfAnalysisOptions: {
          ...state.pdfAnalysisOptions,
          [documentType]: options
        }
      };
    }

    case UserSettingsActionTypes.SET_DEFAULT_SPECIAL_CODE: {
      return { ...state, defaultSpecialCode: action.payload };
    }

    case UserSettingsActionTypes.SET_DEFAULT_FORMATS: {
      return { ...state, defaultFormats: action.payload };
    }

    case UserSettingsActionTypes.SET_DEFAULT_PDF_VIEW: {
      return { ...state, defaultPDFView: action.payload };
    }

    case AuthActionTypes.SIGN_OUT_SUCCESS: {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
};

export default userSettingsReducer;
