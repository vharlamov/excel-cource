export function createButtons(state) {
    const buttons = [
        {
            icon: 'format_bold',
            active: state.fontWeight === 'bold',
            value: {fontWeight: state.fontWeight === 'bold' 
                ? 'normal' 
                : 'bold'}
        },
        {
            icon: 'format_italic',
            active: state.fontStyle === 'italic',
            value: {fontStyle: state.fontStyle === 'italic' 
                ? 'normal'
                : 'italic'}
        },
        {
            icon: 'format_strikethrough',
            active: state.textDecoration === 'line-through',
            value: {textDecoration: state.textDecoration === 'line-through'
                ? 'none'
                : 'line-through'}
        },
        {
            icon: 'format_underlined',
            active: state.textDecoration === 'underline',
            value: {textDecoration: state.textDecoration === 'underline'
                ? 'none'
                : 'underline'}
        },
        {
            icon: '',
            active: null,
            value: null,
            style: 'pointer-events: none',
            content: ' | '
        },             

        {
            icon: 'format_align_left',
            active: state.textAlign === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: state.textAlign === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: state.textAlign === 'right',
            value: {textAlign: 'right'}
        },             
        {
            icon: '',
            active: null,
            value: null,
            style: 'pointer-events: none',
            content: ' | '
        }, 
        {
            icon: 'format_clear',
            active: null,
            value: 'clearStyles'
        },             
        {
            icon: '',
            active: null,
            value: null,
            style: 'pointer-events: none',
            content: '|'
        }, 
        {
            icon: 'sort_by_alpha',
            active: null,
            value: {sort: 'sortABC'}
        },             
        {
            icon: 'filter_7',
            active: null,
            value: {sort: 'sortNum'}
        },             
    ]
return buttons.map(button => {
        const meta = `
        data-type="button" 
        data-value='${JSON.stringify(button.value)}'`
        
        return `
            <div class='button ${button.active ? 'active' : ''}'
            style='${button.style}' 
            ${meta}>
                <i class='material-icons' ${meta}>${button.icon}
                </i>${button.content ? button.content : ''}
            </div>`
    }).join('')
}
