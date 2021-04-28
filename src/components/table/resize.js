import {$} from '@core/dom'
import {shouldResize} from './table.functions'

export const resizeTable = ($root, event, selection) => {
    return new Promise(resolve => {
    const $target = event.target

    if (shouldResize($target)) {
        const resType = $target.dataset.resize
        const $resizer = $($target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()

        $resizer.css({
            opacity: 0.5
        })

        const colIndex = resType === 'col'
            ? $parent.data.col
            : null

            const entireCol = 
            $root.findAll(`[data-col="${colIndex}"]`)

            let deltaX = 0
            let deltaY = 0

        document.onmousemove = e => {
            deltaX = e.pageX - coords.right
            deltaY = e.pageY - coords.bottom

            if (resType === 'col') {
                const value = coords.width + deltaX
                $parent.css({width: `${value}px`})

                $resizer.css({
                    position: 'fixed',
                    left: e.pageX - $resizer.getCoords().width + 'px',
                })
            } else if (resType === 'row') {
                const value = coords.height + deltaY
                $parent.css({height: `${value}px`})

                $resizer.css({
                    position: 'fixed',
                    top: e.pageY - $resizer.getCoords().height + 'px',
                })
            }
        }

        const options = [
            entireCol, $resizer, deltaX, coords
        ]
        document.onmouseup = () => {
            const value = coords.width + deltaX

            entireCol.forEach(el => {
                el.style.width = value + 'px'
            })

            resolve({
                type: resType,
                id: resType === 'col' 
                    ? $parent.data.col 
                    : $parent.data.row,
                value: resType === 'col' 
                    ? $parent.getCoords().width 
                    : $parent.getCoords().height
            })

            $resizer.css({
                position: null,
                opacity: null,
                left: null,
                bottom: null,
                top: null
            })

            document.onmousemove = null
            document.onmouseup = null
        }
    } 
})
}


