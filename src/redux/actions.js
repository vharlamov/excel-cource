import { 
    CHANGE_TEXT, 
    CHANGE_STYLES, 
    TABLE_RESIZE, 
    APPLY_STYLES, 
    CHANGE_HEADER,
    FORMULA,
    UPDATE_DATE,
    CLEAR_STATE,
    CLEAR_STYLES,
    SORT_ROWS
} from "./types";

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

export function applyStyles(data) {
    return {
        type: APPLY_STYLES,
        data
    }
}

export function changeHeader(data) {
    return {
        type: CHANGE_HEADER,
        data
    }
}

export function formula(data) {
    return {
        type: FORMULA,
        data
    }
}

export function updateDate() {
    return {
        type: UPDATE_DATE
    }
}

export function clearState() {
    return {
        type: CLEAR_STATE
    }
}

export function sorting(data) {
    return {
        type: SORT_ROWS,
        data
    }
}

export function clearStyles(data) {
    return {
        type: CLEAR_STYLES,
        data
    }
}
