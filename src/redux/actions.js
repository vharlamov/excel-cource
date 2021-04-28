import { 
    CHANGE_TEXT, 
    CHANGE_STYLES, 
    TABLE_RESIZE, 
    APPLY_STYLES, 
    CHANGE_HEADER,
    FORMULA
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
