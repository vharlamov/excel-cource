import {$} from '@core/dom'
import {shouldResize} from './table.functions'


export const resizeTable = ($root, event) => {
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
            deltaX = e.clientX - coords.right
            deltaY = e.clientY - coords.bottom

            if (resType === 'col') {
                const value = coords.width + deltaX
                $parent.css({width: `${value}px`})

                $resizer.css({
                    position: 'fixed',
                    left: e.clientX - $resizer.getCoords().width + 'px',
                })
            } else if (resType === 'row') {
                const value = coords.height + deltaY
                $parent.css({height: `${value}px`})

                $resizer.css({
                    position: 'fixed',
                    top: e.clientY - $resizer.getCoords().height + 'px',
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
}

